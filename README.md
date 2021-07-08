# StyleSage technical test

## Description

In this repository you will find distributed in its different branches, the different exercises of which the technical test is composed. In such a way that to access the different exercises, it is enough to switch to each one:

- [cat-clicker](https://github.com/MAMUGI1492/stylesage-technical-test/tree/cat-clicker)
- [animated-gifs](https://github.com/MAMUGI1492/stylesage-technical-test/tree/animated-gifs)
- data-visualization (WIP)

## Demo

Likewise, each exercise has been hosted in [Netlify](https://www.netlify.com/), in order to access the production compilation without having to compile it locally, ready to serve:

- [cat-clicker](https://cat-clicker-stylesage.netlify.app/)
- [animated-gifs](https://animated-gifs-stylesage.netlify.app/)
- data-visualization (WIP)

## DIY

In case you want to do the compilation yourself locally, you just need to:

### Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Build the app for production

```bash
quasar build
```

## Stack

The stack chosen was the v2 of the Vue metaframework, [Quasar](https://quasar.dev/), which apart from using the v3 of Vue, and all its attached libraries (Vue Router, Vuex, Vue-I18n...) allows you to implement compilations in a very fast way for PWA, Cordova/Capacitor (Android/iOS), Electron (PC). As well as an endless number of visual components, and utilities of all kinds ready to use.

As Languages I have chosen to use Typescript, along with HTML and CSS (over the SASS preprocessor, in its syntactic variant of SCSS).

It is also worth mentioning that for the consumption of the different APIs I have chosen to use [Axios](https://axios-http.com/) instead of its native variant [Fecth API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), due to greater familiarity.

## License

MIT
