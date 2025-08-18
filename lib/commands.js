module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
  putText: async function (page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },
  seatReservationData: async function(page, selector) {
  	try {
  		const data = await page.$(selector);
  		await data.click();
  	} catch (error) {
  		throw new Error(`Not possible to type text for selector: ${selector}`);
  	}
  },
  seatReservationTime: async function(page, selector) {
  	try {
  	  const bookingTime = await page.$(selector);
  		await bookingTime.click();
  	} catch (error) {
  		throw new Error(`Not possible to type text for selector: ${selector}`);
  	}
  },
  seatReservationOne: async function(page, selector) {
  	try {
  		await page.waitForSelector(selector, {visible: true, timeout: 5000});
      await page.click(selector);
    	} catch (error) {
  		throw new Error(`Not possible to type text for selector: ${selector}`);
  	}
  },
  getTextReservation: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
  ticketPrice: async function(page, selector) {
  	try {
  		await page.waitForSelector(selector, {visible: true, timeout: 5000});
      await page.click(selector);
    	} catch (error) {
  		throw new Error(`Not possible to type text for selector: ${selector}`);
  	}
  },
};
