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

window.addEventListener("load", () => {
  Promise.all([fetchCustomers(), fetchAllBookings(), fetchAllRooms()]).then(
    (data) => {
      let customersData = data[0];
      let bookingsData = data[1];
      let roomsData = data[2];
      let rooms = roomsData.rooms.map((room) => new Room(room));
      let bookings = bookingsData.bookings.map(
        (booking) => new Booking(booking, rooms)
      );
      let randomUserIdx = Math.floor(
        Math.random() * customersData.customers.length
      );
      let user = new User(customersData.customers[randomUserIdx], bookings);
      const model = {
        user: user,
        bookings: bookings,
        rooms: rooms,
        state: "user",
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
      domUpdates.renderModel(model);
    }
  );
});
