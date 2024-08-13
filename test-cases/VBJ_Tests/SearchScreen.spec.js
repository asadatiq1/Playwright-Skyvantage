import { test, beforeEach } from "@playwright/test";
const Utils = require("../../Utility/utils");
const data = require("../../CommonData/Data.json");
const searchScreen_locator = require("../../Locators/Search.json");

let util;

beforeEach(async ({ page }) => {
  util = new Utils(page);
  await util.visit(data.url_VBJ);
});

test("Verify oneway trip button is visible and clickable", async ({ page }) => {
  await util.click(searchScreen_locator.oneWayTrip_radioBTN);
  await util.verifyRadioButtonChecked(searchScreen_locator.oneWayTrip_radioBTN);
});

test("Verify round trip button is visible and clickable", async ({ page }) => {
  await util.click(searchScreen_locator.roundTrip_radioBTN);
  await util.verifyRadioButtonChecked(searchScreen_locator.roundTrip_radioBTN);
});

test("Verify multicity button is visible and clickable", async ({ page }) => {
  await util.click(searchScreen_locator.multiCity_radioBTN);
  await util.verifyRadioButtonChecked(searchScreen_locator.multiCity_radioBTN);
});

test("Verify From input field is visible and clickable", async ({ page }) => {
  await util.click(searchScreen_locator.departureCity_input);
  await util.click(searchScreen_locator.dropdown_BIM);
  await util.verifySelectedOption(
    searchScreen_locator.departureCity_input,
    "BIM - Bimini Bahamas"
  );
});

test("Verify To input field is visible and clickable", async ({ page }) => {
  await util.click(searchScreen_locator.chooseDestination_input);
  await util.click(searchScreen_locator.dropdown_BIM);
  await util.verifySelectedOption(
    searchScreen_locator.chooseDestination_input,
    "BIM - Bimini Bahamas"
  );
});

test("Verify departure date input field is visible and clickable", async ({
  page,
}) => {
  await util.click(searchScreen_locator.departureDate_input);
  await util.selectCurrentDate(searchScreen_locator.calendar_cell);
  await util.verifyDate(searchScreen_locator.departureDate_input);
});

test("Verify return date field is visible and clickable", async ({ page }) => {
  await util.click(searchScreen_locator.returnDate_input);
  await util.selectCurrentDate(searchScreen_locator.calendar_cell);
  await util.verifyDate(searchScreen_locator.returnDate_input);
});

test("Verify Passenger field is visible and clickable", async ({ page }) => {
  await util.click(searchScreen_locator.passenger_input);
  await util.verifyVisibilityInputText(
    searchScreen_locator.passenger_dropdown,
    "Adults"
  );
});
