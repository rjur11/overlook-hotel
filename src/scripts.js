// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import domUpdates from "./domUpdates.js";
import {
  fetchCustomers,
  fetchSingleCustomer,
  fetchAllRooms,
  fetchAllBookings,
  addNewBooking,
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
    };
    domUpdates.login = (username, password) => {
      if (model.state !== "login") {
        return;
      }
      if (username === "manager") {
        if (password !== validPassword) {
          model.loginError = "Invalid password";
          domUpdates.renderModel(model);
          return;
        }
        model.state = "manager";
        fetchCustomers().then((data) => {
          model.users = data.customers.map(
            (customer) => new User(customer, bookings)
          );
          domUpdates.renderModel(model);
        });
        return;
      }
      if (!username.startsWith("customer")) {
        // Staying on login screen
        model.loginError = "Invalid username";
        domUpdates.renderModel(model);
        return;
      }
      const idComp = username.slice("customer".length);
      if (!idComp.split("").every((c) => "0" <= c && c <= "9")) {
        model.loginError = "Invalid username";
        domUpdates.renderModel(model);
        return;
      }
      const id = parseInt(idComp);
      if (password !== validPassword) {
        model.loginError = "Invalid password";
        domUpdates.renderModel(model);
        return;
      }
      model.state = "user";
      fetchSingleCustomer(id)
        .then((data) => {
          model.user = new User(data, model.bookings);
          domUpdates.renderModel(model);
        })
        .catch(() => {
          model.loginError = "Invalid username";
          model.state = "login";
          domUpdates.renderModel(model);
        });
    };
    domUpdates.logout = () => {
      model.state = "login";
      delete model.user;
      delete model.loginError;
      domUpdates.renderModel(model);
    };
    domUpdates.showRooms = (selectedBookingDate, selectedRoomType) => {
      console.log("Showrooms was called");
      model.state = "rooms";
      model.selectedBookingDate = selectedBookingDate;
      model.selectedRoomType = selectedRoomType;
      domUpdates.renderModel(model);
    };
    domUpdates.bookRoom = (selectedRoom) => {
      if (model.state !== "rooms") {
        return;
      }
      model.state = "user";
      const userID = model.user.id;
      const date = model.selectedBookingDate;
      const roomNumber = selectedRoom.number;
      addNewBooking(userID, date, roomNumber).then((data) => {
        const newBooking = new Booking(data.newBooking, model.rooms);
        model.bookings.push(newBooking);
        model.user.bookings.push(newBooking);
        domUpdates.renderModel(model);
      });
    };
    domUpdates.returnHome = () => {
      model.state = "user";
      domUpdates.renderModel(model);
    };
    domUpdates.showCustomer = (userID) => {
      if (userID === "") {
        model.state = "manager";
        domUpdates.renderModel(model);
        return;
      }
      const user = model.users.find((user) => user.id === parseInt(userID));
      model.selectedCustomer = user;
      model.state = "managerCustomer";
      domUpdates.renderModel(model);
    };
    domUpdates.renderModel(model);
  });
});
