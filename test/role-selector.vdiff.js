import '../role-selector.js';
import '../role-item.js';
import { clickElem, expect, fixture, html, oneEvent } from '@brightspace-ui/testing';

describe('d2l-labs-role-selector', () => {

	let elem, dialogOpenEvent, dialogCloseEvent;
	beforeEach(async() => {
		elem = await fixture(html`
			<d2l-labs-role-selector>
				<d2l-labs-role-item item-id="1" display-name="Administrator"></d2l-labs-role-item>
				<d2l-labs-role-item item-id="2" display-name="Student"></d2l-labs-role-item>
				<d2l-labs-role-item item-id="3" display-name="Instructor"></d2l-labs-role-item>
			</d2l-labs-role-selector>
		`, { viewport: { height: 500, width: 700 } });
		dialogOpenEvent = oneEvent(elem, 'd2l-dialog-open');
		dialogCloseEvent = oneEvent(elem, 'd2l-dialog-close');
	});

	it('initial', async() => {
		await expect(document).to.be.golden();
	});

	it('role-item-content', async() => {
		elem._handleDialog();
		await dialogOpenEvent;
		await expect(document).to.be.golden();
	});

	it('1-role-item-unchecked', async() => {
		const eventPromise = oneEvent(elem.querySelector('d2l-labs-role-item'), 'd2l-labs-role-item-selection-change');
		elem._handleDialog();
		elem.querySelector('d2l-labs-role-item').selected = false;
		await dialogOpenEvent;
		await eventPromise;
		await expect(document).to.be.golden();
	});

	it('2-role-items-selected', async() => {
		elem._handleDialog();
		elem.querySelector('d2l-labs-role-item').selected = false;
		await dialogOpenEvent;
		await clickElem(elem.shadowRoot.querySelector('#confirm'));
		await dialogCloseEvent;
		await expect(document).to.be.golden();
	});

	it('all-role-items-unchecked', async() => {
		const eventPromise = oneEvent(elem.querySelector('d2l-labs-role-item'), 'd2l-labs-role-item-selection-change');
		elem._handleDialog();
		elem._getItems().forEach(item => item.selected = false);
		await dialogOpenEvent;
		await eventPromise;
		await expect(document).to.be.golden();
	});

});
