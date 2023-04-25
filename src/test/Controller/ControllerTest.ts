/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable indent */
import * as Controller from "../../routes/user/user.controller";
import * as Service from "../../routes/user/user.service";
import { expect } from "chai";
import * as sinon from "sinon";

describe("Contract Controller", () => {
  const req: any = {
    body: {},
    query: {},
    headers: {},
  };
  const res: any = {
    json: sinon.spy(),
    status: sinon.stub().returns({ end: sinon.spy() }),
  };
  it("Must get All User List", () => {
    const spy = sinon.spy(Controller, "getUserList");
    Controller.getUserList(req, res);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith(req, res)).to.be.true;
  });
});
