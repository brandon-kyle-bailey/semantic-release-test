# Proposal for CI/CD Automated Semantic Release workflow

[![semantic-release: conventional](https://img.shields.io/badge/semantic--release-conventional-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Prerelease](https://github.com/brandon-kyle-bailey/semantic-release-test/actions/workflows/prerelease.yml/badge.svg)](https://github.com/brandon-kyle-bailey/semantic-release-test/actions/workflows/prerelease.yml)
![GitHub Release](https://img.shields.io/github/v/release/brandon-kyle-bailey/semantic-release-test)

## Motivation

Large teams working together on a project that requires a consistent release cycle
creates friction if said release cycle is managed by humans. Humans are naturally fallible.

Using a consistent, standard commit message approach, an automated solution can be introduced that
allows for semantic releases to happen without the need for human input (beyond merging the odd pull request).

## Solution

Integrate one or more tools to enable automated semantic version releases as part of our CI/CD pipeline.

## Proposed Tools

- [semantic-release](https://semantic-release.gitbook.io/semantic-release)
- [husky](https://typicode.github.io/husky/)
- [commitlint](https://commitlint.js.org/guides/getting-started.html)

## Getting started

To integrate this solution with an existing project, here's what you'll need:

- Setup an [npm access token](https://docs.npmjs.com/about-access-tokens/) added as a [secret](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) in your repository so the Github action can publish to NPM.
- Add the following packages to your repository:

```
npm install --save-dev semantic-release husky @commitlint/{cli,config-conventional}

or

yarn add --dev semantic-release husky @commitlint/{cli,config-conventional}
```

- Create or add a `.npmrc` file with the following command:

```

echo "access=public" >> .npmrc

```

- Initialize husky and create a pre-commit hook:

```
npx husky init
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

- Setup default configuration for semantic-release:

```
echo "export default { extends: ["@commitlint/config-conventional"] };" > commitlint.config.ts
```

- Create a Github workflow file to handle releases on merge to main:

```
echo "
name: Release
on:
  push:
    branches:
      - main # or master

permissions:
  contents: read # for checkout

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    permissions:
      contents: write # to be able to publish a GitHub release
      issues: write # to be able to comment on released issues
      pull-requests: write # to be able to comment on released pull requests
      id-token: write # to enable use of OIDC for npm provenance
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "lts/*"
      - name: Install dependencies
        run: npm clean-install
      - name: Verify the integrity of provenance attestations and registry signatures for installed dependencies
        run: npm audit signatures
      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
" > .github/workflows/release.yml
```

- Start using the [Conventional Commit Message Convention](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)

## How it works

When a pull request is merged into main, the Github workflow Release action is triggered which invokes semantic-release.
This traverses the commit history and compiles a release based on the commit convention.

### What will trigger a release

The following commit message patterns will trigger a release of their given scope:

- Patch release (X.X.1)

```
fix(pencil): stop graphite breaking when too much pressure applied

```

- Minor release (X.1.0)

```
feat(pencil): stop graphite breaking when too much pressure applied

```
