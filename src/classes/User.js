const Booking = require("./src/classes/Booking.js");

class User {
  constructor(userData, bookingsData = []) {
    this.id = userData.id;
    this.name = userData.name;
    this.bookings = bookingsData.filter(
      (booking) => booking.userID === this.id
    );
  }

  getPastBookings() {
    const today = new Date(new Date().toDateString());
    const pastBookings = this.bookings.filter((booking) => {
      return new Date(booking.date) < today;
    });
    return pastBookings;
  }
  getFutureBookings() {
    const today = new Date(new Date().toDateString());
    const futureBookings = this.bookings.filter((booking) => {
      return new Date(booking.date) > today;
    });
    return futureBookings;
  }
  getCurrentBookings() {
    const today = new Date(new Date().toDateString());
    let currentBookings = this.bookings.filter((booking) => {
      return new Date(booking.date).getTime() === today.getTime();
    });
    return currentBookings;
  }
  addToBookings(booking) {
    this.bookings.push(booking);
  }
  getTotalAmount() {}
}

module.exports = User;
