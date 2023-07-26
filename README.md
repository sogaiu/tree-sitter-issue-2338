# tree-sitter-issue-2338

Reproduction steps for
[tree-sitter/tree-sitter#2338](https://github.com/tree-sitter/tree-sitter/issues/2338).

## Prerequisites

* git
* nodejs 19 (or 20) with appropriate npm
* typical dev Linux machine

## Instructions

Ensure Nodejs 19 (or 20) is active in the current environment, e.g.

```
node --version
```

should produce something like `v19.9.0`.

After cloning the repository to `/tmp` (and switching to the
`repro-with-julia-and-python` branch), invoke:

```
sh -x doit.sh
```

Note that the script does a variety of things including `npm --verbose
install`, which for some reason is rather slow.  It may take multiple
minutes so being patient might help.

At the end of the output, should see something like:

```
Aborted(Assertion failed: undefined symbol `tree_sitter_julia_external_scanner_create`. perhaps a side module was not linked in? if this global was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment)
/tmp/tree-sitter-issue-2338/tree-sitter/lib/binding_web/tree-sitter.js:480
     var e = new WebAssembly.RuntimeError(what);
             ^

RuntimeError: Aborted(Assertion failed: undefined symbol `tree_sitter_julia_external_scanner_create`. perhaps a side module was not linked in? if this global was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment)
    at abort (/tmp/tree-sitter-issue-2338/tree-sitter/lib/binding_web/tree-sitter.js:480:14)
    at assert (/tmp/tree-sitter-issue-2338/tree-sitter/lib/binding_web/tree-sitter.js:286:7)
    at reportUndefinedSymbols (/tmp/tree-sitter-issue-2338/tree-sitter/lib/binding_web/tree-sitter.js:1485:8)
    at postInstantiation (/tmp/tree-sitter-issue-2338/tree-sitter/lib/binding_web/tree-sitter.js:1302:9)
    at /tmp/tree-sitter-issue-2338/tree-sitter/lib/binding_web/tree-sitter.js:1350:68
    at async python_grammar (/tmp/tree-sitter-issue-2338/reproduces-with-node-19-or-20.js:31:16)

Node.js v19.9.0
```

Note that, editing `node_modules/web-tree-sitter/tree-sitter.js` so
that:

```javascript
 .then(bytes => loadModule(bytes, {loadAsync: true}))
```

is replaced by either:

```javascript
 .then(bytes => loadModule(bytes, {}))
```

or:

```javascript
 .then(bytes => loadModule(bytes, {loadAsync: true, allowUndefined: true}))
```

and rerunning `sh -x doit.sh` leads to no error.

