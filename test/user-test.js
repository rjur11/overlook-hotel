import { expect } from "chai";
const User = require("../src/classes/User.js");
const Booking = require("../src/classes/Booking.js");
const Room = require("../src/classes/Room.js");

describe("User", () => {
  let user1;
  let user2;
  let user3;
  let booking1;
  let booking2;
  let booking3;
  let booking4;
  let room1;
  let room2;
  let room3;
  let room4;

  beforeEach(() => {
    room1 = new Room({
      number: 1,
      roomType: "junior suite",
      bidet: false,
      bedSize: "twin",
      numBeds: 2,
      costPerNight: 10,
    });
    room2 = new Room({
      number: 2,
      roomType: "residential suite",
      bidet: false,
      bedSize: "full",
      numBeds: 1,
      costPerNight: 20,
    });
    room3 = new Room({
      number: 3,
      roomType: "single room",
      bidet: false,
      bedSize: "twin",
      numBeds: 2,
      costPerNight: 30,
    });
    room4 = new Room({
      number: 4,
      roomType: "single room",
      bidet: false,
      bedSize: "king",
      numBeds: 1,
      costPerNight: 5,
    });
    const rooms = [room1, room2, room3, room4];
    booking1 = new Booking(
      {
        id: "1",
        userID: 2,
        date: "2022/02/03",
        roomNumber: 1,
      },
      rooms
    );
    booking2 = new Booking(
      {
        id: "2",
        userID: 2,
        date: "2022/04/22",
        roomNumber: 2,
      },
      rooms
    );
    booking3 = new Booking(
      {
        id: "3",
        userID: 2,
        date: "2022/01/08",
        roomNumber: 3,
      },
      rooms
    );
    booking4 = new Booking(
      {
        id: "4",
        userID: 2,
        date: "2022/01/14",
        roomNumber: 4,
      },
      rooms
    );
    const bookings = [booking1, booking2, booking3, booking4];
    user1 = new User({ id: 1, name: "Leatha Ulrich" }, []);
    user2 = new User({ id: 2, name: "Bob Ross" }, bookings);
  });
  it("Should be a function", () => {
    expect(User).to.be.a("function");
  });
  it("should be an instance of User", () => {
    expect(user1).to.be.an.instanceOf(User);
  });
  it("should have an id", () => {
    expect(user1.id).to.equal(1);
  });
  it("should have a name", () => {
    expect(user1.name).to.equal("Leatha Ulrich");
  });
  it("should start with 0 bookings if no data passed in", () => {
    expect(user1.bookings).to.deep.equal([]);
  });
  it("should start with bookings associated data", () => {
    expect(user2.bookings).to.deep.equal([
      booking1,
      booking2,
      booking3,
      booking4,
    ]);
  });
  it("should should have a method that returns past bookings", () => {
    expect(user2.getPastBookings()).to.deep.equal([booking3]);
  });
  it("should should have a method that returns future bookings", () => {
    expect(user2.getFutureBookings()).to.deep.equal([booking1, booking2]);
  });
  it("should should have a method that returns today's bookings", () => {
    expect(user2.getCurrentBookings()).to.deep.equal([booking4]);
  });
  it.only("should should have a method that returns the total cost of all bookings", () => {
    expect(user2.getTotalAmount()).to.equal(65);
  });
});
