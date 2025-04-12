try {
  const { register } = require("node:module");
  const { pathToFileURL } = require("node:url");

  register("./dist/esm.mjs", pathToFileURL(__filename));
} catch (e) {
  // older Node lacking module register
}

if (require.extensions) {
  try { require("@cspotcode/source-map-support/register-hook-require") } catch (e) {}

  function connectMiddlewares(stack) {
    stack = [...stack];
    const current = stack.pop();

    if (!current)
      return (args) => {
        throw new Error(`Failed to load ${JSON.stringify(args)}`);
      };

    const next = connectMiddlewares(stack);
    return (args) => current(args, next);
  }


  const middlewares = [];

  require.extensions[".hera"] = function (module, filename) {
    const { source: js } = connectMiddlewares(middlewares)({
      filename,
      source: undefined,
    });
    return module._compile(js, filename);
  };

  const fs = require("fs");
  middlewares.push((context) => {
    return {
      ...context,
      source: fs.readFileSync(context.filename, "utf8"),
    };}
);

  const { compile } = require("./");
  middlewares.push((context, next) => {
    const result = next(context);

    return {
      ...result,
      source: compile(result.source, {
        filename: result.filename,
        inlineMap: true,
      }),
    };
  });

  require.extensions[".hera"].middlewares = middlewares;
}
