const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const {
  userOne,
  populate_setup_database,
  test_pass,
  fullFledgedUser,
} = require("./fixtures/db");

// for a consistent setup of data to each test case.
beforeAll(populate_setup_database);

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/api/auth/signup")
    .send({
      name: "TEST",
      email: "test@vistaarx.com",
      phone_num: "9191919191",
      password: `${test_pass}`,
    })
    .expect(201);
  // assert that the database was changed correctly after signin a new user:
  const user = await User.findOne({ email: "test@vistaarx.com" });
  expect(user).not.toBeNull();
});

test("Should login a current user", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: `${userOne.email}`,
      password: `${test_pass}`,
    })
    .expect(201);
});

test("Should not login non-existing user", async () => {
  await request(app)
    .post("/api/auth/login")
    .send({
      email: `${userOne.email}`,
      password: "password",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/api/user/me")
    .set('Authorization', `Bearer ${fullFledgedUser.jwtToken[0]}`)
    .send()
    .expect(200)
});
