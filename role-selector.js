import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/colors/colors.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';

class RoleSelector extends LitElement {

	static get properties() {
		return {
			_itemCount: { type: Number },
			_selectedItemCount: { type: Number },
			_selectedItemText: { type: String }
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
			hr {
				background-color: var(--d2l-color-sylvite);
				border: 1px solid var(--d2l-color-sylvite);
			}
		`;
	}

	constructor() {
		super();
		this._itemCount = 0;
		this._selectedItemCount = 0;
	}

	async firstUpdated() {
		this._itemCount = this._getItems().length;
		this._selectedItemCount = this._itemCount;
		this._selectedItemText = 'All Roles';
	}

	render() {
		return html`
			<div>
				<p>${this._selectedItemText}</p >
			</div>
			<d2l-button @click='${this._handleDialog}'>Select Roles</d2l-button>
			<d2l-dialog id='dialog' width='300' title-text='Select Roles' @d2l-labs-role-item-selection-change='${this._handleSelectionChange}' >
				<d2l-input-checkbox id='allRoles' @change=${this._handleSelectAllRoles} ?checked=${this._selectedItemCount === this._itemCount}>All Roles</d2l-input-checkbox>
				<hr>
				<slot @slotchange="${this._handleSlotChange}"></slot>
				<d2l-button id='confirm' slot='footer' primary data-dialog-action='done' @click=${this._handleConfirmBtn} ?disabled=${this._selectedItemCount === 0}>Select</d2l-button>
				<d2l-button slot='footer' data-dialog-action>Cancel</d2l-button>
			</d2l-dialog>
		`;
	}

	_getItems() {
		return this.shadowRoot.querySelector('slot').assignedNodes({ flatten: true }).filter((node) => {
			return node.nodeType === Node.ELEMENT_NODE;
		});
	}

	_getSelectedItems() {
		return this._getItems().filter((item) => {
			return item.selected;
		});
	}

	_handleSlotChange() {
		this._itemCount = this._getItems().length;
		this._selectedItemCount = this._getSelectedItems().length;
	}

	_handleDialog() {
		this.shadowRoot.querySelector('#dialog').opened = true;
	}

	_handleSelectAllRoles(e) {
		const items = this._getItems();
		items.forEach(item => {
			item.selected = e.target.checked;
		});
		this._selectedItemCount = (e.target.checked ? this._itemCount : 0);
	}

	_handleSelectionChange() {
		const items = this._getItems();
		this._selectedItemCount = items.reduce((acc, item) => {
			if (item.selected) return ++acc;
			else return acc;
		}, 0);
	}

	_handleConfirmBtn() {
		const selectedItems = this._getSelectedItems();

		this._selectedItemText = '';
		if (selectedItems.length === this._itemCount) {
			this._selectedItemText = 'All Roles';
		} else {
			for (let i = 0; i < selectedItems.length; i++) {
				if (i > 0) {
					this._selectedItemText = `${this._selectedItemText},  ${selectedItems[i].displayName}`;
				} else {
					this._selectedItemText = `${selectedItems[i].displayName}`;
				}
			}
		}

		this.dispatchEvent(new CustomEvent('d2l-labs-role-selected', {
			detail: {
				message: selectedItems
			},
			bubbles: true,
			composed: true
		}));
	}
}

customElements.define('d2l-labs-role-selector', RoleSelector);
