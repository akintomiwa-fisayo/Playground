import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import type { IPet } from '../api/petstore/types/shared';
import { IPostPetDTOSchema } from '../api/petstore/validations';
import { useAddPet } from '../api/petstore/client/hooks';
import { PetCard } from '../components/PetCard';

interface AddPetPageProps {
  onPetAdded: (pet: IPet) => void;
  onNavigateToCatalog: () => void;
}

export const AddPetPage: React.FC<AddPetPageProps> = ({
  onPetAdded,
  onNavigateToCatalog,
}) => {
  const [name, setName] = useState('');
  const [categoryName, setCategoryName] = useState('Dogs');
  const [status, setStatus] = useState<'available' | 'pending' | 'sold'>('available');
  const [photoUrl, setPhotoUrl] = useState('');
  const [tagInput, setTagInput] = useState('friendly, playful');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [successPet, setSuccessPet] = useState<IPet | null>(null);

  const queryClient = useQueryClient();

  // Generated React Query hook from openapi-sync!
  const addPetMutation = useAddPet({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['findPetsByStatus'] });
    },
  });

  // Derive preview pet
  const parsedTags = tagInput
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t, i) => ({ id: i + 1, name: t }));

  const previewPet: IPet = {
    id: Math.floor(Math.random() * 90000) + 10000,
    name: name || 'Preview Pet Name',
    category: { id: 1, name: categoryName },
    photoUrls: [photoUrl],
    tags: parsedTags,
    status,
  };

  const handleValidateAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const newPet: IPet = {
      id: Math.floor(Math.random() * 900000) + 100000,
      name: name.trim(),
      category: { id: Math.floor(Math.random() * 10) + 1, name: categoryName },
      photoUrls: [photoUrl.trim()],
      tags: parsedTags,
      status,
    };

    // Runtime validation using openapi-sync generated Zod schema!
    const result = IPostPetDTOSchema.safeParse(newPet);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path.join('.') || 'general';
        fieldErrors[field] = issue.message;
      });
      setFormErrors(fieldErrors);
      return;
    }

    try {
      // Execute the openapi-sync generated mutation hook!
      await addPetMutation.mutateAsync({
        data: newPet,
      });
      setSuccessPet(newPet);
      onPetAdded(newPet);
    } catch (err: any) {
      console.error('API addPet error:', err);
      setFormErrors({ general: err?.response?.data?.message || err.message || 'Failed to add pet to Petstore API.' });
    }
  };

  return (
    <div>
      <div className="page-hero">
        <h1 className="page-title">Add New Pet</h1>
        <p className="page-subtitle">
          Register a pet 
        </p>
      </div>

      <div className="add-pet-layout">
        {/* Form Card */}
        <div className="card">
         

          {successPet ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <CheckCircle2 size={54} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h2>Pet Registered Successfully!</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                <strong>{successPet.name}</strong> (ID #{successPet.id}) was dispatched via <code>useAddPet()</code>.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setSuccessPet(null);
                    setName('');
                  }}
                >
                  Add Another Pet
                </button>
                <button className="btn btn-primary" onClick={onNavigateToCatalog}>
                  View in Catalog
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleValidateAndSubmit}>
              {formErrors.general && (
                <div className="form-error" style={{ marginBottom: '1rem' }}>
                  <AlertCircle size={16} />
                  <span>{formErrors.general}</span>
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="pet-name-input">
                  Pet Name <span style={{ color: '#fb7185' }}>*</span>
                </label>
                <input
                  id="pet-name-input"
                  type="text"
                  className={`form-input ${formErrors.name ? 'error' : ''}`}
                  placeholder="e.g. Copper, Bella, Zephyr"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {formErrors.name && (
                  <span className="form-error"><AlertCircle size={12} /> {formErrors.name}</span>
                )}
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label" htmlFor="pet-category-select">Category</label>
                  <select
                    id="pet-category-select"
                    className="form-select"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  >
                    <option value="Dogs">Dogs</option>
                    <option value="Cats">Cats</option>
                    <option value="Birds">Birds</option>
                    <option value="Reptiles">Reptiles</option>
                    <option value="Small Pets">Small Pets</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pet-status-select">Status</label>
                  <select
                    id="pet-status-select"
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                  >
                    <option value="available">available</option>
                    <option value="pending">pending</option>
                    <option value="sold">sold</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pet-photo-input">
                  Photo URL <span style={{ color: '#fb7185' }}>*</span>
                </label>
                <input
                  id="pet-photo-input"
                  type="url"
                  className={`form-input ${formErrors.photoUrls ? 'error' : ''}`}
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  required
                />
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Presets:</span>
                  {['Husky', 'Cat', 'Bulldog', 'Golden', 'Puppy'].map((label, idx) => (
                    <button
                      type="button"
                      key={label}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.15rem 0.45rem', fontSize: '0.7rem' }}
                     
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pet-tags-input">Tags (comma separated)</label>
                <input
                  id="pet-tags-input"
                  type="text"
                  className="form-input"
                  placeholder="e.g. vaccinated, friendly, puppy"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                />
                <span className="form-help">Converted to <code>ITag[]</code> format for OpenAPI spec.</span>
              </div>

              <button
                type="submit"
                id="submit-add-pet-btn"
                className="btn btn-primary"
                disabled={addPetMutation.isPending}
                style={{ width: '100%', marginTop: '1rem' }}
              >
                <PlusCircle size={18} />
                <span>{addPetMutation.isPending ? 'Executing useAddPet() Hook...' : 'Register Pet in Store'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Live Card Preview */}
        <div>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            Live Card Preview
          </h3>
          <PetCard pet={previewPet} isPreview />
        </div>
      </div>
    </div>
  );
};
