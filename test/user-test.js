import { expect } from "chai";
const User = require("../src/classes/User.js");

describe("User", () => {
  let user1;
  let user2;

  beforeEach(() => {
    user1 = new User({ id: 1, name: "Leatha Ulrich" });
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
});
