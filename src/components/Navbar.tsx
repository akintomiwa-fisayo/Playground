import React from 'react';
import { Dog, PlusCircle, ShoppingBag } from 'lucide-react';

export type AppPage = 'catalog' | 'add-pet' | 'orders';

interface NavbarProps {
  activePage: AppPage;
  setActivePage: (page: AppPage) => void;
  ordersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  ordersCount,
}) => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-top-row">
          <div 
            className="brand-group" 
            id="nav-brand"
            onClick={() => setActivePage('catalog')}
          >
            <div className="brand-logo">
              <Dog size={24} />
            </div>
            <div>
              <span className="brand-title">PetStore</span>
            </div>
          </div>
        </div>

        <nav className="nav-links">
          <button
            id="nav-catalog-btn"
            className={`nav-tab ${activePage === 'catalog' ? 'active' : ''}`}
            onClick={() => setActivePage('catalog')}
          >
            <Dog size={16} />
            <span>Pet Catalog</span>
          </button>

          <button
            id="nav-add-pet-btn"
            className={`nav-tab ${activePage === 'add-pet' ? 'active' : ''}`}
            onClick={() => setActivePage('add-pet')}
          >
            <PlusCircle size={16} />
            <span>Add Pet</span>
          </button>

          <button
            id="nav-orders-btn"
            className={`nav-tab ${activePage === 'orders' ? 'active' : ''}`}
            onClick={() => setActivePage('orders')}
          >
            <ShoppingBag size={16} />
            <span>Orders</span>
            {ordersCount > 0 && <span className="tab-badge">{ordersCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
};
