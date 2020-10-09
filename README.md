# d2l-labs-role-selector

[![NPM version](https://img.shields.io/npm/v/@brightspace-ui-labs/role-selector.svg)](https://www.npmjs.org/package/@brightspace-ui-labs/role-selector)
[![Dependabot badge](https://flat.badgen.net/dependabot/BrightspaceUILabs/role-selector?icon=dependabot)](https://app.dependabot.com/)
[![Build status](https://travis-ci.com/@brightspace-ui-labs/role-selector.svg?branch=master)](https://travis-ci.com/@brightspace-ui-labs/role-selector)

> Note: this is a ["labs" component](https://github.com/BrightspaceUI/guide/wiki/Component-Tiers). While functional, these tasks are prerequisites to promotion to BrightspaceUI "official" status:
>
> - [ ] [Design organization buy-in](https://github.com/BrightspaceUI/guide/wiki/Before-you-build#working-with-design)
> - [ ] [design.d2l entry](http://design.d2l/)
> - [x] [Architectural sign-off](https://github.com/BrightspaceUI/guide/wiki/Before-you-build#web-component-architecture)
> - [x] [Continuous integration](https://github.com/BrightspaceUI/guide/wiki/Testing#testing-continuously-with-travis-ci)
> - [x] [Cross-browser testing](https://github.com/BrightspaceUI/guide/wiki/Testing#cross-browser-testing-with-sauce-labs)
> - [ ] [Unit tests](https://github.com/BrightspaceUI/guide/wiki/Testing#testing-with-polymer-test) (if applicable)
> - [ ] [Accessibility tests](https://github.com/BrightspaceUI/guide/wiki/Testing#automated-accessibility-testing-with-axe)
> - [x] [Visual diff tests](https://github.com/BrightspaceUI/visual-diff)
> - [ ] [Localization](https://github.com/BrightspaceUI/guide/wiki/Localization) with Serge (if applicable)
> - [x] Demo page
> - [x] README documentation

Select roles from a dialog with role items

## Installation

To install from NPM:

```shell
npm install @brightspace-ui-labs/role-selector
```

## Usage

Include the webcomponents.js polyfill loader (for browsers who don't natively support web components), then include necessary components:

```html
<head>
	<script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
	<script type="module">
		import '/node_modules/@brightspace-ui-labs/role-selector/role-selector.js';
		import '/node_modules/@brightspace-ui-labs/role-selector/role-item.js';
	</script>
</head>
```
Add the component to your page

### Basic Usage

```html
<d2l-labs-role-selector>
	<d2l-labs-role-item item-id="1" display-name="Role1"></d2l-labs-role-item>
	<d2l-labs-role-item item-id="2" display-name="Role2"></d2l-labs-role-item>
	<d2l-labs-role-item item-id="3" display-name="Role3"></d2l-labs-role-item>
	...
</d2l-labs-role-selector>
```

### Events

- `d2l-labs-role-selected`: fired on clicking Select button in the dialog.

**Accessibility:**

To make your usage of `d2l-labs-role-selector` accessible, use the following properties when applicable:

| Attribute | Description |
|--|--|
| | |

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

### Running the demos

To start an [es-dev-server](https://open-wc.org/developing/es-dev-server.html) that hosts the demo page and tests:

```shell
npm start
```

### Linting

```shell
# eslint and lit-analyzer
npm run lint

# eslint only
npm run lint:eslint

# lit-analyzer only
npm run lint:lit
```

### Testing

```shell
# lint, unit test and visual-diff test
npm test

# lint only
npm run lint

# unit tests only
npm run test:headless

# debug or run a subset of local unit tests
# then navigate to `http://localhost:9876/debug.html`
npm run test:headless:watch
```

### Visual Diff Testing

This repo uses the [@brightspace-ui/visual-diff utility](https://github.com/BrightspaceUI/visual-diff/) to compare current snapshots against a set of golden snapshots stored in source control.

```shell
# run visual-diff tests
npm run test:diff

# subset of visual-diff tests:
npm run test:diff -- -g some-pattern

# update visual-diff goldens
npm run test:diff:golden
```

Golden snapshots in source control must be updated by Travis CI. To trigger an update, press the "Regenerate Goldens" button in the pull request `visual-difference` test run.

## Versioning, Releasing & Deploying

All version changes should obey [semantic versioning](https://semver.org/) rules.

Include either `[increment major]`, `[increment minor]` or `[increment patch]` in your merge commit message to automatically increment the `package.json` version, create a tag, and trigger a deployment to NPM.
