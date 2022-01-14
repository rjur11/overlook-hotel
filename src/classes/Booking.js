class Booking {
  constructor(bookingData, rooms) {
    this.id = bookingData.id;
    this.userID = bookingData.userID;
    this.date = bookingData.date;
    this.roomNumber = bookingData.roomNumber;
    this.room = rooms.find((room) => room.number === this.roomNumber);
  }
  getCost() {
    return this.room.costPerNight;
  }
}

module.exports = Booking;
