/* eslint-disable indent */
import * as sinon from "sinon";
import { expect } from "chai";
import chai from "chai";
import * as Controller from "../../routes/user/user.service";
import User from "../../routes/user/user.model";
import chaihttp from "chai-http";
chai.use(chaihttp);

describe("User List", () => {
  let page: number, limit: number, search: string;
  beforeEach(() => {
    page = 1;
    limit = 10;
    search = "";
  });
  it("get All User Data", async () => {
    const spy = sinon.stub(User, "findAll").resolves([]);

    expect(await Controller.getUserList(page, limit, search)).to.be.an("array");
  });
});
