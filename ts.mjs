import { stripTypeScriptTypes } from 'module';

const extensionsRegex = /\.hera$/;

export async function load(url, context, next) {
  if (!extensionsRegex.test(url)) return next(url, context);

  const { source, ...rest } = await next(url, { ...context, format: 'module' });

  return {
    ...rest,
    source: stripTypeScriptTypes(source),
  }
}
