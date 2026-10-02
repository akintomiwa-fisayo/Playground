/**
 * Browser-safe Route Sage runtime.
 *
 * Route Sage's CLI remains responsible for generating `src/route-sage.ts`.
 * This small runtime supplies the generated file and app with its client-side
 * helpers, without allowing Vite to bundle Route Sage's Node-only CLI code.
 */
type QueryValue = string | number | boolean | null | undefined | Array<string | number | boolean | null | undefined>;
type Query = Record<string, QueryValue> | string;

const routeMetadata = new Set(['url', 'file', 'isGroup', 'isRoute', 'filter', 'href']);

function withQuery(pathname: string, query?: Query) {
  if (!query) return pathname;

  const params = new URLSearchParams(
    typeof query === 'string' ? query.replace(/^\?/, '') : undefined,
  );

  if (typeof query !== 'string') {
    for (const [key, value] of Object.entries(query)) {
      if (value == null) continue;
      if (Array.isArray(value)) {
        for (const item of value) if (item != null) params.append(key, String(item));
      } else {
        params.set(key, String(value));
      }
    }
  }

  const search = params.toString();
  return search ? `${pathname}?${search}` : pathname;
}

function addRouteHelpers(route: Record<string, unknown>, url: string) {
  return {
    ...route,
    url,
    filter: (query: Query) => ({ url: withQuery(url, query) }),
    href: (query?: Query) => withQuery(url, query),
  };
}

function wrapSegment(segment: (...args: any[]) => Record<string, unknown>, parentUrl: string): any {
  const wrapped = (...args: any[]) => enrichSegment(segment(...args), parentUrl);

  return new Proxy(wrapped, {
    get(target, property, receiver) {
      if (typeof property === 'symbol' || ['length', 'name', 'prototype', 'call', 'apply', 'bind'].includes(property)) {
        return Reflect.get(target, property, receiver);
      }
      return Reflect.get(target(), property, receiver);
    },
  });
}

function enrichSegment(segment: Record<string, unknown>, parentUrl: string): Record<string, unknown> {
  const url = `${parentUrl}${typeof segment.url === 'string' ? segment.url : ''}`;
  const enriched = addRouteHelpers(segment, url) as Record<string, unknown>;

  for (const [key, value] of Object.entries(segment)) {
    if (!routeMetadata.has(key) && typeof value === 'function') {
      enriched[key] = wrapSegment(value as (...args: any[]) => Record<string, unknown>, url);
    }
  }

  return enriched;
}

export function createPathConfig<T extends Record<string, unknown>>(config: T) {
  const routes: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(config)) {
    routes[key] = typeof value === 'function'
      ? wrapSegment(value as (...args: any[]) => Record<string, unknown>, '')
      : value;
  }

  return { routes, groups: {} };
}

function elementFor(elements: Record<string, unknown>, routeName: string, key: string) {
  return routeName.split('.').reduce<unknown>((value, part) => (
    value && typeof value === 'object' ? (value as Record<string, unknown>)[part] : undefined
  ), elements) ?? elements[key];
}

export function createReactRouterRoutes(routes: Record<string, unknown>, elements: Record<string, unknown>) {
  const build = (tree: Record<string, unknown>, prefix = '', parentName = ''): any[] => Object.entries(tree)
    .filter(([key, value]) => !routeMetadata.has(key) && typeof value === 'function')
    .map(([key, segment]) => {
      const dynamic = key.startsWith('$');
      const parameter = dynamic ? `:${key.slice(1)}` : undefined;
      const resolved = (segment as (...args: string[]) => Record<string, unknown>)(...(parameter ? [parameter] : []));
      const fullPath = String(resolved.url ?? '/');
      const routeName = parentName ? `${parentName}.${key}` : key;
      const children = build(resolved, fullPath, routeName);
      const route: Record<string, unknown> = {
        id: routeName,
        path: fullPath,
      };
      const element = elementFor(elements, routeName, key);
      if (element !== undefined) route.element = element;
      if (children.length) route.children = children;
      return route;
    });

  return build(routes);
}

export function sageRouteTable<T extends { path: () => { url: string } }>(definitions: T[]) {
  return definitions.map((definition) => ({
    ...definition,
    path: definition.path().url.split('?')[0],
  }));
}
