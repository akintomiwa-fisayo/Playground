import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dog, PlusCircle, ShoppingBag, User } from 'lucide-react';
import routes from '../route-sage';

interface NavbarProps {
  ordersCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  ordersCount = 0,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrent = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-top-row">
          <div 
            className="brand-group" 
            id="nav-brand"
            onClick={() => navigate(routes.home.url)}
            style={{ cursor: 'pointer' }}
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
          {/* Static Route: routes.catalog.url */}
          <button
            id="nav-catalog-btn"
            className={`nav-tab ${isCurrent(routes.catalog.url) ? 'active' : ''}`}
            onClick={() => navigate(routes.catalog.url)}
          >
            <Dog size={16} />
            <span>Pet Catalog</span>
          </button>

          {/* Static Route: routes['add-pet'].url */}
          <button
            id="nav-add-pet-btn"
            className={`nav-tab ${isCurrent(routes['add-pet'].url) ? 'active' : ''}`}
            onClick={() => navigate(routes['add-pet'].url)}
          >
            <PlusCircle size={16} />
            <span>Add Pet</span>
          </button>

          {/* Static Route: routes.orders.url */}
          <button
            id="nav-orders-btn"
            className={`nav-tab ${isCurrent(routes.orders.url) ? 'active' : ''}`}
            onClick={() => navigate(routes.orders.url)}
          >
            <ShoppingBag size={16} />
            <span>Orders</span>
            {ordersCount > 0 && <span className="tab-badge">{ordersCount}</span>}
          </button>

          {/* Dynamic Param Route: routes.users.$userId("usr_42").profile.url */}
          <button
            id="nav-user-profile-btn"
            className={`nav-tab ${isCurrent(routes.users.$userId('usr_42').profile.url) ? 'active' : ''}`}
            onClick={() => navigate(routes.users.$userId('usr_42').profile.url)}
            style={{ borderLeft: '1px solid #27272a', paddingLeft: '0.75rem', marginLeft: '0.25rem' }}
          >
            <User size={16} />
            <span>User Profile</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
