# Strawberry Vanilla JS

This UI framework uses vanilla ES6 JavaScript only (no React).
It's still heavily work in progress at the moment.

## Components

This is the current state of all components

| Component | Usable | Unit Tests | in demo |
| --- | --- | --- | --- |
UiInput/UiTextField | 🟢 | 🟡 | 🟢 |
UiAlertMsg | 🟢 | 🔴 | 🟡 |
UiCodeBlock | 🟢 | 🔴 | 🟡 |

🟡 in demo = some UI components use it, but it doesn't have its own section.

## Demo

See all UI components in action by running the demo.

### Dependencies

- npm

### How to start the demo

```bash
npm install --save-dev
npm run demo 
```

Go to the localhost address shown in your browser.
The demo has log level "info", so you can see debug and error messages in the console.

## Use UI Components in your app

- Add dist folder to your project. This is the content of what will later be available as a release. You can rename it e.g. to sv-ui/
- Copy sv-ui-config.json next to your entry point (e.g. my-app.js),
- open it and change templatePath, so it points to the templates/ folder.
- Initialize config in the entry point of your app:
```js
import { loadConfig } from "./path-to-strawberry-vanilla-ui/index.esm.js";

loadConfig().then(() => {
    // anything that uses the ui components
}

```
- Import components you want to use from index.esm.js

## Developing

Get all dependencies and tools for developing:

```bash
npm install --save-dev
```

### Build

To create the dist folder (which is also used by the demo), run

```bash
npm run build
```

The clean:dist script uses "rm" to clear the dist folder, so it runs only on Linux.
