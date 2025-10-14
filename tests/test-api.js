import fetch from "node-fetch";

const BASE_URL = "http://localhost:3000";

async function runTests() {
  try {
    // Test health check
    const res1 = await fetch(`${BASE_URL}/`);
    if (res1.status !== 200) throw new Error("Health check failed");

    // Test register
    const res2 = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "testuser@example.com",
        password: "password123"
      }),
    });
    if (![200, 201].includes(res2.status)) throw new Error("Register failed");

    // Test login
    const res3 = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "testuser@example.com",
        password: "password123"
      }),
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
