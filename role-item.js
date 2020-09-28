import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';

class RoleItem extends LitElement {

	static get properties() {
		return {
			itemId: { type: Number, attribute: 'item-id' },
			displayName: { type: String, attribute: 'display-name' },
			selected: { type: Boolean, reflect: true }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	constructor() {
		super();
		this.selected = true;
	}

	render() {
		return html`
			<d2l-input-checkbox
				.checked="${this.selected}"
				.value=${this.itemId}	
				@change=${this._onCheckboxChange}>
			${this.displayName}
			</d2l-input-checkbox>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);
		if (!changedProperties.has('selected')) return;
		this.dispatchEvent(new CustomEvent('d2l-labs-role-item-selection-change', {
			bubbles: true
		}));
	}

	_onCheckboxChange(event) {
		this.selected = event.target.checked;
	}
}

customElements.define('d2l-labs-role-item', RoleItem);
