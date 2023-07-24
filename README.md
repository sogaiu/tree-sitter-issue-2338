# tree-sitter-issue-2338

Reproduction steps for
[tree-sitter/tree-sitter#2338](https://github.com/tree-sitter/tree-sitter/issues/2338).

## Prerequisites

* git
* nodejs 19 or 20 with appropriate npm
* typical dev Linux machine

## Instructions

After cloning the repository to `/tmp`, invoke:

```
sh -x doit.sh
```

At the end of the output, should see something like:

```
Error: bad export type for `tree_sitter_typescript_external_scanner_create`: undefined
    at reportUndefinedSymbols (/tmp/tree-sitter-issue-2338/node_modules/web-tree-sitter/tree-sitter.js:1:19748)
    at postInstantiation (/tmp/src/tree-sitter-issue-2338/node_modules/web-tree-sitter/tree-sitter.js:1:17027)
    at /tmp/tree-sitter-issue-2338/node_modules/web-tree-sitter/tree-sitter.js:1:17752
    at async tsx_do (/tmp/tree-sitter-issue-2338/reproduces-with-node-19-or-20.js:14:22)

Node.js v19.9.0
```

