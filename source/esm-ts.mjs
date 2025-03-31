// A version of esm.mjs that also transpiles hera output from TS->JS

import { fileURLToPath, pathToFileURL } from 'url';

import fs from "fs";
import { compile } from "@danielx/hera";

const baseURL = pathToFileURL(process.cwd() + '/').href;
const extensionsRegex = /\.hera$/;

export async function resolve(specifier, context, defaultResolve) {
  const { parentURL = baseURL } = context;

  if (extensionsRegex.test(specifier)) {
    return {
      shortCircuit: true,
      url: new URL(specifier, parentURL).href
    };
  }

  // Let Node.js handle all other specifiers.
  return defaultResolve(specifier, context, defaultResolve);
}

import { compileTsToJs } from "./ts-to-js.mjs";

export async function load(url, context, next) {
  if (extensionsRegex.test(url)) {
    const filename = fileURLToPath(url);

    const heraSource = fs.readFileSync(filename, 'utf8')
    const tsSource = compile(heraSource, {
      filename,
      inlineMap: true,
      module: true,
    });

    const source = compileTsToJs(tsSource, { module: true });

    // TODO: how to avoid shortCircuit?
    // We may want to pass the module to babel or whatever in the future
    return {
      format: "module",
      source,
      shortCircuit: true,
    };
  }

  // Let Node.js handle all other URLs.
  return next(url, context);
}
