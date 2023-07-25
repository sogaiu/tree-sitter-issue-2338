#! /bin/sh

echo "reproduces with nodejs 19 or 20"
node --version

start_dir=$(pwd)

npm --verbose install

ts_path=$(pwd)/node_modules/.bin/tree-sitter

cd emsdk && \
  ./emsdk install 3.1.37 && \
  ./emsdk activate 3.1.37 || \
  exit 1

cd "${start_dir}" || exit 1

# don't need to source emsdk_env.sh, do this instead:
PATH="$(pwd)/emsdk/upstream/emscripten:$PATH"
export PATH

ts_dir=node_modules/tree-sitter-typescript/typescript
ts_wasm_path=${ts_dir}/tree-sitter-typescript.wasm

if [ ! -f ${ts_wasm_path} ]; then
  cd ${ts_dir} && \
    $ts_path build-wasm || \
    exit 1
fi

cd "${start_dir}" || exit 1

tsx_dir=node_modules/tree-sitter-typescript/tsx
tsx_wasm_path=${tsx_dir}/tree-sitter-tsx.wasm

if [ ! -f ${tsx_wasm_path} ]; then
  cd ${tsx_dir} && \
    $ts_path build-wasm || \
    exit 1
fi

cd "${start_dir}" || exit 1

if [ ! -f tree-sitter/lib/binding_web/tree-sitter.wasm ]; then
  cd tree-sitter && \
    bash ./script/build-wasm --debug || \
    exit 1
fi

cd "${start_dir}" || exit 1

if [ ! -d node_modules/web-tree-sitter ]; then
  cd node_modules && \
    ln -s ../tree-sitter/lib/binding_web web-tree-sitter || \
    exit 1
fi

cd "${start_dir}" || exit 1

echo "just tsx is ok"
node just-tsx.js

echo "just typescript is ok"
node just-typescript.js

echo "both is not so ok"
node reproduces-with-node-19-or-20.js

