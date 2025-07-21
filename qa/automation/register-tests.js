// qa/tests/register.test.js
const { Builder, By, until } = require("selenium-webdriver");

(async function registerTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:5173/register");

    // Scenario 1: Valid registration
    await driver.findElement(By.id("username")).sendKeys("testusers");
    await driver.findElement(By.id("password")).sendKeys("StrongPass123!s");
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.elementLocated(By.id("dashboard"), 5000));
    console.log("✅ Registration Success Test Passed");
  } catch (err) {
    console.error("❌ Registration Test Failed:", err.message);
  } finally {
    await driver.quit();
  }
})();
