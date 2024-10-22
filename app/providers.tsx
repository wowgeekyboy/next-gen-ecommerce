'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { ThemeProvider } from 'next-themes';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Elements stripe={stripePromise}>
          {children}
        </Elements>
      </ThemeProvider>
    </Provider>
  );
}