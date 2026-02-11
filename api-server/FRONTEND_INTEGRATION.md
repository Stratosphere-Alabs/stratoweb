# Frontend Integration Examples

This document shows how to integrate the backend API into your React frontend.

## Setup

### 1. Environment Variables

Create or update `.env.production` in your frontend project:

```env
VITE_API_BASE_URL=http://47.74.8.197
```

For local development (`.env.local`):

```env
VITE_API_BASE_URL=http://localhost:3001
```

### 2. Deploy to Vercel

Add the environment variable in Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add: `VITE_API_BASE_URL` = `http://47.74.8.197`
4. Redeploy

## Field Name Compatibility

> **Note on `sourcePage` vs `source_page`:**
> 
> The API accepts **both** `sourcePage` (camelCase) and `source_page` (snake_case) for the inquiry source page field. Both will be correctly saved to the database.
> 
> **Recommended:** Use `sourcePage` (camelCase) in your frontend code for consistency with JavaScript naming conventions.
> 
> **Priority:** If both fields are provided in a request, `sourcePage` takes precedence.
> 
> Examples:
> ```json
> // Both formats work:
> { "sourcePage": "/contact" }    // ✅ Recommended
> { "source_page": "/contact" }   // ✅ Also supported
> ```

## Usage Examples

### Contact Form Integration

```tsx
import React, { useState } from 'react';
import { api, type InquiryData } from '@/lib/api';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const inquiryData: InquiryData = {
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        message: formData.message,
        sourcePage: window.location.pathname,
      };

      await api.submitInquiry(inquiryData);
      
      setSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
      
      // Optional: Show success message, redirect, etc.
      console.log('Inquiry submitted successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry');
      console.error('Inquiry submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={5}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Thank you! We'll get back to you soon.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Submitting...' : 'Submit Inquiry'}
      </button>
    </form>
  );
}
```

### Waitlist Integration

```tsx
import React, { useState } from 'react';
import { api, type WaitlistData } from '@/lib/api';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const waitlistData: WaitlistData = {
        email,
        name: name || undefined,
        event: 'signup',
        meta: {
          source: 'waitlist_page',
          utm_source: new URLSearchParams(window.location.search).get('utm_source'),
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
        },
      };

      await api.joinWaitlist(waitlistData);
      
      setSuccess(true);
      setEmail('');
      setName('');
      
      console.log('Successfully joined waitlist!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join waitlist');
      console.error('Waitlist error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleJoin} className="space-y-4">
      <div>
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="name">Name (optional)</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          You're on the list! We'll notify you when we launch.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Joining...' : 'Join Waitlist'}
      </button>
    </form>
  );
}
```

### Login to Waitlist (Returning User)

```tsx
import React, { useState } from 'react';
import { api } from '@/lib/api';

export default function WaitlistLogin() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await api.joinWaitlist({
        email,
        event: 'login',
      });
      
      setUserData(result);
      console.log('Login successful:', result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  if (userData) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded">
        <h3 className="font-bold">Welcome back!</h3>
        <p>Email: {userData.email}</p>
        <p>Last seen: {new Date(userData.lastSeenAt).toLocaleString()}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Checking...' : 'Check Status'}
      </button>
    </form>
  );
}
```

### Health Check Example

```tsx
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export function ApiHealthIndicator() {
  const [healthy, setHealthy] = useState<boolean | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await api.checkHealth();
        setHealthy(true);
      } catch {
        setHealthy(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  if (healthy === null) return null;

  return (
    <div className={`text-sm ${healthy ? 'text-green-600' : 'text-red-600'}`}>
      API: {healthy ? '🟢 Online' : '🔴 Offline'}
    </div>
  );
}
```

## Error Handling

The API client throws errors that you can catch and handle:

```tsx
try {
  await api.submitInquiry(data);
} catch (error) {
  if (error instanceof Error) {
    // Display user-friendly error message
    if (error.message.includes('Validation error')) {
      alert('Please check your form inputs');
    } else if (error.message.includes('Too many requests')) {
      alert('Please wait a few seconds before trying again');
    } else if (error.message.includes('CORS')) {
      alert('Connection error. Please contact support.');
    } else {
      alert('Something went wrong. Please try again.');
    }
  }
}
```

## Testing API Connection

Before integrating, test that the API is accessible:

```tsx
// Add this to your App.tsx or root component during development
useEffect(() => {
  api.checkHealth()
    .then(data => console.log('API connected:', data))
    .catch(err => console.error('API connection failed:', err));
}, []);
```

## Deployment Checklist

- [ ] Backend deployed on ECS
- [ ] RDS database created and migrated
- [ ] `VITE_API_BASE_URL` set in Vercel environment variables
- [ ] Frontend code updated with API integration
- [ ] CORS origins configured in backend `.env`
- [ ] Test inquiry submission from Vercel domain
- [ ] Test waitlist join from Vercel domain
- [ ] Verify data is saved in RDS
