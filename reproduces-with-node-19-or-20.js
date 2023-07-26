const Parser = require("web-tree-sitter");
const path = require("path");

////////////////////////////////////////////////////////////////////////

const initParser = Parser.init();

////////////////////////////////////////////////////////////////////////

const julia_g =
    (async function julia_grammar() {
        await initParser;

        const julia_wasm_path =
            path.join(process.cwd(),
                      "node_modules/tree-sitter-julia",
                      "tree-sitter-julia.wasm");

        return await Parser.Language.load(julia_wasm_path);
    })();

const python_g =
    (async function python_grammar() {
        await initParser;

        const python_wasm_path =
            path.join(process.cwd(),
                      "node_modules/tree-sitter-python",
                      "tree-sitter-python.wasm");

        return await Parser.Language.load(python_wasm_path);
    })();

