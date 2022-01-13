class Booking {
  constructor(bookingData) {
    this.id = bookingData.id;
    this.userId = bookingData.userId;
    this.date = bookingData.date;
    this.roomNumber = bookingData.roomNumber;
  }
}

module.exports = Booking;
