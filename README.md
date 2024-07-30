# Proposal for CI/CD Automated Semantic Release workflow

## Motivation

Large teams working together on a project that requires a consistent release cycle
creates friction if said release cycle is managed by humans. Humans are naturally fallible.

Using a consistent, standard commit message approach, an automated solution can be introduced that
allows for semantic releases to happen without the need for human input (beyond merging the odd pull request).

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
- start using the [Angular Commit Message Conventions.](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format)
