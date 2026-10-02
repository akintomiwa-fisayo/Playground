import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { OrderModal } from './OrderModal';
import type { IPet, IOrder } from '../api/petstore/types/shared';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const AppLayout: React.FC = () => {
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

  return (
    <div className="app-container">
      {/* Main Navbar powered by Route Sage */}
      <Navbar ordersCount={orders.length} />

      {/* Page Content from React Router */}
      <main className="main-content">
        <Outlet context={{ onSelectPetForOrder: (pet: IPet) => setSelectedPetForOrder(pet), orders }} />
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
