import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/colors/colors.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { inputLabelStyles } from '@brightspace-ui/core/components/inputs/input-label-styles';

const DONE_ACTION = 'done';

class RoleSelector extends LitElement {

	static get properties() {
		return {
			_filterData: {
				type: Array
			},
			_initialSelection: {
				type: Array
			},
			_itemCount: {
				type: Number
			},
			_selectedItemCount: {
				type: Number
			},
			_selectedItemText: {
				type: String
			},
			title: {
				type: String,
				attribute: 'title'
			}
		};
	}

	static get styles() {
		const roleSelectorStyles = css`
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
		return [
			roleSelectorStyles,
			inputLabelStyles
		];
	}

	constructor() {
		super();

		this._itemCount = 0;
		this._selectedItemCount = 0;
		this._selectedItemText = '';
		this._filterData = [];
		this.title = '';
	}

	async firstUpdated() {
		this._itemCount = this._getItems().length;

		const selectedItems = this._getSelectedItems().length === 0 ? this._getItems() : this._getSelectedItems();
		this._renderSelectedItemsText(selectedItems);
	}

	render() {
		return html`
			<div class='d2l-input-label'>
				<d2l-input-label> Roles Included: </d2l-input-label>
				<d2l-input-label> ${this._selectedItemText}</d2l-input-label>
			</div>
			<d2l-button id='dialog-btn' title='${this.title}' @click='${this._handleDialog}'>Select Roles</d2l-button>
			<d2l-dialog
					id='dialog'
					width='300'
					title-text='Select Roles'
					@d2l-dialog-close=${this._handleDialogClosed}
					@d2l-labs-role-item-selection-change='${this._handleSelectionChange}'>
					<d2l-input-checkbox
									id='allRoles'
									@change=${this._handleSelectAllRoles} ?checked=${this._selectedItemCount === this._itemCount}>
									All Roles
					</d2l-input-checkbox>
					<hr>
					<slot @slotchange="${this._handleSlotChange}"></slot>
					<d2l-button id='confirm' slot='footer' primary data-dialog-action='${DONE_ACTION}' ?disabled=${this._selectedItemCount === 0}>Select</d2l-button>
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
		this._initialSelectedRoles();
	}

	_initialSelectedRoles() {
		this._initialSelection = this._getSelectedItems().map(obj => {
			return obj.itemId;
		});
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

	_handleDialogClosed(event) {
		const { detail: { action } } = event;

		if (action === DONE_ACTION) {
			this._renderSelectedItemsText(this._getSelectedItems());
		} else {
			this._getItems().forEach(item => {
				item.selected = this._initialSelection.includes(item.itemId);
			});
		}
	}

	_handleEvent() {
		this.dispatchEvent(new CustomEvent('d2l-labs-role-selected', {
			detail: {
				rolesSelected: this._filterData
			},
			bubbles: true,
			composed: true
		}));
	}

	_renderSelectedItemsText(selectedItems) {
		this._selectedItemText = '';
		const roleItems = this._getItems();

		if (roleItems.length === 0) {
			const dialogBtn = this.shadowRoot.querySelector('#dialog-btn');
			dialogBtn.disabled = true;
			dialogBtn.setAttribute('aria-disabled', 'true');

			this._selectedItemText = 'You do not have permission to view roles for this org unit';
		} else if (selectedItems.length === 0 || selectedItems.length === this._itemCount) {
			roleItems.forEach(item => {
				item.selected = true;
			});

			this._selectedItemCount = this._itemCount;
			this._selectedItemText = 'All Roles';
		} else {
			this._selectedItemCount = selectedItems.length;

			selectedItems.forEach((item, index) => {
				item.selected = true;
				this._selectedItemText = index > 0 ? `${this._selectedItemText},  ${item.displayName}` : `${item.displayName}`;
			});
		}

		this._setFilterData(selectedItems);
		this._handleEvent();
	}

	_setFilterData(roleData) {
		this._filterData = roleData.map(obj => {
			return obj.itemId;
		});
	}
}

customElements.define('d2l-labs-role-selector', RoleSelector);
