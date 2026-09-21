import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import type { IPet, IOrder } from '../api/petstore/types/shared';
import { usePlaceOrder } from '../api/petstore/client/hooks';
import { IPostStoreOrderDTOSchema } from '../api/petstore/validations';

interface OrderModalProps {
  pet: IPet | null;
  onClose: () => void;
  onOrderPlaced: (order: IOrder) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  pet,
  onClose,
  onOrderPlaced,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<'placed' | 'approved' | 'delivered'>('placed');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successOrder, setSuccessOrder] = useState<IOrder | null>(null);

  const queryClient = useQueryClient();

  // Generated React Query hook from openapi-sync!
  const placeOrderMutation = usePlaceOrder({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['findPetsByStatus'] });
    },
  });

  if (!pet) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const orderData: IOrder = {
      id: Math.floor(Math.random() * 100000) + 1,
      petId: pet.id || 1,
      quantity,
      shipDate: new Date().toISOString(),
      status,
      complete: true,
    };

    // Pre-validate with openapi-sync Zod schema
    const check = IPostStoreOrderDTOSchema.safeParse(orderData);
    if (!check.success) {
      setErrorMsg(check.error.issues.map(i => i.message).join(', '));
      return;
    }

    try {
      // Execute the openapi-sync generated mutation hook!
      await placeOrderMutation.mutateAsync({
        data: orderData,
      });
      setSuccessOrder(orderData);
      onOrderPlaced(orderData);
    } catch (err: any) {
      console.error('API placeOrder error:', err);
      setErrorMsg(
        err?.response?.data?.message || 
        err.message || 
        'Remote /store/order endpoint returned an error (Swagger sandbox 500).'
      );
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShoppingBag className="stat-icon-available" size={24} style={{ padding: '4px', borderRadius: '8px' }} />
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>Adopt / Order Pet</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {/* Hook: <code>usePlaceOrder()</code> (POST /store/order) */}
              </p>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose} id="modal-close-btn">
            <X size={18} />
          </button>
        </div>

        {successOrder ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <CheckCircle2 size={48} color="#10b981" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Order Placed Successfully!</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Your order for <strong>{pet.name}</strong> was submitted via <code>usePlaceOrder()</code> and validated with Zod.
            </p>
            <div className="code-box" style={{ textAlign: 'left', marginBottom: '1.5rem', maxHeight: '180px' }}>
              {JSON.stringify(successOrder, null, 2)}
            </div>
            <button className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
              <img 
                src={pet.photoUrls[0]} 
                alt={pet.name} 
                style={{ width: 56, height: 56, borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontSize: '1rem' }}>{pet.name}</h4>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>ID: #{pet.id}</span>
                  <span>•</span>
                  <span style={{ color: '#a5b4fc' }}>{pet.category?.name || 'General'}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="order-quantity">Quantity</label>
              <input
                id="order-quantity"
                type="number"
                min={1}
                max={10}
                className="form-input"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="order-status">Order Status</label>
              <select
                id="order-status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <option value="placed">placed</option>
                <option value="approved">approved</option>
                <option value="delivered">delivered</option>
              </select>
            </div>

          

            {errorMsg && (
              <div className="form-error" style={{ marginBottom: '1rem' }}>
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                id="submit-order-btn"
                disabled={placeOrderMutation.isPending}
                style={{ flex: 2 }}
              >
                {placeOrderMutation.isPending ? 'Executing usePlaceOrder()...' : 'Confirm Order'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
