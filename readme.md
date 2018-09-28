# Angular Application Testing Outside of the Church of TDD

This repo contains the code used during my presentation "Angular Application Testing Outside of the Church of TDD". It contains the complete finished code for anyone to look at. It does however _NOT_ include the setup for [Wallaby.js](https://wallabyjs.com/) that I use during the presentation. If you want this, please feel free to reach out to me on Twitter [@ZeroKoll](https://twitter.com/ZeroKoll), and I will get it to you!

## Getting started

Clone repo and open the Code directory. Inside this directory, run

```
npm install
```

to get all the dependencies installed.

## Running the application

To build and run the application, you can either manually run the json-server and Angular application by running

```
json-server data/db.json
```

and

```
ng serve
```

Or, you can run the commands concurrently using the npm script _serve_

```
npm run serve
```

__Note:__ _The application is useless! It wasn't built to be used, it was built to demo Angular testing. So no PRs to add better functionality..._

## Running the unit tests

Running the unit tests is done by using __ng__ as you normally would

```
ng test
```

## Running the e2e tests

These tests can either be run by first starting the json-server

```
json-server data/db.json
```

and then running the e2e tests

```
ng e2e
```

However, this method is a bit slow if you want to play around writing e2e tests, as it has to rebuild the application every time. If you want to skip the rebuild of the application, you can start the application first by running

```
npm run serve
```

and then the tests by either running

```
ng e2e --dev-server-target=
```

or

```
npm run e2e
```