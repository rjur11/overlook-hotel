import { expect } from "chai";
const Booking = require("../src/classes/Booking.js");

describe("Booking", () => {
  let booking1;

  beforeEach(() => {
    booking1 = new Booking({
      id: "45Tzwd78",
      userId: 6,
      date: "2022/04/22",
      roomNumber: 15,
    });
  });

  it("Should be a function", () => {
    expect(Booking).to.be.a("function");
  });
  it("should be an instance of Booking", () => {
    expect(booking1).to.be.an.instanceOf(Booking);
  });
  it("should have an id", () => {
    expect(booking1.id).to.equal("45Tzwd78");
  });
  it("should have a userId", () => {
    expect(booking1.userId).to.equal(6);
  });
  it("should have a date booked", () => {
    expect(booking1.date).to.equal("2022/04/22");
  });
  it("should have a room number", () => {
    expect(booking1.roomNumber).to.equal(15);
  });
});
