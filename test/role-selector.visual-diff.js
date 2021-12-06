import { oneEvent, VisualDiff } from '@brightspace-ui/visual-diff';
import puppeteer from 'puppeteer';

describe('d2l-labs-role-selector', () => {

	const visualDiff = new VisualDiff('role-selector', import.meta.url);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser);
		await page.setViewport({ width: 700, height: 500, deviceScaleFactor: 2 });
		await page.goto(`${visualDiff.getBaseUrl()}/test/role-selector.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	beforeEach(async() => {
		await page.reload(`${visualDiff.getBaseUrl()}/test/role-selector.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await visualDiff.resetFocus(page);
	});

	after(async() => await browser.close());

	it('initial', async function() {
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle());
	});

	it('role-item-content', async function() {
		const dialogOpenEvent = oneEvent(page, '#role-selector', 'd2l-dialog-open');
		await page.$eval('#role-selector', (elem) => {
			elem._handleDialog();
		});
		await dialogOpenEvent;
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle());
	});

	it('1-role-item-unchecked', async function() {
		const dialogOpenEvent = oneEvent(page, '#role-selector', 'd2l-dialog-open');
		const eventPromise = oneEvent(page, '#role-selector > d2l-labs-role-item', 'd2l-labs-role-item-selection-change');
		await page.$eval('#role-selector', (elem) => {
			elem._handleDialog();
			elem.querySelector('d2l-labs-role-item').selected = false;
		});
		await dialogOpenEvent;
		await eventPromise;
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle());
	});

	it('2-role-items-selected', async function() {
		const dialogOpenEvent = oneEvent(page, '#role-selector', 'd2l-dialog-open');
		const dialogCloseEvent = oneEvent(page, '#role-selector', 'd2l-dialog-close');
		await page.$eval('#role-selector', (elem) => {
			elem._handleDialog();
			elem.querySelector('d2l-labs-role-item').selected = false;
		});
		await dialogOpenEvent;
		await page.$eval('#role-selector', (elem) => {
			elem.shadowRoot.querySelector('#confirm').click();
		});
		await dialogCloseEvent;
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle());
	});

	it('all-role-items-unchecked', async function() {
		const dialogOpenEvent = oneEvent(page, '#role-selector', 'd2l-dialog-open');
		const eventPromise = oneEvent(page, '#role-selector > d2l-labs-role-item', 'd2l-labs-role-item-selection-change');
		await page.$eval('#role-selector', (elem) => {
			const items = elem._getItems();
			elem._handleDialog();
			items.forEach(item => {
				item.selected = false;
			});
		});
		await dialogOpenEvent;
		await eventPromise;
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle());
	});
});
