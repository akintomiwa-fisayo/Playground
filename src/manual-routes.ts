/**
 * ═══════════════════════════════════════════════════════════════
 * Showcase Fact 1: Code-Based Route Definition with Route Sage
 * ═══════════════════════════════════════════════════════════════
 * In addition to CLI auto-generation from folder structures,
 * Route Sage allows defining routes purely in TypeScript using `createPathConfig`.
 *
 * Every segment automatically receives:
 *  - .url (zero-parenthesis property or callable)
 *  - .filter() (chainable query string builder)
 *  - .href() (pathname + query in one call)
 */
import { createPathConfig } from 'route-sage';

export const { routes: codeBasedRoutes } = createPathConfig({
  home: () => ({ url: '/' }),
  catalog: () => ({ url: '/catalog' }),
  orders: () => ({ url: '/orders' }),
  users: () => ({
    url: '/users',
    $userId: (userId: string) => ({
      url: `/${userId}`,
      profile: () => ({ url: '/profile' }),
      settings: () => ({ url: '/settings' }),
    }),
  }),
});

// Example access:
// codeBasedRoutes.home.url => "/"
// codeBasedRoutes.users.$userId("123").profile.url => "/users/123/profile"
// codeBasedRoutes.catalog.filter({ status: "available" }).url => "/catalog?status=available"
// codeBasedRoutes.orders.href({ limit: 10 }) => "/orders?limit=10"
