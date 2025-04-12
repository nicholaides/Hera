import { stripTypeScriptTypes } from "node:module";

export const transformLoadHook = (matchUrl, fn) => async (url, context, next) =>
  next(url, context).then((result) =>
    matchUrl(url)
      ? { ...result, source: fn(result.source, context, result) }
      : result
  );

export const load = transformLoadHook(
  (url) => /\.hera$/.test(url),
  stripTypeScriptTypes
);
