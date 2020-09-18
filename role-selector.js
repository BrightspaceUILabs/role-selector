import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/button/button.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';

class RoleSelector extends LitElement {

	static get properties() {
		return {
			selectedRoles: { type: Array }
		};
	}

	static get styles() {
		return css`
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
			}
			hr{
				background-color: #dcdcdc;
				border: 0.5px solid #dcdcdc;
			}
		`;
	}

	constructor() {
		super();
		this.selectedRoles = [];
	}

	async firstUpdated() {
		let nodes = this.fetchChildElements();
		this.selectedRoles = nodes.map(obj => {
			return { Identifier: obj.itemId, DisplayName: obj.displayName };
		});
	}

	render() {
		return html`
			<div>
				<p id="selected">All Roles</p>
			</div>
			<d2l-button id="open" @click="${this._handleDialog}">Select Roles</d2l-button>
			<d2l-dialog id="dialog" width="300" title-text="Select Roles">
			<d2l-input-checkbox checked id="allRoles" name="All Roles" @change=${this._handleSelectAllRoles}>
				All Roles
			</d2l-input-checkbox>
			<hr>
			<slot></slot>
			<d2l-button slot="footer" id="confirm" primary data-dialog-action="done" @click=${this._handleConfirmBtn}>Select</d2l-button>
			<d2l-button slot="footer" data-dialog-action>Cancel</d2l-button>
			</d2l-dialog>
		`;
	}

	fetchChildElements() {
		let slots = this.shadowRoot.querySelector('slot');
		return slots.assignedElements();
	}

	_handleDialog() {
		this.shadowRoot.querySelector('#dialog').open();
	}

	_handleSelectAllRoles(e) {
		console.log(e.target.checked);
		let nodes = this.fetchChildElements();
		nodes.forEach(obj => obj.checked = e.target.checked);
		this.shadowRoot.querySelector('#confirm').disabled = !e.target.checked;
	}

	_handleConfirmBtn() {
		this.selectedRoles = [];
		let nodes = this.fetchChildElements();
		nodes.forEach(obj => obj.shadowRoot.querySelector('#item').checked
			? obj.parentNode.selectedRoles.push({ Identifier: obj.itemId, DisplayName: obj.displayName })
			: obj.parentNode.selectedRoles.filter(x => (x.Identifier !== obj.itemId))
		);

		this.shadowRoot.querySelector('#selected').innerHTML = '';
		let count = this.selectedRoles.length;
		if (count === nodes.length) {
			this.shadowRoot.querySelector('#selected').append("All Roles");
		} else {
			for (var index = 0; index < count; index++) {
				if (index > 0) {
					this.shadowRoot.querySelector('#selected').append(', ', this.selectedRoles[index].DisplayName);
				} else {
					this.shadowRoot.querySelector('#selected').append(this.selectedRoles[index].DisplayName);
				}
			}
		}
	}
}

customElements.define('d2l-labs-role-selector', RoleSelector);
