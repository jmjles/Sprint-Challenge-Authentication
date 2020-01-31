const req = require("supertest");
const app = require("./api/server");

describe("Get Jokes Without Token", () => {
  it("Return status 400 with error message", () => {
    return req(app)
      .get("/api/jokes")
      .expect(400);
  });
});

describe("Register Without username", () => {
  it("Return status 400 with error message", () => {
    return req(app)
      .post("/api/auth/register",)
      .send({password:'password'})
      .expect(400);
  });
});

describe("Register Without password", () => {
  it("Return status 400 with error message", () => {
    return req(app)
      .post("/api/jokes/register")
      .send({username:'jmjles'})
      .expect(400);
  });
});

describe("Register Without username", () => {
  it("Return status 400 with error message", () => {
    return req(app)
      .post("/api/auth/login")
      .send({ password: "password" })
      .expect(400);
  });
});

describe("Register Without password", () => {
  it("Return status 400 with error message", () => {
    return req(app)
      .post("/api/jokes/login")
      .send({ username: "jmjles" })
      .expect(400);
  });
});