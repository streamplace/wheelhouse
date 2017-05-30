
# Wheelhouse

[![Build Status](https://travis-ci.org/streamplace/wheelhouse.svg?branch=master)](https://travis-ci.org/streamplace/wheelhouse)

Wheelhouse is a development environment optimized for deploying sophisticated full-stack Javascript applications to Kubernetes.

To achieve these goals, it uses:

- [Lerna](https://lernajs.io) for managing npm packages,
- [Docker](https://www.docker.com/) for building containers,
- and [Helm](https://github.com/kubernetes/helm) for release management.

It draws heavy inspiration from the one-command development processes in projects like
[Meteor](https://www.meteor.com/) and
[create-react-app](https://github.com/facebookincubator/create-react-app).

## Installing

You need:

* node 4+
* npm 5+ (`npm install -g npm@next`)
* Docker (tested on Ubuntu 14.04 and macOS 10.11)

```
npm install -g wheelhouse
```

## Commands

### wheelhouse install

Installs all dependencies in all `package.json` files.

### wheelhouse link

Link local `node_modules` dependencies together. Usually you don't need to run this yourself.
`wheelhouse start` does it before it does anything else.

### wheelhouse start (alias run, dev)

Boots up your local development environment.

You can run certain apps on startup with `-a`, e.g. `wheelhouse start -a example-app`

### wheelhouse lint

NYI

### wheelhouse build

Build all of your Javascript modules, Docker containers, and Helm charts.

### wheelhouse deploy

Deploy all your Helm charts to a Kubernetes cluster.

## Development

Clone the repo, and then:

```
npm install
npm run dev
```

This will globally link your local version of Wheelhouse as `wh-dev` so that it doesn't conflict
with any global versions of Wheelhouse.

## Changelog

### 0.2.0

* Run packages on startup with `-a`
* Added `wheelhouse --version`
* Added `wheelhouse link`
* Removed yarn dependency, added npm5 dependency
* Added `--disable-kube` flag
* Tabs with the frontend open now auto-reconnect when the server comes back
* Misc polish, including sorting apps consistently for display

### 0.1

First usable version.

## Credits

Wheelhouse is being jointly developed by
[Streamplace](https://stream.place) and
[C-SATS](https://www.csats.com).

## License

MIT
