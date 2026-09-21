import React, { useState } from 'react';
import { ShoppingBag, Package, Calendar, Search, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { IOrder } from '../api/petstore/types/shared';
import { useGetOrderById } from '../api/petstore/client/hooks';

interface OrdersPageProps {
  orders: IOrder[];
  onNavigateToCatalog: () => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({ orders, onNavigateToCatalog }) => {
  const [lookupInput, setLookupInput] = useState('');
  const [searchedOrderId, setSearchedOrderId] = useState<number | null>(null);

  // Generated React Query hook from openapi-sync demonstrating path parameters (/store/order/{orderId})
  const orderQuery = useGetOrderById(
    { url: { orderId: searchedOrderId || 0 } },
    { enabled: searchedOrderId !== null && searchedOrderId > 0, retry: false }
  );

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(lookupInput.trim(), 10);
    if (!isNaN(parsed) && parsed > 0) {
      setSearchedOrderId(parsed);
    }
  };

  return (
    <div>
      <div className="page-hero">
        <h1 className="page-title">Store Orders</h1>
        <p className="page-subtitle">
          Manage and inspect purchase orders powered directly by openapi-sync generated hooks
        </p>
      </div>

      {/* Live Order Lookup Card showcasing useGetOrderById hook */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Live Order Inspection</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Directly querying <code>useGetOrderById(&#123; url: &#123; orderId &#125; &#125;)</code>
            </p>
          </div>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', background: 'var(--primary-glow)', color: 'var(--primary-500)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)' }}>
            Hook: useGetOrderById
          </span>
        </div>

        <form onSubmit={handleLookupSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <input
              type="number"
              min="1"
              placeholder="Enter Order ID (e.g. 1)..."
              value={lookupInput}
              onChange={(e) => setLookupInput(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={!lookupInput.trim() || orderQuery.isFetching}
          >
            {orderQuery.isFetching ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Search size={14} />
            )}
            <span>Lookup via Hook</span>
          </button>
        </form>

        {searchedOrderId !== null && (
          <div style={{ marginTop: '1rem' }}>
            {orderQuery.isFetching ? (
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', padding: '0.75rem 0' }}>
                Fetching order #{searchedOrderId} via generated <code>useGetOrderById</code> hook...
              </div>
            ) : orderQuery.isError ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', background: 'rgba(245, 158, 11, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <AlertCircle size={16} />
                <span>
                  Order #{searchedOrderId} not found or sandbox returned error. You can place an order via the Pet Catalog to generate new IDs.
                </span>
              </div>
            ) : orderQuery.data ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: 'var(--radius-sm)', padding: '0.85rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--success)' }}>
                  <CheckCircle2 size={16} />
                  <strong>Order #{orderQuery.data.id} Retrieved Successfully</strong>
                </div>
                <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                  Pet ID: {orderQuery.data.petId} | Qty: {orderQuery.data.quantity} | Status: {orderQuery.data.status} | Complete: {String(orderQuery.data.complete)}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Session Orders List */}
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Session Placed Orders ({orders.length})</h2>

      {orders.length === 0 ? (
        <div className="empty-state">
          <ShoppingBag size={48} color="var(--text-muted)" />
          <h3>No Orders Placed Yet in this Session</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Select any pet in the catalog to initiate an order validated with generated Zod schema and submitted with <code>usePlaceOrder</code>.
          </p>
          <button className="btn btn-primary" onClick={onNavigateToCatalog}>
            Browse Catalog
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map((order, idx) => (
            <div key={`${order.id}-${idx}`} className="card card-interactive order-card-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
                <div className="stat-icon-wrapper stat-icon-available">
                  <Package size={22} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <h3 style={{ fontSize: '1.1rem' }}>Order #{order.id}</h3>
                    <span className={`pet-badge-status status-${order.status || 'placed'}`}>
                      {order.status || 'placed'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.35rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span>Pet ID: <strong>#{order.petId}</strong></span>
                    <span>•</span>
                    <span>Quantity: <strong>{order.quantity}</strong></span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={13} />
                      {order.shipDate ? new Date(order.shipDate).toLocaleDateString() : 'Immediate'}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setLookupInput(String(order.id));
                    setSearchedOrderId(order.id || null);
                  }}
                  title="Query this order with useGetOrderById hook"
                >
                  Inspect with Hook
                </button>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Validated via IPostStoreOrderDTOSchema
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
