// @flow
import Syntax from "../Syntax";
import statement from "./statement";
import expression from "./expression";
import type Context from "./context";
import type { NodeType } from "../flow/types";

const condition = (ctx: Context): NodeType => {
  ctx.expect(["("]);
  const expr = expression(ctx, "i32");
  ctx.expect([")"]);
  return expr;
};

export default function parseIfStatement(ctx: Context): NodeType {
  const node: NodeType = {
    ...ctx.startNode(ctx.token),
    then: [],
    else: []
  };

  ctx.eat(["if"]);
  // First operand is the expression
  const params = [
    // condition
    condition(ctx),
    statement(ctx)
  ];

  ctx.eat([";"]);
  while (ctx.eat(["else"])) {
    // maybe another if statement
    params.push(ctx.makeNode({ params: [statement(ctx)] }, Syntax.Else));
  }

  return ctx.endNode(
    {
      ...node,
      params
    },
    Syntax.IfThenElse
  );
}
