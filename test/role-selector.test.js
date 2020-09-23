import '../role-selector.js';
import { expect, fixture, html } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-labs-role-selector', () => {

	describe('accessibility', () => {
		it('should pass all axe tests', async() => {
			const el = await fixture(html`<d2l-labs-role-selector></d2l-labs-role-selector>`);
			await expect(el).to.be.accessible();
		});
	});

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-labs-role-selector');
		});
	});

	//describe('eventing', () => {
	//	let el;

	//	beforeEach(async() => {
	//		el = await fixture(html`<d2l-labs-role-selector></d2l-labs-role-selector>`);
	//		await new Promise(resolve => setTimeout(resolve, 200));
	//		await el.updateComplete;
	//	});

	//	it('should fire a d2l-labs-role-selected event when an Select button is clicked', async() => {
	//		el.shadowRoot.querySelector('#confirm').click();

	//		const event = await oneEvent(el, 'd2l-labs-role-selected'); // if no event is fired, this will time out after 2 seconds
	//		expect(event.type).to.equal('d2l-labs-role-selected');
	//		expect(event.target).to.equal(el);
	//	});
	//});

});
