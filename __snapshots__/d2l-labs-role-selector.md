# `d2l-labs-role-selector`

## `eventing`

####   `should render with correct role items`

```html
<div>
  <p>
    All Roles
  </p>
</div>
<d2l-button type="button">
  Select Roles
</d2l-button>
<d2l-dialog
  id="dialog"
  title-text="Select Roles"
  width="300"
>
  <d2l-input-checkbox>
    All Roles
  </d2l-input-checkbox>
  <hr>
  <slot>
  </slot>
  <d2l-button
    data-dialog-action="done"
    disabled=""
    id="confirm"
    primary=""
    slot="footer"
    type="button"
  >
    Select
  </d2l-button>
  <d2l-button
    data-dialog-action=""
    slot="footer"
    type="button"
  >
    Cancel
  </d2l-button>
</d2l-dialog>

```

