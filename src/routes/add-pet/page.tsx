import React from 'react';
import { AddPetPage } from '../../pages/AddPetPage';
import { useNavigate } from 'react-router-dom';
import routes from '../../route-sage';

export default function AddPetRoute() {
  const navigate = useNavigate();
  return (
    <AddPetPage
      onPetAdded={() => {}}
      onNavigateToCatalog={() => navigate(routes.catalog.url)}
    />
  );
}
