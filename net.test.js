const { expect } = require("chai");
const {
  clickElement,
  putText,
  getText,
  seatReservationData,
  seatReservationTime,
  seatReservationOne,
  getTextReservation,
  inactiveButton,
} = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Netology.ru tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://netology.ru");
  });

  test("The first test'", async () => {
    const title = await page.title();
    console.log("Page title: " + title);
    await clickElement(page, "header a + a");
    const title2 = await page.title();
    console.log("Page title: " + title2);
    const pageList = await browser.newPage();
    await pageList.goto("https://netology.ru/navigation");
    await pageList.waitForSelector("h1");
  });

  test("The first link text 'Медиа Нетологии'", async () => {
    const actual = await getText(page, "header a + a");
    expect(actual).toContain("Медиа Нетологии");
  });

  test("The first link leads on 'Медиа' page", async () => {
    await clickElement(page, "header a + a");
    const actual = await getText(page, ".logo__media");
    await expect(actual).toContain("Медиа");
  });
});

test("Should look for a course", async () => {
  await page.goto("https://netology.ru/navigation");
  await putText(page, "input", "тестировщик");
  const actual = await page.$eval("a[data-name]", (link) => link.textContent);
  const expected = "Тестировщик ПО";
  expect(actual).toContain(expected);
});

test("Should show warning if login is not email", async () => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await putText(page, 'input[type="email"]', generateName(5));
});

describe.only("Website Test 'Идем в Кино", () => {
	beforeEach(async () => {
		page = await browser.newPage();
		await page.goto("http://qamid.tmweb.ru/client/index.php");
	});

	test("Booking a ticket for the Witcher movie in the Modern Hall", async () => {
		const expected = "Получить код бронирования";
		await seatReservationData(page, "a:nth-child(2)");
		await seatReservationTime(
			page,
			".movie-seances__time[href='#'][data-seance-id='225']"
		);
		await seatReservationOne(page, "div:nth-child(8) span:nth-child(7)");
		await page.click(".acceptin-button");
		const actual = await getTextReservation(page, ".acceptin-button");
		expect(actual).to.contain(expected);
	});

	test("Ticket price for two VIP and standard seats", async () => {
		const expected = "1500";
		await seatReservationData(page, "a:nth-child(2)");
		await seatReservationTime(
			page,
			".movie-seances__time[href='#'][data-seance-id='199']"
		);
		await seatReservationOne(page, "div:nth-child(4) span:nth-child(6)");
		await seatReservationOne(page, "div:nth-child(4) span:nth-child(7)");
		await page.click(".acceptin-button");
		const actual = await getTextReservation(page, ".ticket__details.ticket__cost");
		expect(actual).to.contain(expected);
	});

	test("Trying to sign up for an expired session", async () => {
		const actual = await inactiveButton(page, "body > main:nth-child(3) > section:nth-child(1) > div:nth-child(2) > ul:nth-child(2) > li:nth-child(1)");

		expect(actual).to.equal(true);
	});

});