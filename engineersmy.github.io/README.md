# Vue-Loader Extended

> Extended vue-loader/webpack boilerplate

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

### Updated 17 March 2017
- Add Vuex as the main store
- Use 'vue-i18n' as main localization
- Add localization for datetime using 'moment' library
- Shift router logic to main.js
- Shift component states to vuex (loader and notification)
- Authenticated user state is now stored in vuex
- Remove bus from main.js, instead of passing each props individually and use an event bus to update state, states are stored in vuex
- Update all npm dependencies (including Vue)

### Added new dependencies
- Sass Loader/Node sass for using lang='sass' in styles
- Added vue router for client side routing management
- Added atomic design format
- Included custom app-header, app-navbar, app-notification, app-body and app-footer
- Added sticky footer
- Added scroll 60fps
- Add colors scss for easier color management
- Added typography.css for easier fonts management
- Added fast-click
- Added i18n localization, with moment js
- Added meta viewport for responsive media
- Added STyles
+ Added reset css
+ added reset box-sizing
+ added custom grid layout

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
