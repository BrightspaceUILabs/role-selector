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
		it('should construct role-selector', () => {
			runConstructor('d2l-labs-role-selector');
		});
	});
});
