import '../role-selector.js';
import { expect, fixture, html } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
//import sinon from '../node_modules/sinon/pkg/sinon-esm.js';

describe('d2l-labs-role-selector', () => {

	describe('accessibility', () => {
		it('should pass all axe tests', async() => {
			const el = await fixture(html`<d2l-labs-role-selector></d2l-labs-role-selector>`);
			await expect(el).to.be.accessible();
		});
	});

	describe('constructor', () => {
		it('should construct role-selector', () => {
			runConstructor('d2l-labs-role-selector');
		});
	});

	//describe('eventing', () => {
	//	let el;
	//	const tempFixture = html`
	//						<d2l-labs-role-selector>
	//							<d2l-labs-role-item item-id="1" display-name="Administrator"></d2l-labs-role-item>
	//							<d2l-labs-role-item item-id="2" display-name="Student"></d2l-labs-role-item>
	//						</d2l-labs-role-selector>`;

	//	beforeEach(async() => {
	//		el = await fixture(tempFixture);
	//		await new Promise(resolve => setTimeout(resolve, 200));
	//		await el.updateComplete;
	//	});

	//	it('should render all role items as selected', async() => {
	//		const checkboxList = el.shadowRoot.querySelector('slot').assignedNodes({ flatten: true }).filter((node) => {
	//			return node.nodeType === Node.ELEMENT_NODE;
	//		});
	//		expect(checkboxList.length).to.equal(2);
	//		expect(el._itemCount).to.equal(2);
	//	});

	//	it('should hide Select button if all role items are unselected', () => {
	//		const checkboxList = Array.from(el.shadowRoot.querySelectorAll('d2l-labs-role-item'));
	//		checkboxList.forEach(checkbox => {
	//			checkbox.selected = true;
	//		});
	//		expect(el._selectedItemCount).to.be.equal(0);

	//		const buttons = el.shadowRoot.querySelector('d2l-dialog > d2l-button');
	//		expect(buttons.disabled).to.be.true;
	//	});
	//});

});
