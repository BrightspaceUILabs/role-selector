import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';

class RoleItem extends LitElement {

	static get properties() {
		return {
			itemId: { type: Number },
			displayName: { type: String },
			checked: { type: Boolean }
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
		this.checked = true;
	}

	render() {
		return html`
			<d2l-input-checkbox
				id='item'
				.checked="${this.checked}"
				.value=${this.itemid}
				name = ${this.displayName}	
				@click=${this._handleSelectionClick}>
			${this.displayName}
			</d2l-input-checkbox>
		`;
	}

	selectedCount() {
		var count = 1;
		let nodes = this._fetchNodes();
		nodes.forEach(obj => {
			if (obj.shadowRoot.querySelector('#item').checked) {
				count += 1;
			}
		});
		return count;
	}

	unSelectedCount() {
		var count = 1;
		let nodes = this._fetchNodes();
		nodes.forEach(obj => {
			if (!obj.shadowRoot.querySelector('#item').checked) {
				count += 1;
			}
		});
		return count;
	}

	_fetchNodes() {
		let slots = this.parentNode.shadowRoot.querySelector('slot');
		return slots.assignedElements();
	}

	_handleSelectionClick(e) {
		let nodes = this._fetchNodes();
		let roleCount = nodes.length;

		if (!e.target.checked) {
			if (this.selectedCount() === roleCount) {
				this.parentNode.shadowRoot.querySelector('#allRoles').checked = true;
			}
			this.parentNode.shadowRoot.querySelector('#confirm').disabled = false;
		} else {
			if (this.unSelectedCount() === roleCount) {
				this.parentNode.shadowRoot.querySelector('#confirm').disabled = true;
			}
			this.parentNode.shadowRoot.querySelector('#allRoles').checked = false;
		}
	}
}

customElements.define('d2l-labs-role-item', RoleItem);
