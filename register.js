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

  function connectMiddlewares(stack, args) {
    stack = [...stack];
    const current = stack.pop();

    if (!current)
      return (args) => {
        throw new Error(`Failed to load ${JSON.stringify(args)}`);
      };

    const next = connectMiddlewares(stack, args);
    return () => current(args, next);
  }

  let middlewares = [];

  require.extensions[".hera"] = function (module, filename) {
    const { source: js } = connectMiddlewares(middlewares, {
      filename,
      source: undefined,
    })();
    return module._compile(js, filename);
  };

  require.extensions[".hera"].middlewares = middlewares;

  const fs = require("fs");
  require.extensions[".hera"].middlewares.push(({ filename }) => ({
    source: fs.readFileSync(filename, "utf8"),
  }));

  const { compile } = require("./");
  require.extensions[".hera"].middlewares.push(({ filename }, next) => {
    const { source, ...rest } = next();

    return { ...rest, source: compile(source, { filename, inlineMap: true }) };
  });
}
