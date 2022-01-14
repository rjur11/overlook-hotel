class User {
  constructor(userData, bookingsData = []) {
    this.id = userData.id;
    this.name = userData.name;
    this.bookings = bookingsData.filter(
      (booking) => booking.userID === this.id
    );
  }

  getPastBookings() {
    const today = Date.parse(new Date());
    console.log(today);
    const pastBookings = this.bookings.filter((booking) => {
      const bookingUnix = Date.parse(booking.date);
      console.log(bookingUnix);
      return Date.parse(booking.date) < today;
    });
    return pastBookings;
  }
  getFutureBookings() {
    const today = Date.parse(new Date());
    const futureBookings = this.bookings.filter((booking) => {
      const bookingUnix = Date.parse(booking.date);
      return Date.parse(booking.date) > today;
    });
    return futureBookings;
  }
  // getCurrentBookings() {}
}

module.exports = User;
