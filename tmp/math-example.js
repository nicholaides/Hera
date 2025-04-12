"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/machine.js
var require_machine = __commonJS({
  "dist/machine.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var machine_exports = {};
    __export2(machine_exports, {
      $C: () => $C,
      $E: () => $E,
      $EVENT: () => $EVENT,
      $EVENT_C: () => $EVENT_C,
      $EXPECT: () => $EXPECT,
      $L: () => $L,
      $N: () => $N,
      $P: () => $P,
      $Q: () => $Q,
      $R: () => $R,
      $R$0: () => $R$0,
      $S: () => $S,
      $T: () => $T,
      $TEXT: () => $TEXT,
      $TR: () => $TR,
      $TS: () => $TS,
      $TV: () => $TV,
      $Y: () => $Y,
      ParseError: () => ParseError,
      Validator: () => Validator
    });
    module2.exports = __toCommonJS2(machine_exports);
    function $EXPECT(parser, expectation) {
      return function(ctx, state) {
        const result = parser(ctx, state);
        if (!result)
          ctx.fail(state.pos, expectation);
        return result;
      };
    }
    function $L(str) {
      return function(_ctx, state) {
        const { input, pos } = state, { length } = str, end = pos + length;
        if (input.substring(pos, end) === str) {
          return {
            loc: {
              pos,
              length
            },
            pos: end,
            value: str
          };
        }
        return;
      };
    }
    function $R(regExp) {
      return function(_ctx, state) {
        const { input, pos } = state;
        regExp.lastIndex = state.pos;
        let l, m, v;
        if (m = input.match(regExp)) {
          v = m[0];
          l = v.length;
          return {
            loc: {
              pos,
              length: l
            },
            pos: pos + l,
            value: m
          };
        }
        return;
      };
    }
    function $C(...terms) {
      return (ctx, state) => {
        let i = 0;
        const l = terms.length;
        while (i < l) {
          const r = terms[i++](ctx, state);
          if (r)
            return r;
        }
        return;
      };
    }
    function $S(...terms) {
      return (ctx, state) => {
        let { input, pos } = state, i = 0, value;
        const results = [], s = pos, l = terms.length;
        while (i < l) {
          const r = terms[i++](ctx, { input, pos });
          if (r) {
            ({ pos, value } = r);
            results.push(value);
          } else
            return;
        }
        return {
          loc: {
            pos: s,
            length: pos - s
          },
          pos,
          value: results
        };
      };
    }
    function $E(fn) {
      return (ctx, state) => {
        const r = fn(ctx, state);
        if (r)
          return r;
        const { pos } = state;
        return {
          loc: {
            pos,
            length: 0
          },
          pos,
          value: void 0
        };
      };
    }
    function $Q(fn) {
      return (ctx, state) => {
        let { input, pos } = state;
        let value;
        const s = pos;
        const results = [];
        while (true) {
          const prevPos = pos;
          const r = fn(ctx, { input, pos });
          if (!r)
            break;
          ({ pos, value } = r);
          if (pos === prevPos)
            break;
          else
            results.push(value);
        }
        return {
          loc: {
            pos: s,
            length: pos - s
          },
          pos,
          value: results
        };
      };
    }
    function $P(fn) {
      return (ctx, state) => {
        const { input, pos: s } = state;
        let value;
        const first = fn(ctx, state);
        if (!first)
          return;
        let { pos } = first;
        const results = [first.value];
        while (true) {
          const prevPos = pos;
          const r = fn(ctx, { input, pos });
          if (!r)
            break;
          ({ pos, value } = r);
          if (pos === prevPos)
            break;
          results.push(value);
        }
        return {
          loc: {
            pos: s,
            length: pos - s
          },
          value: results,
          pos
        };
      };
    }
    function $TEXT(fn) {
      return (ctx, state) => {
        const newState = fn(ctx, state);
        if (!newState)
          return;
        newState.value = state.input.substring(state.pos, newState.pos);
        return newState;
      };
    }
    function $N(fn) {
      return (ctx, state) => {
        const newState = fn(ctx, state);
        if (newState)
          return;
        return {
          loc: {
            pos: state.pos,
            length: 0
          },
          value: void 0,
          pos: state.pos
        };
      };
    }
    function $Y(fn) {
      return (ctx, state) => {
        const newState = fn(ctx, state);
        if (!newState)
          return;
        return {
          loc: {
            pos: state.pos,
            length: 0
          },
          value: void 0,
          pos: state.pos
        };
      };
    }
    function $T(parser, fn) {
      return function(ctx, state) {
        const result = parser(ctx, state);
        if (!result)
          return;
        if (ctx.tokenize)
          return result;
        const { value } = result;
        const mappedValue = fn(value);
        result.value = mappedValue;
        return result;
      };
    }
    function $TR(parser, fn) {
      return function(ctx, state) {
        const result = parser(ctx, state);
        if (!result)
          return;
        if (ctx.tokenize)
          return result;
        const { loc, value } = result;
        const mappedValue = fn(SKIP, loc, ...value);
        if (mappedValue === SKIP) {
          return;
        }
        result.value = mappedValue;
        return result;
      };
    }
    function $TS(parser, fn) {
      return function(ctx, state) {
        const result = parser(ctx, state);
        if (!result)
          return;
        if (ctx.tokenize)
          return result;
        const { loc, value } = result;
        const mappedValue = fn(SKIP, loc, value, ...value);
        if (mappedValue === SKIP) {
          return;
        }
        result.value = mappedValue;
        return result;
      };
    }
    function $TV(parser, fn) {
      return function(ctx, state) {
        const result = parser(ctx, state);
        if (!result)
          return;
        if (ctx.tokenize)
          return result;
        const { loc, value } = result;
        const mappedValue = fn(SKIP, loc, value, value);
        if (mappedValue === SKIP) {
          return;
        }
        result.value = mappedValue;
        return result;
      };
    }
    function $R$0(parser) {
      return function(ctx, state) {
        const result = parser(ctx, state);
        if (!result)
          return;
        const value = result.value[0];
        result.value = value;
        return result;
      };
    }
    function $EVENT(ctx, state, name, fn) {
      let eventData, enter, exit;
      if (enter = ctx.enter) {
        const result2 = enter(name, state);
        if (result2) {
          if ("cache" in result2)
            return result2.cache;
          eventData = result2.data;
        }
      }
      let result = fn(ctx, state);
      if (result && ctx.tokenize) {
        result = $TOKEN(name, state, result);
      }
      if (exit = ctx.exit)
        exit(name, state, result, eventData);
      return result;
    }
    function $EVENT_C(ctx, state, name, fns) {
      let eventData, enter, exit;
      if (enter = ctx.enter) {
        const result2 = enter(name, state);
        if (result2) {
          if ("cache" in result2)
            return result2.cache;
          eventData = result2.data;
        }
      }
      let result, i = 0, l = fns.length;
      while (!result && i < l) {
        if (result = fns[i](ctx, state))
          break;
        i++;
      }
      if (result && ctx.tokenize) {
        result = $TOKEN(name, state, result);
      }
      if (exit = ctx.exit)
        exit(name, state, result, eventData);
      return result;
    }
    function $TOKEN(name, state, newState) {
      if (!newState)
        return;
      newState.value = {
        type: name,
        children: [newState.value].flat(),
        token: state.input.substring(state.pos, newState.pos),
        loc: newState.loc
      };
      return newState;
    }
    var SKIP = {};
    function Validator() {
      const failHintRegex = /\S+|\s+|$/y;
      const failExpected = Array(16);
      let failIndex = 0;
      let maxFailPos = 0;
      function fail(pos, expected) {
        if (pos < maxFailPos)
          return;
        if (pos > maxFailPos) {
          maxFailPos = pos;
          failExpected.length = failIndex = 0;
        }
        failExpected[failIndex++] = expected;
        return;
      }
      function location(input, pos) {
        const [line, column] = input.split(/\n|\r\n|\r/).reduce(([row, col], line2) => {
          const l = line2.length + 1;
          if (pos >= l) {
            pos -= l;
            return [row + 1, 1];
          } else if (pos >= 0) {
            col += pos;
            pos = -1;
            return [row, col];
          } else {
            return [row, col];
          }
        }, [1, 1]);
        return [line, column];
      }
      function validate(input, result, { filename }) {
        if (result && result.pos === input.length)
          return result.value;
        const expectations = Array.from(new Set(failExpected.slice(0, failIndex)));
        let l = location(input, maxFailPos), [line, column] = l;
        if (result && result.pos > maxFailPos) {
          l = location(input, result.pos);
          throw new Error(`${filename}:${line}:${column} Unconsumed input at #{l}

${input.slice(result.pos)}
`);
        }
        if (expectations.length) {
          failHintRegex.lastIndex = maxFailPos;
          let [hint] = input.match(failHintRegex);
          if (hint.length)
            hint = JSON.stringify(hint);
          else
            hint = "EOF";
          const error = new ParseError("Failed to parse", `Expected:
	${expectations.join("\n	")}
Found: ${hint}
`, filename, line, column, maxFailPos);
          throw error;
        }
        if (result) {
          throw new Error(`
Unconsumed input at ${l}

${input.slice(result.pos)}
`);
        }
        throw new Error("No result");
      }
      function reset() {
        failIndex = 0;
        maxFailPos = 0;
        failExpected.length = 0;
      }
      return {
        fail,
        validate,
        reset
      };
    }
    var ParseError = class extends Error {
      constructor(header, body, filename, line, column, offset) {
        let message = `${filename}:${line}:${column} ${header}`;
        if (body)
          message += `
${body}`;
        super(message);
        this.header = header;
        this.body = body;
        this.filename = filename;
        this.line = line;
        this.column = column;
        this.offset = offset;
        this.name = "ParseError";
        this.message = message;
      }
    };
  }
});

