import domUpdates from "./domUpdates.js";
import {
  fetchCustomers,
  fetchSingleCustomer,
  fetchAllRooms,
  fetchAllBookings,
  addNewBooking,
  deleteBooking,
} from "./apiCalls.js";
import Room from "./classes/Room.js";
import Booking from "./classes/Booking.js";
import User from "./classes/User.js";

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/base.scss";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// ~~~~~~~~~~~~~~~~~ IMAGES ~~~~~~~~~~~~~~~~~~~~
import "./images/nav-bar-bg.jpg";
import "./images/bg.jpg";
import "./images/single-room.jpg";
import "./images/suite.jpg";
import "./images/junior-suite.jpg";
import "./images/residential-suite.jpg";
import "./images/transparent-logo.png";

const validPassword = "overlook2021";

window.addEventListener("load", () => {
  Promise.all([fetchAllBookings(), fetchAllRooms()]).then((data) => {
    let bookingsData = data[0];
    let roomsData = data[1];
    let rooms = roomsData.rooms.map((room) => new Room(room));
    let bookings = bookingsData.bookings.map(
      (booking) => new Booking(booking, rooms)
    );
    const model = {
      bookings: bookings,
      rooms: rooms,
      state: "login",
      attachments: {},
    };
    domUpdates.login = (username, password) => {
      if (model.state !== "login") {
        return;
      }
      if (username === "manager") {
        if (password !== validPassword) {
          model.attachments.loginError = "Invalid password";
          domUpdates.renderModel(model);
          return;
        }
        model.state = "manager";
        model.attachments = {};
        fetchCustomers().then((data) => {
          model.users = data.customers.map(
            (customer) => new User(customer, model.bookings)
          );
          domUpdates.renderModel(model);
        });
        return;
      }
      if (!username.startsWith("customer")) {
        // Staying on login screen
        model.attachments.loginError = "Invalid username";
        domUpdates.renderModel(model);
        return;
      }
      const idComp = username.slice("customer".length);
      if (!idComp.split("").every((c) => "0" <= c && c <= "9")) {
        model.attachments.loginError = "Invalid username";
        domUpdates.renderModel(model);
        return;
      }
      const id = parseInt(idComp);
      if (password !== validPassword) {
        model.attachments.loginError = "Invalid password";
        domUpdates.renderModel(model);
        return;
      }
      model.state = "limbo";
      fetchSingleCustomer(id)
        .then((data) => {
          model.user = new User(data, model.bookings);
          model.state = "user";
          model.attachments = {};
          domUpdates.renderModel(model);
        })
        .catch(() => {
          model.attachments.loginError = "Invalid username";
          model.state = "login";
          domUpdates.renderModel(model);
        });
    };
    domUpdates.logout = () => {
      model.state = "login";
      model.attachments = {};
      delete model.user;
      domUpdates.renderModel(model);
    };
    domUpdates.showRooms = (selectedBookingDate, selectedRoomType) => {
      model.state = "rooms";
      model.attachments = {};
      model.attachments.selectedBookingDate = selectedBookingDate;
      model.attachments.selectedRoomType = selectedRoomType;
      domUpdates.renderModel(model);
    };
    domUpdates.bookRoom = (selectedRoom) => {
      if (model.state !== "rooms") {
        return;
      }
      const userID = model.user.id;
      const date = model.attachments.selectedBookingDate;
      const roomNumber = selectedRoom.number;
      model.state = "user";
      model.attachments = {};
      addNewBooking(userID, date, roomNumber).then((data) => {
        const newBooking = new Booking(data.newBooking, model.rooms);
        model.bookings.push(newBooking);
        model.user.bookings.push(newBooking);
        domUpdates.renderModel(model);
      });
    };
    domUpdates.returnHome = () => {
      model.state = "user";
      model.attachments = {};
      domUpdates.renderModel(model);
    };
    domUpdates.showCustomer = (userID, selectedDate, roomType) => {
      if (userID === "") {
        model.state = "manager";
        model.attachments = {};
        domUpdates.renderModel(model);
        return;
      }
      const user = model.users.find((user) => user.id === parseInt(userID));
      model.state = "managerCustomer";
      model.attachments = {};
      model.attachments.selectedCustomer = user;
      model.attachments.selectedDate = selectedDate;
      model.attachments.roomType = roomType;
      domUpdates.renderModel(model);
    };
    domUpdates.deleteBooking = (booking) => {
      deleteBooking(booking.id);
      model.bookings = model.bookings.filter(
        (currBooking) => currBooking.id !== booking.id
      );
      const user = model.users.find((user) => user.id === booking.userID);
      user.bookings = user.bookings.filter(
        (currBooking) => currBooking.id !== booking.id
      );
      domUpdates.renderModel(model);
    };
    domUpdates.bookCustomerRoom = (room) => {
      const userID = model.attachments.selectedCustomer.id;
      const date = model.attachments.selectedDate;
      const roomNumber = room.number;
      addNewBooking(userID, date, roomNumber).then((data) => {
        const newBooking = new Booking(data.newBooking, model.rooms);
        model.bookings.push(newBooking);
        model.attachments.selectedCustomer.bookings.push(newBooking);
        domUpdates.renderModel(model);
      });
    };
    domUpdates.renderModel(model);
  });
});
