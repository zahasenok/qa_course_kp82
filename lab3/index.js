const { Builder, By, Key, until, promise } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://www.fb.com");
    const currentUrl = await driver.getCurrentUrl();
    console.assert(currentUrl === "https://www.facebook.com/");
    const createAccountButton = await driver.findElement(
      By.linkText("Create new account")
    );
    console.assert(!!createAccountButton);
    await createAccountButton.click();
    await fillModalInfo(driver);
  } finally {
    await driver.quit();
  }
})();

async function fillModalInfo(driver) {
  await driver.wait(
    until.elementLocated(By.id("custom_gender_container"), 1000)
  );

  await driver.findElement(By.name("firstname")).sendKeys("Ivan", Key.RETURN);
  await driver.findElement(By.name("lastname")).sendKeys("Ivanov", Key.RETURN);

  const email = "somemail@gmail.com";
  await driver.findElement(By.name("reg_email__")).sendKeys(email, Key.RETURN);
  await driver.wait(
    until.elementLocated(By.name("reg_email_confirmation__"), 1000)
  );
  await driver
    .findElement(By.name("reg_email_confirmation__"))
    .sendKeys(email, Key.RETURN);

  const password = "78123hjksdbnf?>?ISJKsad.123.,4AUghJAS";
  await driver
    .findElement(By.id("password_step_input"))
    .sendKeys(password, Key.RETURN);

  await driver.findElement(By.name("birthday_age")).sendKeys(16, Key.RETURN);
  const radioBtns = await driver.findElements(By.name("sex"));
  (await Promise.all(radioBtns))[1].click();

  await driver.findElement(By.name("websubmit")).click();

  await driver.wait(
    until.elementLocated(By.id("birthday_age_confirmation_dialog_title"), 1000)
  );
  await driver.findElement(By.className("uiOverlayButton")).click();
  await driver.findElement(By.name("websubmit")).click();
  await driver.wait(until.elementLocated(By.id("11"), 1000));
}
