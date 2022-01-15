export default class User {
  constructor(userData, bookings = []) {
    this.id = userData.id;
    this.name = userData.name;
    this.bookings = bookings.filter((booking) => booking.userID === this.id);
  }

  getPastBookings() {
    const today = new Date(new Date().toDateString());
    const pastBookings = this.bookings.filter((booking) => {
      return new Date(booking.date) < today;
    });
    return pastBookings.sort((a, b) => {
      a = new Date(a.date);
      b = new Date(b.date);
      if (a < b) {
        return 1;
      } else if (b < a) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  getFutureBookings() {
    const today = new Date(new Date().toDateString());
    const futureBookings = this.bookings.filter((booking) => {
      return new Date(booking.date) > today;
    });
    return futureBookings.sort((a, b) => {
      a = new Date(a.date);
      b = new Date(b.date);
      if (a < b) {
        return -1;
      } else if (b < a) {
        return 1;
      } else {
        return 0;
      }
    });
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
  getTotalAmount() {
    return this.bookings.reduce((acc, booking) => {
      return (acc += booking.getCost());
    }, 0);
  }
}
