# Proposal for CI/CD Automated Semantic Release workflow

[![semantic-release: conventional](https://img.shields.io/badge/semantic--release-conventional-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

## Motivation

Large teams working together on a project that requires a consistent release cycle
creates friction if said release cycle is managed by humans. Humans are naturally fallible.

Using a consistent, standard commit message approach, an automated solution can be introduced that
allows for semantic releases to happen without the need for human input (beyond merging the odd pull request).

## What this repository can do

- automatically creates a production release pull request on merge to dev
- automatically runs unit tests on merge to dev and main
- on merge to main, automatically promotes release based on last commit message

## Tools used:

- [semantic-release](https://semantic-release.gitbook.io/semantic-release)
- [commitlint](https://commitlint.js.org/guides/getting-started.html)
- [husky](https://typicode.github.io/husky/)

## Getting started

To integrate this solution with an existing project, here's what you'll need:

- An [npm access token](https://docs.npmjs.com/about-access-tokens/)
- The following packages installed in your repository:

```
npm install --save-dev husky semantic-release @commitlint/{cli,config-conventional}
```

- copy the following files into the root of your project:

  - .npmrc
  - commitlint.config.ts

- copy the `.github/` directory into the root of your project
- copy the `.husky/` directory into the root of your project
- Start using the [Conventional Commit Message Convention](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)

## How to use this solution

When making commits, use the following approach to trigger the appropriate release type:
<img width="770" alt="image" src="https://github.com/user-attachments/assets/80d60c00-e25f-4aba-9066-1e1217a4c660">

Example:

```
fix: Fixed a rounding issue with an endpoint
```

Will produce a patch version release. I.e. X.X.1
and will automatically populate a release notes doc using the commit message types:
<img width="1251" alt="image" src="https://github.com/user-attachments/assets/dc1b3426-dc1a-4e76-9c5f-2b73edb28129">

Note the items listed under "Bug Fixes" are commits prefixed with the "fix:" label.
The same can be observed with the "Features" list using the "feat:" prefix.

The integration will also add a lovely comment to the closed PR:
<img width="904" alt="image" src="https://github.com/user-attachments/assets/a0568248-933d-4d75-b9d7-2b1eb4dd470d">

im some whitespace
