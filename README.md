# excellens/elementary

A custom element library in plain javascript (almost).

## About

Let's jump right in, what is this library and what can it be used for. First, some software-architectural details and 
basics:

An elementary component can extend any html element in a document and add logic to it. The component base element can be
existing or non-existing (in which case it will be created). Any logic added to it will continue to exist when the
element is newly or already added to the document.

The library is built around the [mvp pattern](https://en.wikipedia.org/wiki/model–view–presenter) and inspired by the
[mvp clean]() approach. The segregation between model (state), view (component) and the presenter, where the application
logic resides, is enforced.

The state of an element implements a [observer pattern](https://en.wikipedia.org/wiki/observer_pattern), which allows it
to share its state with an unlimited number of other elements (well, technically the limitation depends on the client
browser performance).

As it was mentioned already, elementary is written in plain javascript, except when it comes to the source, where some 
[es6 stuff](https://caniuse.com/?search=es6) is used. That's mainly due to the ease of maintainability it provides and
the rollup build erase all of its traces, since this library is browser-only by philosophy.

## Installation

```bash
npm install @excellens/elementary --save
```

Yes, it's as simple as that.

## Usage

> tbd

## License

It's MIT.
