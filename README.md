# YourCoffeeShop-ecommerce

![GitHub top language](https://img.shields.io/github/languages/top/kieran6roberts/Store-ecommerce)
![GitHub last commit](https://img.shields.io/github/last-commit/kieran6roberts/Store-ecommerce)
![Twitter Follow](https://img.shields.io/twitter/follow/kieran6dev?style=social)

This is a full stack serverless ecommerce site built for a fictional coffee company that require a new online presence to be able to sell their coffee related products such as coffee beans and cups/mugs. This project was to built as part of my web-developer portfolio.

![home full page in light mode](/public/home-page.jpg?raw=true "desktop landing page screenshot")

## Table of contents

- [Project Objectives](#project-objectives)
- [Main Features](#main-features)
- [Primary Technologies](#primary-technologies)
- [Project Status](#project-status)
- [Author](#author)

<br />

## Project Objectives

The objective of this project was to build a fully functional serverless e-commerce store that allows the company to be able sell their products online. Users should be able to browse the companies products, add them to a persistent cart and remove them if they are no longer needed. Users will also have the option to sign up an account to the site allowing them to add reviews to products they have purchased.
<br />
They will also be able to save products and go through the checkout process to pay for the contents of their cart.
<br />
Finally it is required to be responsive and accessible as all modern sites should be.

## Main Features

- e-commerce product store
- persistent cart/ saved products
- user authentication
- user accounts
- checkout proccess
- payments
- user product reviews
- pagination

## Primary Technologies

Next.js allows us to combine the best of static site generation with server-side rendering to build the site for speed while its image optimization is perfect for the many product images the site requires. The UI will be built using Chakra UI to quickly build accessible and composable components perfect for an e-commerce site that needs to up and running as soon as possbile. Typescript provides type safety to the app allowing us to avoid potential errors and deliver a succeesful product faster.

By utilizing Hasura backend as a service with auth0 to create an auth users, the app will be able to register users with personal accounts making it easier for users to make further purchases. The handling of the products will be done using GraphCMS beacuse it is ideal for quickly building a hosted graphql api that has a user friendly interface to update store content. This would be perfect to hand off to clients allowing them to update their own data.

- next 10.0.5
- react 17.0.1
- hasura
- graphCMS
- typescript 4.1.3
- @chakra-ui/react 1.1.2
- @stripe/react-stripe-js
- jest 26.6.3
- @testing-library/react 11.2.3

<br />

## Project Status

Project has been deployed on initial release for inclusion in my portfolio. Future plans are to add user search feature to query for store products and categories.

## Author

- Kieran Roberts
