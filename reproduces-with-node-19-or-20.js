const Parser = require("web-tree-sitter");
const path = require("path");

////////////////////////////////////////////////////////////////////////

const tsx_wasm_path = 
      path.join(process.cwd(),
                "node_modules/tree-sitter-typescript/tsx",
                "tree-sitter-tsx.wasm");

async function tsx_do() {
    const p = await Parser.init();

    const tsx_lang = await Parser.Language.load(tsx_wasm_path);

    const tsx_p = new Parser();

    tsx_p.setLanguage(tsx_lang);

    const tsx_text = "<Element<T>>hi</Element>;\n" +
                     "<Element<T> />;\n" +
                     "<>fragment</>;";

    const tsx_tree = tsx_p.parse(tsx_text);

    console.log(tsx_tree.rootNode);
}

tsx_do();

////////////////////////////////////////////////////////////////////////

const ts_wasm_path = 
      path.join(process.cwd(),
                "node_modules/tree-sitter-typescript/typescript",
                "tree-sitter-typescript.wasm");

async function ts_do() {
    const p = await Parser.init();

    const ts_lang = await Parser.Language.load(ts_wasm_path);

    const ts_p = new Parser();

    ts_p.setLanguage(ts_lang);

    const ts_text = "<A>b;\n" +
                    "<C<D>>e.f;";

    const ts_tree = ts_p.parse(ts_text);

    console.log(ts_tree.rootNode);
}

ts_do();

