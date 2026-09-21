import React, { useState, useEffect } from 'react';
import { Sparkles, Filter, ShoppingBag, Check, AlertCircle, Layers } from 'lucide-react';
import type { IPet } from '../api/petstore/types/shared';
import { useFindPetsByStatus } from '../api/petstore/client/hooks';
import { Pagination } from '../components/Pagination';
import { PetsGrid } from '../components/PetsGrid';

const PAGE_SIZE = 12;

interface CatalogPageProps {
  onSelectPetForOrder: (pet: IPet) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ onSelectPetForOrder }) => {
  const [statusFilter, setStatusFilter] = useState<'available' | 'pending' | 'sold'>('available');
  const [currentPage, setCurrentPage] = useState(1);

  
  const petsQuery = useFindPetsByStatus({
    query: { status: statusFilter },
  });

  const allPets = petsQuery.data || [];
  const isLoading = petsQuery.isLoading 

  // Reset to page 1 whenever status tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  // Compute pagination
  const totalPages = Math.max(1, Math.ceil(allPets.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  return (
    <div>
      {/* Page Header Hero */}
      <div className="page-hero">
        <div className="page-hero-top">
          <div>
            <h1 className="page-title">Petstore Showcase</h1>
            <p className="page-subtitle">
              Browse available pets fetched
            </p>
          </div>
        </div>
      </div>

      {/* Live Stats Row */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className={`stat-icon-wrapper ${
            statusFilter === 'available' ? 'stat-icon-available' :
            statusFilter === 'pending' ? 'stat-icon-pending' : 'stat-icon-sold'
          }`}>
            {statusFilter === 'available' ? <Check size={24} /> :
             statusFilter === 'pending' ? <Sparkles size={24} /> :
             <ShoppingBag size={24} />}
          </div>
          <div className="stat-info">
            <span className="stat-value">{allPets.length.toLocaleString()}</span>
            <span className="stat-label">
              {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Pets (Live API)
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-total">
            <Layers size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalPages}</span>
            <span className="stat-label">Total Pages</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-total">
            <Filter size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{PAGE_SIZE}</span>
            <span className="stat-label">Pets Per Page</span>
          </div>
        </div>
      </div>

      {/* Controls: Status Filter */}
      <div className="controls-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <span>Status Filter:</span>
        </div>

        <div className="filter-tabs">
          <button
            id="filter-available-btn"
            className={`filter-btn ${statusFilter === 'available' ? 'active-available' : ''}`}
            onClick={() => setStatusFilter('available')}
          >
            Available
          </button>
          <button
            id="filter-pending-btn"
            className={`filter-btn ${statusFilter === 'pending' ? 'active-pending' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </button>
          <button
            id="filter-sold-btn"
            className={`filter-btn ${statusFilter === 'sold' ? 'active-sold' : ''}`}
            onClick={() => setStatusFilter('sold')}
          >
            Sold
          </button>
        </div>
      </div>

      {/* Results Summary Bar */}
      {allPets.length > 0 && (
        <div className="catalog-results-bar" id="catalog-controls-anchor">
          <div className="catalog-results-info">
            <span>
              Showing <strong>{((safeCurrentPage - 1) * PAGE_SIZE + 1).toLocaleString()}</strong>–<strong>{Math.min(safeCurrentPage * PAGE_SIZE, allPets.length).toLocaleString()}</strong> of <strong>{allPets.length.toLocaleString()}</strong> pets
            </span>
            <span className="catalog-page-badge">
              Page {safeCurrentPage} of {totalPages}
            </span>
          </div>
        </div>
      )}

      {/* Grid of Pets */}
      {isLoading ? (
        <div className="pets-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="pet-card skeleton" style={{ height: 360 }}></div>
          ))}
        </div>
      ) : allPets.length === 0 ? (
        <div className="empty-state">
          <AlertCircle size={48} color="var(--text-muted)" />
          <h3>No {statusFilter} pets found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            There are currently no pets marked as &quot;{statusFilter}&quot; in the store.
          </p>
          <button className="btn btn-secondary" onClick={() => setStatusFilter('available')}>
            View Available Pets
          </button>
        </div>
      ) : (
        <>
          <PetsGrid
            pets={allPets}
            currentPage={safeCurrentPage}
            pageSize={PAGE_SIZE}
            onSelectPetForOrder={onSelectPetForOrder}
          />

          {/* Bottom Pagination Controls */}
          <Pagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            totalItems={allPets.length}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => {
              setCurrentPage(page);
              document.getElementById('catalog-controls-anchor')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </>
      )}
    </div>
  );
};
