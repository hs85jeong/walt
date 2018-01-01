// @flow
import parser from "./parser";
import emit from "./emitter";
import generator from "./generator";
import withMetadata from "./metadata";
import _debug from "./utils/debug";
// import printNode from "./utils/print-node";
export const debug = _debug;

// Used for deugging purposes
export const getAst = (source: string) => {
  const ast = parser(source);
  return ast;
};

export const getIR = (source: string) => {
  const ast = getAst(source);
  const astWithMetadata = withMetadata(ast);
  // console.log(printNode(astWithMetadata));
  const wasm = emit(generator(astWithMetadata));
  return wasm;
};

// Compiles a raw binary wasm buffer
const compile = (source: string) => {
  const wasm = getIR(source);
  // console.log(_debug(wasm));
  return wasm.buffer();
};

export default compile;