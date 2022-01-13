class Booking {
  constructor(bookingData) {
    this.id = bookingData.id;
    this.userId = bookingData.userId;
    this.date = bookingData.data;
    this.roomNumber = bookingData.roomNumber;
  }
}

module.exports = Booking;
