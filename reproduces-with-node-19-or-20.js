const Parser = require("web-tree-sitter");
const path = require("path");

////////////////////////////////////////////////////////////////////////

const initParser = Parser.init();

////////////////////////////////////////////////////////////////////////

const tsx_g =
    (async function tsx_grammar() {
        await initParser;

        const tsx_wasm_path =
            path.join(process.cwd(),
                      "node_modules/tree-sitter-typescript/tsx",
                      "tree-sitter-tsx.wasm");

        return await Parser.Language.load(tsx_wasm_path);
    })();

const ts_g =
    (async function ts_grammar() {
        await initParser;

        const ts_wasm_path =
            path.join(process.cwd(),
                      "node_modules/tree-sitter-typescript/typescript",
                      "tree-sitter-typescript.wasm");

        return await Parser.Language.load(ts_wasm_path);
    })();

