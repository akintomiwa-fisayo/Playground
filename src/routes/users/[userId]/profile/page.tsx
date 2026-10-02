import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { User, ShieldCheck, ArrowLeft } from 'lucide-react';

import routes from '../../../../route-sage';

export default function UserProfileRoute() {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentTab = searchParams.get('tab') || 'general';

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '1.5rem', background: '#18181b', borderRadius: 12, border: '1px solid #27272a', color: '#f4f4f5' }}>
      <button 
        onClick={() => navigate(routes.catalog.url)} 
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '0.9rem' }}
      >
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid #27272a', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={30} color="#fff" />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>User Profile</h2>
          <span style={{ color: '#a1a1aa', fontSize: '0.9rem', fontFamily: 'monospace' }}>ID: {userId || 'unknown'}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button 
          style={{ padding: '0.5rem 1rem', borderRadius: 6, border: 'none', background: currentTab === 'general' ? '#2563eb' : '#27272a', color: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}
          onClick={() => navigate(routes.users.$userId(userId || 'guest').profile.href({ tab: 'general' }))}
        >
          General
        </button>
        <button 
          style={{ padding: '0.5rem 1rem', borderRadius: 6, border: 'none', background: currentTab === 'security' ? '#2563eb' : '#27272a', color: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}
          onClick={() => navigate(routes.users.$userId(userId || 'guest').profile.href({ tab: 'security' }))}
        >
          <ShieldCheck size={14} style={{ display: 'inline', marginRight: 4 }} /> Security
        </button>
      </div>

      <div style={{ background: '#09090b', padding: '1.25rem', borderRadius: 8, border: '1px solid #27272a' }}>
        <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.05rem', textTransform: 'capitalize' }}>{currentTab} Settings</h3>
        {currentTab === 'general' ? (
          <div style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6 }}>
            <p style={{ margin: '0 0 0.5rem' }}><strong>Email:</strong> alex.taylor@example.com</p>
            <p style={{ margin: '0 0 0.5rem' }}><strong>Member Since:</strong> October 2024</p>
            <p style={{ margin: 0 }}><strong>Role:</strong> Store Administrator</p>
          </div>
        ) : (
          <div style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6 }}>
            <p style={{ margin: '0 0 0.5rem' }}><strong>Two-Factor Authentication:</strong> Enabled</p>
            <p style={{ margin: '0 0 0.5rem' }}><strong>Password:</strong> Last changed 3 months ago</p>
            <p style={{ margin: 0 }}><strong>API Access:</strong> Granted with full read/write permissions</p>
          </div>
        )}
      </div>
    </div>
  );
}
