import { expect } from "chai";
const User = require("../src/classes/User.js");

describe("User", () => {
  let user1;

  beforeEach(() => {
    user1 = new User(1, "Leatha Ulrich");
  });

  it("Should be a function", () => {
    expect(User).to.be.a("function");
  });
});
