class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.bookings = [];
  }
  getUserBookings(bookings) {
    this.bookings = bookings.filter((booking) => booking.userId === this.id);
  }
}

module.exports = User;
