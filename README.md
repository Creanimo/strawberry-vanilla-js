# strawberry-vanilla-js
UI components using vanilla javascript

# Dependencies

* this guide assumes you are using an npm project
* mustache
* dotenv

From the root of the npm project:

```bash
npm install mustache
npm install dotenv
npm install rollup-plugin-dotenv
```

# Install

CHANGE: Switched to dotenv for global path variable.

Add with git subtree to desired path e.g.

```bash
git subtree add --prefix path/to/ui-components/strawberry-vanilla-js/ git@github.com:Creanimo/strawberry-vanilla-js.git main --squash
```

Add your project's node_modules folder as a module folder for your packaging tool.

For rollup this may look like this:

```js
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'; // make sure to add to npm

export default {
    // ...
    plugins: [
        //...
        resolve({
            modulePaths: ['node_modules']
        }),
    ]
}
```
