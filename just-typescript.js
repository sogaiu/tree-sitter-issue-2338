const Parser = require("web-tree-sitter");
const path = require("path");

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

