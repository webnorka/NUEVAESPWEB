import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey && process.env.NODE_ENV === 'production') {
    console.warn('STRIPE_SECRET_KEY is not defined');
}

export const stripe = new Stripe(secretKey || 'sk_test_placeholder', {
    apiVersion: '2025-01-27' as any,
});
