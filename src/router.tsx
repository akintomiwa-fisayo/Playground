import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { createReactRouterRoutes } from 'route-sage';
import routes from './route-sage';

import { AppLayout } from './components/AppLayout';
import HomePage from './routes/page';
import CatalogRoute from './routes/catalog/page';
import AddPetRoute from './routes/add-pet/page';
import OrdersRoute from './routes/orders/page';
import UserProfileRoute from './routes/users/[userId]/profile/page';
import PetDetailRoute from './routes/pets/[petId]/page';

/**
 * ═══════════════════════════════════════════════════════════════
 * Showcase Fact 2 (Data Router): React Router Native Adapter
 * ═══════════════════════════════════════════════════════════════
 * `createReactRouterRoutes` maps your type-safe Route Sage tree directly
 * into standard React Router `RouteObject[]` (with `:param` placeholders,
 * layout routes, and index routes) without writing repetitive path strings!
 */
export const generatedRouteObjects = createReactRouterRoutes(routes, {
  home: <HomePage />,
  catalog: <CatalogRoute />,
  'add-pet': <AddPetRoute />,
  orders: <OrdersRoute />,
  pets: {
    $petId: <PetDetailRoute />,
  },
  users: {
    $userId: {
      profile: <UserProfileRoute />,
    },
  },
});

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: generatedRouteObjects as RouteObject[],
  },
]);
