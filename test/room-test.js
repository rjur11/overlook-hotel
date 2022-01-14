import { expect } from "chai";
import Room from "../src/classes/Room.js";

describe("Room", () => {
  let room1;
  let room2;

  beforeEach(() => {
    room1 = new Room({
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4,
    });
    room2 = new Room({
      number: 2,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38,
    });
  });

  it("Should be a function", () => {
    expect(Room).to.be.a("function");
  });
  it("should be an instance of Room", () => {
    expect(room1).to.be.an.instanceOf(Room);
  });
  it("should have a number", () => {
    expect(room1.number).to.equal(1);
  });
  it("should have a room type", () => {
    expect(room1.roomType).to.equal("residential suite");
    expect(room2.roomType).to.equal("suite");
  });
  it("should tell the user if a bidet is present", () => {
    expect(room1.bidet).to.equal(true);
    expect(room2.bidet).to.equal(false);
  });
  it("should have the size of bed", () => {
    expect(room1.bedSize).to.equal("queen");
  });
  it("should have the amount of beds in room", () => {
    expect(room2.numBeds).to.equal(2);
  });
  it("should have the cost per night of the room", () => {
    expect(room1.costPerNight).to.equal(358.4);
    expect(room2.costPerNight).to.equal(477.38);
  });
});
