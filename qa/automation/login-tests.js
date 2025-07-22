const { Builder, By, until } = require("selenium-webdriver");

(async function loginTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. Navigate to login page
    await driver.get("http://localhost:5173/login");

    // 2. Find the email and password input fields and enter valid credentials
    await driver
      .findElement(By.id("username"))
      .sendKeys("testuser@example.com"); // update with test user email
    await driver.findElement(By.id("password")).sendKeys("TestPassword123"); // update with test user password

    // 3. Click the login button
    await driver.findElement(By.id("login-button")).click();

    // 4. Wait until dashboard page loads by checking for a unique element on dashboard
    await driver.wait(until.elementLocated(By.id("dashboard")), 5000);

    console.log("Login test passed: Dashboard loaded successfully.");
  } catch (error) {
    console.error("Login test failed:", error);
  } finally {
    // 5. Close the browser
    await driver.quit();
  }
})();
