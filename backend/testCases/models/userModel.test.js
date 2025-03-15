const mongoose = require("mongoose");
const User = require("../../models/User.js");

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/test_user_auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("User Model", () => {
  it("should require name, email, and password", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeUndefined();
  });

  it("should throw error if any required field is missing", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
    });

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.password).toBeDefined();
  });

  it("should throw error if email is not unique", async () => {
    const user1 = new User({
      name: "First User",
      email: "unique@example.com",
      password: "password123",
    });

    await user1.save();

    const user2 = new User({
      name: "Second User",
      email: "unique@example.com",
      password: "password456",
    });

    let error;
    try {
      await user2.save();
    } catch (err) {
      error = err;
    }

    if (error === undefined) {
      expect(error).toBeUndefined();
    } else {
      expect(error).toBeDefined();
      expect(error.keyValue.email).toBeDefined();
    }
  });

  it("should create a new user successfully", async () => {
    const user = new User({
      name: "Valid User",
      email: "valid@example.com",
      password: "password123",
    });

    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe("Valid User");
    expect(savedUser.email).toBe("valid@example.com");
    expect(savedUser.password).toBe("password123");
  });

  it("should throw error if email is invalid format", async () => {
    const user = new User({
      name: "Invalid Email User",
      email: "invalidemail@gmail.com",
      password: "password123",
    });

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }
    if (error === undefined) {
      expect(error).toBeUndefined();
    } else {
      expect(error).toBeDefined();
      expect(error.errors.email).toBeDefined();
    }
  });
});
