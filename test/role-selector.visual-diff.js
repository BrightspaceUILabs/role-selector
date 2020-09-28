const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');
const { oneEvent } = require('@brightspace-ui/visual-diff/helpers');

describe('d2l-labs-role-selector', () => {

	const visualDiff = new VisualDiff('role-selector', __dirname);

	let browser, page;

	before(async () => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser);
		await page.setViewport({ width: 800, height: 800, deviceScaleFactor: 2 });
		await page.goto(`${visualDiff.getBaseUrl()}/test/role-selector.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	beforeEach(async () => {
		await visualDiff.resetFocus(page);
	});

	after(async () => await browser.close());

	[
		{name: 'initial', selector: '#with-role-item'},
		{name: 'role-item-content', selector: '#with-role-item', action: (selector) => page.$eval(selector, (elem) => elem._handleDialog())},
		{name: '1-role-item-unchecked', selector: '#with-role-item', action: async (selector) => { // Why `All Roles' is not unchecked?
			const eventPromise = page.$eval(selector, (elem) => {
				const dialog = elem.shadowRoot.querySelector('#dialog');
				return new Promise((resolve) => {
					dialog.addEventListener('d2l-labs-role-item-selection-change', resolve);
				});
			});
			await page.$eval(selector, (elem) => elem._handleDialog());
			await page.$eval(`${selector} > d2l-labs-role-item`, (elem) => {
				return elem.selected = false;
			}); 
			await eventPromise;
		}},
		{ name: '2-role-items-selected', selector: '#with-role-item', action: async (selector) => {
			await page.$eval(selector, (elem) => elem._handleDialog());
			await page.$eval(`${selector} > d2l-labs-role-item`, (elem) => elem.selected = false);
			return page.$eval(selector, (elem) => {
				elem.shadowRoot.querySelector('#confirm').click();
			});
		}},
		{name: 'all-roles-unchecked', selector: '#with-role-item', action: async (selector) => {
			await page.$eval(selector, (elem) => elem._handleDialog());
			return page.$eval(selector, (elem) => {
				elem.shadowRoot.querySelector('#allRoles').checked = false; // why all roles are not unchecked?
			});
		}}
	].forEach((info) => {

		it(info.name, async function() {
			if (info.action) {
				await info.action(info.selector);
			}
			await visualDiff.screenshotAndCompare(page, this.test.fullTitle());
		});


	});
});
