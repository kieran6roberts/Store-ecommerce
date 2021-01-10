# YourCoffeeShop-ecommerce

This is an ecommerce store built for a fictional coffee company that require a new online presence to be able to sell their coffee related products such as coffee beans, portable mugs and other miscellaneous items.

## Table of contents
* [Project Objectives](#project-objectives)
* [Main Features](#main-features)
* [Primary Technologies](#primary-technologies)
* [Getting Started](#getting-started)
* [Running Tests](#running-tests)
* [Author](#author)

<br />

## Main Features
* e-commerce product store
* persistent cart
* user saved products
* checkout proccess
* payment
* user product reviews

## Project Objectives
The objective of this project is to build a fully functional e-commerce store that allows the company to be able sell their products online. Users should be able to browse the companies products, add them to a persistent cart and remove them if they are no longer needed.
<br />
They will also be able to save products in a saved for later component and go through the checkout process to pay for the contents of their cart. The site should also support multiple languages other than english to appeal to international buyers.
<br />
Finally it is required to be responsive and accessible as all modern sites should be.

## Primary Technologies
Next.js allows us to use SSG to build the site for speed while its image optimization is perfect for the many product images the site requires. The UI will be built using Chakra UI to quickly build accessible and composable components and typescript provides type safety to the app.

* next 10.0.5
* react 17.0.1
* typescript 4.1.3
* aws amplify
* @chakra-ui/react 1.1.2
* @stripe/react-stripe-js
* jest 26.6.3
* @testing-library/react 11.2.3

<br />

## Getting Started
To run in development:
```
yarn dev
```

To run in production:
```
yarn build
```

To run eslint with fixes:
```
yarn lint-fix
```

<br />

## Running Tests
To run tests:
```
yarn test
```

<br />

## Author

* Kieran Roberts