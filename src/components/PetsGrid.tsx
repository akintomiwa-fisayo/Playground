import React, { useMemo } from 'react';
import type { IPet } from '../api/petstore/types/shared';
import { PetCard } from './PetCard';

export interface PetsGridProps {
  pets: IPet[];
  currentPage?: number;
  pageSize?: number;
  onSelectPetForOrder?: (pet: IPet) => void;
}

export const PetsGrid: React.FC<PetsGridProps> = ({
  pets,
  currentPage,
  pageSize,
  onSelectPetForOrder,
}) => {
  const paginatedPets = useMemo(() => {
    if (currentPage !== undefined && pageSize !== undefined) {
      const start = (currentPage - 1) * pageSize;
      return pets.slice(start, start + pageSize);
    }
    return pets;
  }, [pets, currentPage, pageSize]);

  return (
    <div className="pets-grid">
      {paginatedPets.map((pet, idx) => (
        <PetCard
          key={`${pet.id}-${idx}`}
          pet={pet}
          onSelectForOrder={onSelectPetForOrder}
        />
      ))}
    </div>
  );
};

export const PetGrid = PetsGrid;
