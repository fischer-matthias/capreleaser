[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/capreleaser.svg)](https://badge.fury.io/js/capreleaser)
# capreleaser

simple capacitor project releasing tool for the [semantic versioning schema](https://semver.org/).

It modifies the following project files:
- `package.json`
- `android/app/build.gradle`

## requirements

- [nodejs and npm](https://nodejs.org/en/)

## installation

```
npm i -g capreleaser
```

## how to
```
cd /path/to/project
capreleaser <RELEASETYPE>
```

| flag | description |
|---|---|
| `-M` | major release `X.0.0` |
| `-m` | minor release `0.X.0` |
| `-p` | patch release `0.0.X` |

## todo
- [X] update `package.json`
- [X] update `android/app/build.gradle`
- [ ] update ios-version
- [ ] update electron-version
