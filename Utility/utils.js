const { expect } = require("@playwright/test");

class Utils {
  constructor(page, locators) {
    this.page = page;
    this.locators = locators;
  }

  async visit(url) {
    await this.page.goto(url);
  }

  // !----------------------------------------------------------------
  // Waits

  async waitVisible(locator) {
    await this.page.waitForSelector(locator, { state: "visible" });
  }

  async waitVisibleTimeout(locator) {
    await this.page
      .locator(locator)
      .waitFor({ state: "visible", timeout: 5000 });
  }

  async waitToBeVisible(locator) {
    await this.page.locator(locator).toBeVisible();
  }

  async simpleWait(locator) {
    const val = this.page.locator(locator).isVisible();
    if (!val) {
      await this.page.waitForTimeout(5000);
      console.log("Not visible");
    } else {
      console.log("Visible");
    }
  }

  //   !----------------------------------------------------------------
  // General

  async text(locator, text) {
    await this.waitVisible(locator);
    const actualText = await this.page.locator(locator).innerText();
    expect(actualText).toEqual(expect.stringContaining(text));
  }

  async click(locator) {
    await this.waitVisible(locator);
    await this.page.click(locator);
  }

  async enter(locator, text) {
    await this.waitVisible(locator);
    await this.page.locator(locator).fill(text);
  }

  async selectCurrentDate(calendarCellLocator) {
    const today = new Date().getDate();
    const currentDayLocator = `${calendarCellLocator}:text-is("${today}")`;
    await this.waitVisible(currentDayLocator);
    await this.click(currentDayLocator);
  }

  async selectDate(calendarCellLocator, Daate) {
    const currentDayLocator = `${calendarCellLocator}:text-is("${Daate}")`;
    await this.waitToBeVisible(currentDayLocator);
    await this.click(currentDayLocator);
  }

  async visibility(locator) {
    await this.waitVisible(locator);
    expect(this.page.locator(locator)).toBeVisible();
  }

  async verifyVisibilityPlaceholder(locator, text) {
    await this.waitVisible(locator);
    const placeholderText = await this.page
      .locator(locator)
      .getAttribute("placeholder");
    expect(placeholderText).toBe(text);
  }

  async verifyVisibilityInputText(locator, text) {
    await this.waitVisible(locator);
    const inputText = await this.page.locator(locator).textContent();
    console.log(inputText);
    expect(inputText).toBe(text);
  }

  // !----------------------------------------------------------------
  // Page Specific

  async verifyRadioButtonChecked(radioButton) {
    const isChecked = await this.page.isChecked(radioButton);
    console.log(`${radioButton} is checked: ${isChecked}`);
    expect(isChecked).toBe(true);
  }

  async verifySelectedOption(inputLocator, expectedValue) {
    const inputValue = await this.page.inputValue(inputLocator);
    console.log(`Selected option: ${inputValue}`);
    expect(inputValue).toBe(expectedValue);
  }

  async verifyDate(locator) {
    const inputValue = await this.page.inputValue(locator);
    console.log(`Selected date: ${inputValue}`);
    const today = new Date();
    const expectedDate = today.toISOString().split("T")[0];
    console.log(`Expected date: ${expectedDate}`);
    expect(inputValue).toBe(expectedDate);
  }
}

module.exports = Utils;
