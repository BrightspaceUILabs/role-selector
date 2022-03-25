# d2l-labs-role-selector

[![NPM version](https://img.shields.io/npm/v/@brightspace-ui-labs/role-selector.svg)](https://www.npmjs.org/package/@brightspace-ui-labs/role-selector)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

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
> - [x] [Localization](https://github.com/BrightspaceUI/guide/wiki/Localization) with Serge (if applicable)
> - [x] Demo page
> - [x] README documentation

Select roles from a dialog with role items

![Example](demo/example-dialog-content.png)

## Installation

To install from NPM:

```shell
npm install @brightspace-ui-labs/role-selector
```

## Usage

Include the webcomponents.js polyfill loader (for browsers who don't natively support web components), then include necessary components:

```html
<head>
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

To start a [@web/dev-server](https://modern-web.dev/docs/dev-server/overview/) that hosts the demo page and tests:

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

The golden snapshots in source control must be updated by the [visual-diff GitHub Action](https://github.com/BrightspaceUI/actions/tree/main/visual-diff).  If a pull request results in visual differences, a draft pull request with the new goldens will automatically be opened against its branch.

To run the tests locally to help troubleshoot or develop new tests, first install these dependencies:

```shell
npm install @brightspace-ui/visual-diff@X mocha@Y puppeteer@Z  --no-save
```

Replace `X`, `Y` and `Z` with [the current versions](https://github.com/BrightspaceUI/actions/tree/main/visual-diff#current-dependency-versions) the action is using.

Then run the tests:

```shell
# run visual-diff tests
npx mocha './test/**/*.visual-diff.js' -t 10000
# subset of visual-diff tests:
npx mocha './test/**/*.visual-diff.js' -t 10000 -g some-pattern
# update visual-diff goldens
npx mocha './test/**/*.visual-diff.js' -t 10000 --golden
```

## Versioning & Releasing

The [incremental-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/main/incremental-release) is called from the `release.yml` GitHub Action workflow to handle version changes and releasing.

### Triggering a Release

Releases occur based on the most recent commit message:
* Commits which contain `[increment patch]` will trigger a `patch` release. Example: `validate input before using [increment patch]`
* Commits which contain `[increment minor]` will trigger a `minor` release. Example: `add toggle() method [increment minor]`
* Commits which contain `[increment major]` will trigger a `major` release. Example: `breaking all the things [increment major]`

**Note:** When merging a pull request, this will be the merge commit message.

### Default Increment

Normally, if the most recent commit does not contain `[increment major|minor|patch]`, no release will occur. However, by setting the `DEFAULT_INCREMENT` option you can control which type of release will occur. This repo has the `DEFAULT_INCREMENT` set to be a `patch` release.

In this example, a minor release will occur if no increment value is found in the most recent commit:

```yml
uses: BrightspaceUI/actions/incremental-release@main
with:
  DEFAULT_INCREMENT: minor
```

### Skipping Releases

When a default increment is specified, sometimes you want to bypass it and skip a release. To do this, include `[skip version]` in the commit message.
