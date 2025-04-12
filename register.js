try {
  const { register } = require("node:module");
  const { pathToFileURL } = require("node:url");

  register("./dist/esm.mjs", pathToFileURL(__filename));
} catch (e) {
  // older Node lacking module register
}

if (require.extensions) {
  try {
    require("@cspotcode/source-map-support/register-hook-require");
  } catch (e) {}

  function requireExtensionsChain() {
    const middlewares = [];

    function handleExtension(module, filename) {
      const { source: js } = runMiddlewares(middlewares, {
        filename,
        source: undefined,
      });
      return module._compile(js, filename);
    }

    handleExtension.middlewares = middlewares;

    handleExtension.pushTransformSource = (fn) => {
      middlewares.push((context, next) => {
        const result = next(context);
        return { ...result, source: fn(result.source, result) };
      });
    };

    return handleExtension;
  }

  function runMiddlewares(stack, args) {
    stack = [...stack];
    const current = stack.pop();

    if (!current) throw new Error(`Failed to load ${JSON.stringify(args)}`);

    return current(args, (nextArgs) => runMiddlewares(stack, nextArgs));
  }

  const heraCjsStack = requireExtensionsChain();

  const fs = require("fs");
  heraCjsStack.middlewares.push((context, _next) => ({
    ...context,
    source: fs.readFileSync(context.filename, "utf8"),
  }));

  const { compile } = require("./");
  heraCjsStack.pushTransformSource((source, { filename }) =>
    compile(source, { filename, inlineMap: true })
  );

  require.extensions[".hera"] = heraCjsStack;
}