// samples/math.hera
var require_math = __commonJS({
  "samples/math.hera"(exports) {
    "use strict";
    var {
      $C,
      $E,
      $EVENT,
      $EVENT_C,
      $EXPECT,
      $L,
      $N,
      $P,
      $Q,
      $R,
      $R$0,
      $S,
      $T,
      $TEXT,
      $TR,
      $TS,
      $TV,
      $Y,
      ParseError,
      Parser,
      Validator
    } = require_machine();
    var grammar = {
      Expression,
      Term,
      Factor,
      Integer,
      _
    };
    var $L0 = $L("+");
    var $L1 = $L("-");
    var $L2 = $L("*");
    var $L3 = $L("/");
    var $L4 = $L("(");
    var $L5 = $L(")");
    var $R0 = $R(new RegExp("[0-9]+", "suy"));
    var $R1 = $R(new RegExp("\\s*", "suy"));
    var Expression$0 = $TS($S(Term, $Q($S(_, $C($EXPECT($L0, 'Expression "+"'), $EXPECT($L1, 'Expression "-"')), _, Term))), function($skip, $loc, $0, $1, $2) {
      return $2.reduce(function(result, element) {
        switch (element[1]) {
          case "+":
            return result + element[3];
          case "-":
            return result - element[3];
        }
      }, $1);
    });
    function Expression(ctx, state) {
      return $EVENT(ctx, state, "Expression", Expression$0);
    }
    var Term$0 = $TS($S(Factor, $Q($S(_, $C($EXPECT($L2, 'Term "*"'), $EXPECT($L3, 'Term "/"')), _, Factor))), function($skip, $loc, $0, $1, $2) {
      return $2.reduce(function(result, element) {
        switch (element[1]) {
          case "*":
            return result * element[3];
          case "/":
            return result / element[3];
        }
      }, $1);
    });
    function Term(ctx, state) {
      return $EVENT(ctx, state, "Term", Term$0);
    }
    var Factor$0 = $T($S($EXPECT($L4, 'Factor "("'), _, Expression, _, $EXPECT($L5, 'Factor ")"')), function(value) {
      return value[2];
    });
    var Factor$1 = Integer;
    var Factor$$ = [Factor$0, Factor$1];
    function Factor(ctx, state) {
      return $EVENT_C(ctx, state, "Factor", Factor$$);
    }
    var Integer$0 = $TS($S(_, $EXPECT($R0, "Integer /[0-9]+/")), function($skip, $loc, $0, $1, $2) {
      return Number($2);
    });
    function Integer(ctx, state) {
      return $EVENT(ctx, state, "Integer", Integer$0);
    }
    var _$0 = $R$0($EXPECT($R1, "_ /\\s*/"));
    function _(ctx, state) {
      return $EVENT(ctx, state, "_", _$0);
    }
    var parser = function() {
      const { fail, validate, reset } = Validator();
      let ctx = { expectation: "", fail };
      return {
        parse: (input, options = {}) => {
          if (typeof input !== "string")
            throw new Error("Input must be a string");
          const parser2 = options.startRule != null ? grammar[options.startRule] : Object.values(grammar)[0];
          if (!parser2)
            throw new Error(`Could not find rule with name '${options.startRule}'`);
          const filename = options.filename || "<anonymous>";
          reset();
          Object.assign(ctx, { ...options.events, tokenize: options.tokenize });
          return validate(input, parser2(ctx, {
            input,
            pos: 0
          }), {
            filename
          });
        }
      };
    }();
    exports.default = parser;
    var parse2 = exports.parse = parser.parse;
    exports.Expression = Expression;
    exports.Term = Term;
    exports.Factor = Factor;
    exports.Integer = Integer;
    exports._ = _;
  }
});

// tmp/math-example.ts
var math_example_exports = {};
__export(math_example_exports, {
  parse: () => import_math.parse
});
module.exports = __toCommonJS(math_example_exports);
var import_math = __toESM(require_math());
