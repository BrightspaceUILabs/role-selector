import { css, html, LitElement } from 'lit';
import { checkboxStyles } from '@brightspace-ui/core/components/inputs/input-checkbox.js';

class RoleItem extends LitElement {

	static get properties() {
		return {
			itemId: {
				type: Number,
				attribute: 'item-id'
			},
			displayName: {
				type: String,
				attribute: 'display-name'
			},
			selected: {
				type: Boolean,
				reflect: true,
				attribute: 'selected'
			}
		};
	}

	static get styles() {
		const roleItemStyles = css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
		return [
			roleItemStyles,
			checkboxStyles
		];
	}

	render() {
		return html`
			<input
				id="checkbox-label"
				type="checkbox"
				class="d2l-input-checkbox"
				.checked="${this.selected}"
				.value=${this.itemId}	
				@change=${this._onCheckboxChange}>
			<label for="checkbox-label">${this.displayName}</label>
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
