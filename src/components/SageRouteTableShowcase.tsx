import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { sageRouteTable } from 'route-sage';
import routes from '../route-sage';
import CatalogRoute from '../routes/catalog/page';
import AddPetRoute from '../routes/add-pet/page';
import OrdersRoute from '../routes/orders/page';
import UserProfileRoute from '../routes/users/[userId]/profile/page';
import PetDetailRoute from '../routes/pets/[petId]/page';

/**
 * ═══════════════════════════════════════════════════════════════
 * Showcase Fact 2 (JSX): Direct Adapter for JSX <Routes>
 * ═══════════════════════════════════════════════════════════════
 * When you prefer JSX-based `<Routes>` over `createBrowserRouter`,
 * `sageRouteTable` maps typed route functions directly into pathPattern strings,
 * automatically stripping query strings and converting `$param` to `:param`.
 */
export const pageDefinitions = sageRouteTable([
  { path: () => routes.home, element: <CatalogRoute /> },
  { path: () => routes.catalog, element: <CatalogRoute /> },
  { path: () => routes['add-pet'], element: <AddPetRoute /> },
  { path: () => routes.orders, element: <OrdersRoute /> },
  { path: () => routes.users.$userId(':userId').profile, element: <UserProfileRoute /> },
  { path: () => routes.pets.$petId(':petId'), element: <PetDetailRoute /> },
]);

export const SageRouteTableDemo: React.FC = () => {
  return (
    <Routes>
      {pageDefinitions.map(({ pathPattern, element }) => (
        <Route key={pathPattern} path={pathPattern} element={element} />
      ))}
    </Routes>
  );
};
