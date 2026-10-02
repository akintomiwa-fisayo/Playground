import React from 'react';
import { OrdersPage } from '../../pages/OrdersPage';
import { useNavigate } from 'react-router-dom';
import routes from '../../route-sage';

export default function OrdersRoute() {
  const navigate = useNavigate();
  return (
    <OrdersPage
      orders={[]}
      onNavigateToCatalog={() => navigate(routes.catalog.url)}
    />
  );
}
