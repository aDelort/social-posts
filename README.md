# Social posts

3-dimensional visualization of streamed social posts.

[This](http://stream.upfluence.co/stream) HTTP endpoint streams data about posts processed by [Upfluence](https://www.upfluence.com/). This application is a visualization of that stream in real-time, as a punch card. The coordinates of the posts in the punch card depend on the hour of the day (X-Axis) and day of the week (Y-Axis) at which it was posted. The third dimension, the size of the points, represents the number of posts.

Its latest version is deployed [here](https://social-posts-adelort.vercel.app).

## Technical stack

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), with the Typescript template.

### Librairies :

- [Recharts](https://recharts.org/) - Composable charting library built for React
- [date-fns](https://date-fns.org/) - Tool for manipulating dates
- [Lodash](https://lodash.com/) - Utility librairy

### UI :

- [xstyled](https://xstyled.dev/) - Flexible Css-in-JS framework that allows to write CSS in the JSX tag notation, encapsulating the style with the component

### Formatting and linting :

- [Eslint](https://eslint.org/) - Static analyze of code, to catch some errors before the build
- [Prettier](https://prettier.io/) - Formatting of the code

### Testing

- [Cypress](https://www.cypress.io/) Testing framework, for unit tests, integration tests and end-to-end tests. Allows to test React components.
- [faker](https://github.com/Marak/faker.js/) - Used to generate fake data during tests

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn cy`

Launches Cypress

### `yarn cy-ct`

Launches Cypress for component testing

## Possible improvements

In order to keep it simple, the algorithm used in the component **PostsChart** performs a _groupBy_ on the whole set of collected data, without taking into account the previous _groupBy_. However, the relatively small amount of data streamed by the API does not induce performance issues, and allows the code to be more concise and understandable. With a larger amount of streamed data, a solution for scaling might be to insert the new streamed data in the previously computed array, instead of computing the whole array each time.
