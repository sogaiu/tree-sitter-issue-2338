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

julia_dir=node_modules/tree-sitter-julia
julia_wasm_path=${julia_dir}/tree-sitter-julia.wasm

if [ ! -f ${julia_wasm_path} ]; then
  cd ${julia_dir} && \
    $ts_path build-wasm || \
    exit 1
fi

cd "${start_dir}" || exit 1

python_dir=node_modules/tree-sitter-python
python_wasm_path=${python_dir}/tree-sitter-python.wasm

if [ ! -f ${python_wasm_path} ]; then
  cd ${python_dir} && \
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

echo "both is not so ok"
node reproduces-with-node-19-or-20.js

