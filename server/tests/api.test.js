const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = require("../app"); // path to your Express app
const User = require("../models/schemas"); // your User schema

let mongoServer;
let token;
let userId;

beforeAll(async () => {
  // Start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create a test user
  const passwordHash = await bcrypt.hash("password123", 10);
  const user = await User.create({
    username: "testuser",
    password: passwordHash,
  });
  userId = user._id;

  // Generate JWT token
  token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1h",
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clear weights array after each test
  await User.updateOne({ _id: userId }, { $set: { weights: [] } });
});

describe("WebWeightTracker API", () => {
  it("should get all weight entries (empty at start)", async () => {
    const res = await request(app)
      .get(`/api/users/${userId}/weights`) // include userId
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]); // should be empty at the start
  });

  it("should add a new weight entry", async () => {
    const newEntry = { weight: 175, date: "2025-09-29" };
    const res = await request(app)
      .post("/api/users/weight")
      .set("Authorization", `Bearer ${token}`)
      .send(newEntry);
    expect(res.statusCode).toBe(201);
    expect(res.body.weight).toBe(175);
  });

  it("should update a weight entry", async () => {
    // 1️⃣ Add a weight entry first
    const user = await User.findById(userId);
    const weightEntry = user.weights.create({
      weight: 175,
      date: "2025-09-29",
    });
    user.weights.push(weightEntry);
    await user.save();

    // 2️⃣ Update the weight entry
    const res = await request(app)
      .put("/api/users/weight")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId, // from test setup
        weightId: weightEntry._id, // ID of the entry to update
        newWeight: 176,
        newDate: "2025-09-30",
      });

    // 3️⃣ Assertions
    expect(res.statusCode).toBe(200);
    expect(res.body.weight).toBe(176);
    expect(new Date(res.body.date)).toEqual(new Date("2025-09-30"));

    // 4️⃣ Optional: verify DB is updated
    const updatedUser = await User.findById(userId);
    const updatedEntry = updatedUser.weights.id(weightEntry._id);
    expect(updatedEntry.weight).toBe(176);
    expect(new Date(updatedEntry.date)).toEqual(new Date("2025-09-30"));
  });

  it("should delete a weight entry", async () => {
    const user = await User.findById(userId);
    const weightEntry = user.weights.create({
      weight: 175,
      date: "2025-09-29",
    });
    user.weights.push(weightEntry);
    await user.save();

    const res = await request(app)
      .delete(`/api/users/weight/`)
      .set("Authorization", `Bearer ${token}`)
      .send({ userId, weightId: weightEntry._id });
    expect(res.statusCode).toBe(200);

    const updatedUser = await User.findById(userId);
    expect(updatedUser.weights.length).toBe(0);
  });

  it("should fail to access weights without token", async () => {
    const res = await request(app).get(`/api/users/${userId}/weights`);
    expect(res.statusCode).toBe(400);
  });
});
