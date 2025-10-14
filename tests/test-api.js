import request from "supertest";
import app from "../index.js"; // import the app directly

async function runTests() {
  try {
    // Test health check
    const res1 = await request(app).get("/");
    if (res1.status !== 200) throw new Error("Health check failed");

    // Test register
    const res2 = await request(app)
      .post("/auth/register")
      .send({
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
        profile_picture: ""
      });
    if (![200, 201].includes(res2.status)) throw new Error("Register failed");

    // Test login
    const res3 = await request(app)
      .post("/auth/login")
      .send({
        email: "testuser@example.com",
        password: "password123"
      });
    if (res3.status !== 200) throw new Error("Login failed");

    console.log("✅ All tests passed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
  }
}

runTests();
