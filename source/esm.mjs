import { fileURLToPath, pathToFileURL } from "url";

import fs from "fs";
import { compile } from "@danielx/hera";

const baseURL = pathToFileURL(process.cwd() + "/").href;
const extensionsRegex = /\.hera$/;

export async function resolve(specifier, context, defaultResolve) {
  const { parentURL = baseURL } = context;

  if (extensionsRegex.test(specifier)) {
    return {
      shortCircuit: true,
      url: new URL(specifier, parentURL).href,
    };
  }

  // Let Node.js handle all other specifiers.
  return defaultResolve(specifier, context, defaultResolve);
}

export function load(
  url,
  context,
  next,
  { postProcess = (source) => source } = {}
) {
  if (extensionsRegex.test(url)) {
    const filename = fileURLToPath(url);
    const source = compile(fs.readFileSync(filename, "utf8"), {
      filename,
      inlineMap: true,
      module: true,
    });

    const processedSource = postProcess(source, { url, context });

    // TODO: how to avoid shortCircuit?
    // We may want to pass the module to babel or whatever in the future
    return {
      format: "module",
      source: processedSource,
      shortCircuit: true,
    };
  }

  // Let Node.js handle all other URLs.
  return next(url, context);
}

export function buildLoadFunction(heraLoaderOptions) {
  return (url, context, next) => load(url, context, next, heraLoaderOptions);
}
