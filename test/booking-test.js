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
});
