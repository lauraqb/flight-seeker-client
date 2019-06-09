# Flight search engine - full-stack

Intro:

Basic flight search front-end, and back-end client that speaks to a 'live pricing' API.

----

**NB:** API key.

## Description

- Uses the 'live pricing' API to find **return flights from Edinburgh to London, departing next Monday and returning the following day**.

- The basic API client is in Node.js - see the API section below. .

- Uses the returned data to display a page of results.

## Design

Design for small-screens (480px). **It looks good at 480px in portrait orientation**.

The design shows a look and feel defined in the [styleguide](https://backpack.github.io/). 

## Client implementation

- [React](https://facebook.github.io/react/).

To run the client:

- `npm install` (once)

- `npm run client` to start the client development build at [http://localhost:3000](http://localhost:3000)

We've wired in [Sass](http://sass-lang.com/) with the base stylesheet (`bpk-stylesheets`) + mixins (`bpk-mixins`) for you to get at -- see the [`Header`](./client/src/components/Header/Header.jsx) component for example use.

## API implementation

This is hitting a real Skyscanner API, and has a basic Node.js client on top of it.

The [`server.js`](./server/src/server.js) file starts an [Express](https://expressjs.com/) server with a couple of routes. To run the server:

- `APIKEY=<key> npm run server` in your terminal; it listens at [http://localhost:4000](http://localhost:4000).

- (If running on Windows, do `set APIKEY=<key> && npm run server` in the command prompt).

The underlying Skyscanner [API documentation is available here](https://skyscanner.github.io/slate/#flights-live-prices) and a [test harness is provided](http://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingQuickStart) for you to try queries out.

You can use the Skyscanner `sky` location schema, and the `EDI-sky` and `LOND-sky` placenames in your query.

**NB:** The [http://localhost:4000/api/search](http://localhost:4000/api/search) route accepts parameters from the front end, and returns results to the front end in an appropriate format.

The API will return collections of different items:

* **Itineraries** - These are the containers for your trips, tying together **Legs**, and **prices**. Prices are offered by an **agent** - an airline or travel agent.

* **Legs** - These are journeys (outbound, return) with **duration**, and **carriers**<sup>[1](#footnote1)</sup>. These contain one or more **Segments** and **stops**.

* **Segments** - Individual flight information with directionality.

A good structure to represent trip options would be hierarchical:

```
Itineraries
  Legs
    Segments
```

Your key will be rate-limited to ~5 queries per minute.


