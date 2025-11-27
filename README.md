# eo2js

<!-- markdownlint-disable MD013 -->
[![EO principles respected here](https://www.elegantobjects.org/badge.svg)](https://www.elegantobjects.org)
[![We recommend IntelliJ IDEA](https://www.elegantobjects.org/intellij-idea.svg)](https://www.jetbrains.com/idea/)
[![CI](https://github.com/objectionary/eo2js/actions/workflows/test.yml/badge.svg)](https://github.com/objectionary/eo2js/actions/workflows/test.yml)
[![Hits-of-Code](https://hitsofcode.com/github/objectionary/eo2js)](https://hitsofcode.com/view/github/objectionary/eo2js)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.txt)
<!-- markdownlint-enable MD013 -->

Command-line toolkit and runtime that takes **EO XMIR + `eo-foreign.json`**
(usually in `.eoc/`) and turns them into a **Node.js project** you can run or
test. It does **not** read `.eo` directly — you must generate XMIR first.

## EO version

Built and tested with EO version `0.49.0`
([eo2js/test/mvnw/eo-version.txt](https://github.com/objectionary/eo2js/blob/master/eo2js/test/mvnw/eo-version.txt)).
Using other versions may lead to unpredictable results.

## Prerequisites

- Node.js 20+ and npm
- Java + Maven (if you generate XMIR via `eo-maven-plugin`; other EO toolchains
  like `eoc` are fine too)

## Install (CLI users)

```bash
npm install -g eo2js
```

## Getting `.eoc` (XMIR + foreign)

Use any EO toolchain to compile `.eo` into `.eoc`.
Example with EO Maven plugin:

```bash
mvn org.eolang:eo-maven-plugin:register \
    org.eolang:eo-maven-plugin:parse \
    org.eolang:eo-maven-plugin:optimize \
    org.eolang:eo-maven-plugin:shake \
    org.eolang:eo-maven-plugin:lint \
    -Deo.sourcesDir=src \
    -Deo.targetDir=.eoc \
    -Deo.failOnWarning=false
```

After that, `.eoc/eo-foreign.json` and XMIR files are ready for eo2js.

## Core commands

- `transpile` — convert XMIR from `eo-foreign.json` to JS under `<target>/<project>`
- `link` — build npm project (`package.json`, deps, `__main__.js`)
- `dataize <object> [args...]` — transpile+link (unless `--alone`) and run the
  EO object
- `test` — transpile+link (unless `--alone`) and run EO tests generated from
  XMIR with `+tests`

Common options: `-t/--target` `.eoc` dir (default `.eoc`), `-p/--project`
JS subdir (default `project`), `-f/--foreign` path to `eo-foreign.json`
(default `eo-foreign.json` in target), `-r/--resources` path to eo2js resources
(only needed when running from a clone), `-d/--dependency` path to local
`eo2js-runtime`, `--alone` to skip automatic prerequisites.

## Typical workflow (global install)

```bash
# After generating .eoc:
eo2js dataize org.eo2js.demo.main -t .eoc -p project

# If transpile/link already done:
eo2js dataize org.eo2js.demo.main --alone -t .eoc -p project
```

If you use the defaults (`.eoc` and `project`), you can omit `-t`/`-p`.

## Minimal EO example

Create `hello/main.eo` (any folder name is fine):

```eo
+package hello
+home https://example.com
+version 0.1.0

[] > main
  "Hello from eo2js!" > @
```

Compile to `.eoc` from the folder where `hello/` lives:

```bash
mvn org.eolang:eo-maven-plugin:register \
    org.eolang:eo-maven-plugin:parse \
    org.eolang:eo-maven-plugin:optimize \
    org.eolang:eo-maven-plugin:shake \
    org.eolang:eo-maven-plugin:lint \
    -Deo.sourcesDir=hello \
    -Deo.targetDir=.eoc \
    -Deo.failOnWarning=false
```

Then run via eo2js:

```bash
eo2js dataize hello.main -t .eoc -p project
```

## From this repo without global install

```bash
NODE_PATH=eo2js/node_modules \
node eo2js/src/eo2js.js dataize org.eo2js.demo.main \
  -t readme-demo/.eoc -p project \
  -r eo2js/src/resources \
  -d eo2js-runtime
```

(`-r`/`-d` point to local resources/runtime; omit if installed globally.)

## How to Contribute

First, run `npm install`. Then, run `npm test`. All tests should pass.

Make your changes and then
[make](https://www.yegor256.com/2014/04/15/github-guidelines.html)
a pull request.
