class User {
  constructor(userData, bookingsData = []) {
    this.id = userData.id;
    this.name = userData.name;
    this.bookings = bookingsData.filter(
      (booking) => booking.userID === this.id
    );
  }

  getPastBookings() {}
  getCurrentBookings() {}
  getFutureBookings() {}
}

module.exports = User;
