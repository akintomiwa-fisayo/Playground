import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Dog, ArrowLeft } from 'lucide-react';
import routes from '../../../route-sage';

export default function PetDetailRoute() {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '1.5rem', background: '#18181b', borderRadius: 12, border: '1px solid #27272a', color: '#f4f4f5' }}>
      <button 
        onClick={() => navigate(routes.catalog.url)} 
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '0.9rem' }}
      >
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid #27272a', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Dog size={30} color="#fff" />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>Pet Inspection Details</h2>
          <span style={{ color: '#a1a1aa', fontSize: '0.9rem', fontFamily: 'monospace' }}>Catalog Item ID: #{petId}</span>
        </div>
      </div>

      <div style={{ background: '#09090b', padding: '1.25rem', borderRadius: 8, border: '1px solid #27272a' }}>
        <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 0.5rem' }}>
          <strong>Status:</strong> Ready for adoption
        </p>
        <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
          <strong>Category:</strong> Domestic Companion
        </p>
      </div>
    </div>
  );
}
