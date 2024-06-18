import '../role-selector.js';
import { expect, fixture, html, runConstructor } from '@brightspace-ui/testing';

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
