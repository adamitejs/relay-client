Relay allows the Adamite client SDK to communicate with Adamite services over a standard WebSocket interface.

[![CircleCI](https://circleci.com/gh/adamitejs/relay-client.svg?style=svg)](https://circleci.com/gh/adamitejs/relay-client)
[![codecov](https://codecov.io/gh/adamitejs/relay-client/branch/master/graph/badge.svg)](https://codecov.io/gh/adamitejs/relay-client)

---

### This package is internal to Adamite, so if you just want to use Adamite, we suggest reading our [Getting Started](https://adamite.gitbook.io/docs/adamite-server/get-started) guide instead.

---

## Installation

```js
yarn add @adamite/relay-client
```

## Quick Start

Start a client...

```js
const { adamite } = require("@adamite/sdk");
const relay = require("@adamite/relay-client");
const client = relay(adamite(), { service: "database" });
```

## Documentation

You can find the Adamite documentation [on our website](https://adamite.gitbook.io/docs).

For a quick overview of Adamite, check out the [getting started](https://adamite.gitbook.io/docs/adamite-server/get-started) guide.

## About Adamite

Adamite is an open source, self host-able, platform as a service.

- **Get up and running quickly:** Adamite lets you develop your apps without worrying about a back end.

- **Database, Authentication, and Functions:** Adamite provides a set of core services required by most applications, and gives you the power to add more to fit your needs.

- **Scale with Adamite:** You're in control of your Adamite instance, and can customize it to fit your needs, even beyond an initial MVP.

### Contributing

Adamite is open source and welcomes contributions. For more information, read our [Contribution Guide](https://adamite.gitbook.io/docs/organization/contributing-to-adamite).

### License

Adamite is [MIT licensed](LICENSE.md).
