import { expect } from "chai";
const User = require("../src/classes/User.js");

describe("User", () => {
  let user1;
  let user2;

  beforeEach(() => {
    user1 = new User({ id: 1, name: "Leatha Ulrich" }, []);
    user2 = new User({ id: 2, name: "Bob Ross" }, [
      {
        id: "5fwrgu4i7k55hl6sz",
        userID: 2,
        date: "2022/04/22",
        roomNumber: 15,
      },
      {
        id: "5fwrgu4i7k55hl6t5",
        userID: 43,
        date: "2022/01/24",
        roomNumber: 24,
      },
      {
        id: "5fwrgu4i7k55hl6tS",
        userID: 2,
        date: "2022/01/08",
        roomNumber: 12,
      },
    ]);
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
      {
        id: "5fwrgu4i7k55hl6sz",
        userID: 2,
        date: "2022/04/22",
        roomNumber: 15,
      },
      {
        id: "5fwrgu4i7k55hl6tS",
        userID: 2,
        date: "2022/01/08",
        roomNumber: 12,
      },
    ]);
  });
  it("should should have a method that returns past bookings", () => {
    expect(user2.getPastBookings()).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6tS",
        userID: 2,
        date: "2022/01/08",
        roomNumber: 12,
      },
    ]);
  });
});
