import { expect } from "chai";
const Room = require("../src/classes/Room.js");

describe("Room", () => {
  let room1;

  beforeEach(() => {
    room1 = new Room({
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4,
    });
  });

  it("Should be a function", () => {
    expect(Room).to.be.a("function");
  });
  it("should be an instance of Room", () => {
    expect(room1).to.be.an.instanceOf(Room);
  });
});
