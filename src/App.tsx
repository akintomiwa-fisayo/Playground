import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar, type AppPage } from './components/Navbar';
import { CatalogPage } from './pages/CatalogPage';
import { AddPetPage } from './pages/AddPetPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderModal } from './components/OrderModal';
import type { IPet, IOrder } from './api/petstore/types/shared';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const queryClient = new QueryClient();

export const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState<AppPage>('catalog');
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedPetForOrder, setSelectedPetForOrder] = useState<IPet | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleOrderPlaced = (newOrder: IOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Order #${newOrder.id} placed successfully for pet #${newOrder.petId}!`, 'success');
  };

  const handlePetAdded = (newPet: IPet) => {
    showToast(`Pet "${newPet.name}" added to catalog with ID #${newPet.id}!`, 'success');
  };

  return (
    <div className="app-container">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        ordersCount={orders.length}
      />

      <main className="main-content">
        {activePage === 'catalog' && (
          <CatalogPage
            onSelectPetForOrder={(pet) => setSelectedPetForOrder(pet)}
          />
        )}

        {activePage === 'add-pet' && (
          <AddPetPage
            onPetAdded={handlePetAdded}
            onNavigateToCatalog={() => setActivePage('catalog')}
          />
        )}

        {activePage === 'orders' && (
          <OrdersPage
            orders={orders}
            onNavigateToCatalog={() => setActivePage('catalog')}
          />
        )}
      </main>

      {/* Order Modal */}
      {selectedPetForOrder && (
        <OrderModal
          pet={selectedPetForOrder}
          onClose={() => setSelectedPetForOrder(null)}
          onOrderPlaced={handleOrderPlaced}
        />
      )}

      {/* Floating Notifications */}
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>
            {toast.type === 'success' ? (
              <CheckCircle2 size={20} color="#10b981" />
            ) : (
              <AlertCircle size={20} color="#f43f5e" />
            )}
            <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
