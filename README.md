# Cat-cliker - _Frameworks Front-End_

[![Netlify Status](https://api.netlify.com/api/v1/badges/643d5518-6f1c-4abe-928e-532c61629851/deploy-status)](https://app.netlify.com/sites/cat-clicker-stylesage/deploys)

## DEMO

[cat-clicker-stylesage.netlify.app](https://cat-clicker-stylesage.netlify.app/)

## Description

For the resolution of this test, I have established the [Stepper](https://quasar.dev/vue-components/stepper) provided by [Quasar](https://quasar.dev/) as a central component, thus delimiting the steps marked in the statement.

To load the cat images (GIF in this case) I have used [The Cat API](https://thecatapi.com/) service . For the generation of random names I have relied on the [faker.js](https://github.com/marak/Faker.js/) library, specifically I have used the [Faker Cloud](https://fakercloud.com/) service, which allows me to use _faker.js_ without need to install it locally, simply consuming an endpoint.

The downside of both APIs is that with free accounts, they have a major limitation. So in case of being exceeded any of the daily quotas, I have established a name and reserve GIF that allows to continue enjoying the experience without cuts (as well as offline).

## Desirable enhancements

With a little more time, I would have added a couple of extra features:

- Automatic themes, with the possibility of being changed manually by the user (including the dark theme).
- Multilanguage system (with at least English).

## License

MIT
