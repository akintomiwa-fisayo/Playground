import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { CatalogPage } from '../pages/CatalogPage';
import type { IPet } from '../api/petstore/types/shared';

export default function HomePage() {
  const context = useOutletContext<{ onSelectPetForOrder?: (pet: IPet) => void }>();
  return <CatalogPage onSelectPetForOrder={context?.onSelectPetForOrder || (() => {})} />;
}
