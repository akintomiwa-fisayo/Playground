import React, { useState, useMemo } from 'react';
import { ShoppingBag } from 'lucide-react';
import type { IPet } from '../api/petstore/types/shared';

export const PET_IMAGES = [
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80', // Beagle
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80', // Cat
  'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80', // Golden retriever
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80', // Ginger cat
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80', // French bulldog
  'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80', // Poodle/puppy
  'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80', // Dogs playing
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80', // Cute dog
];

export interface PetCardProps {
  pet: IPet;
  onSelectForOrder?: (pet: IPet) => void;
  isPreview?: boolean;
}

export const PetCard: React.FC<PetCardProps> = ({
  pet,
  onSelectForOrder,
  isPreview = false,
}) => {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const [fallbackFailed, setFallbackFailed] = useState(false);

  // Deterministically select a fallback photo based on pet ID or name
  const fallbackSrc = useMemo(() => {
    const seed =
      typeof pet.id === 'number' && !isNaN(pet.id)
        ? Math.abs(pet.id)
        : (pet.name || 'pet').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return PET_IMAGES[seed % PET_IMAGES.length];
  }, [pet.id, pet.name]);

  const rawPhotoUrl =
    pet.photoUrls && pet.photoUrls.length > 0 && pet.photoUrls[0]?.trim()
      ? pet.photoUrls[0].trim()
      : null;

  const isPrimaryFailed = rawPhotoUrl ? failedUrl === rawPhotoUrl : true;
  const currentSrc = !isPrimaryFailed && rawPhotoUrl ? rawPhotoUrl : fallbackSrc;

  return (
    <div
      className="pet-card"
      id={pet.id ? `pet-card-${pet.id}` : undefined}
      style={isPreview ? { maxWidth: 360 } : undefined}
    >
      <div className="pet-image-wrapper">
        {!fallbackFailed ? (
          <img
            src={currentSrc}
            alt={pet.name || 'Pet'}
            className="pet-image"
            loading="lazy"
            onError={() => {
              if (!isPrimaryFailed && rawPhotoUrl) {
                // Primary image failed, record failed URL to switch to fallback image
                setFailedUrl(rawPhotoUrl);
              } else {
                // Fallback image also failed, switch to icon placeholder
                setFallbackFailed(true);
              }
            }}
          />
        ) : (
          <div className="pet-image-fallback">🐾</div>
        )}
        <span className={`pet-badge-status status-${pet.status || 'available'}`}>
          {pet.status || 'available'}
        </span>
      </div>

      <div className="pet-content">
        <div className="pet-header">
          <div>
            <h3 className="pet-name">{pet.name || 'Unnamed Pet'}</h3>
            <span className="pet-category">
              🏷️ {pet.category?.name || 'General Companion'}
            </span>
          </div>
          <span className="pet-id">
            {isPreview ? 'Preview' : `#${pet.id ?? '—'}`}
          </span>
        </div>

        {pet.tags && pet.tags.length > 0 && (
          <div className="pet-tags">
            {pet.tags.map((tag, tIdx) => (
              <span key={tIdx} className="pet-tag">
                #{tag.name || 'tag'}
              </span>
            ))}
          </div>
        )}

        <div className="pet-actions">
          {isPreview ? (
            <button className="btn btn-primary btn-sm" disabled style={{ width: '100%' }}>
              <ShoppingBag size={14} />
              <span>Adopt / Order Pet</span>
            </button>
          ) : (
            <button
              id={`order-pet-${pet.id}`}
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
              onClick={() => onSelectForOrder?.(pet)}
              disabled={!onSelectForOrder}
            >
              <ShoppingBag size={14} />
              <span>Adopt / Order Pet</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};