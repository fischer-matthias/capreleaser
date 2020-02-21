[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/capreleaser.svg)](https://badge.fury.io/js/capreleaser)
# capreleaser

simple capacitor project releasing tool for the [semantic versioning schema](https://semver.org/).

It modifies the following project files:
- `package.json` by changing the `package.version` to the new versionnumber
- `android/app/build.gradle` by incrementing the `versionCode` and changing the `versionName` to the new versionnumber.

## Requirements

- [nodejs and npm](https://nodejs.org/en/)

## Installation

```
npm i -g capreleaser
```

## How to
```
cd /path/to/project
capreleaser <RELEASETYPE>
```

| flag | description |
|---|---|
| `-M` | major release `X.0.0` |
| `-m` | minor release `0.X.0` |
| `-p` | patch release `0.0.X` |

## Todo
- [ ] update ios-version
- [ ] update electron-version
