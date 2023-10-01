import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { selectCurrentOrder } from '../features/order/orderSlice'
import CheckoutForm from './CheckoutForm'
import './Stripe.css'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51NvXkSSCr7tMPtsOS83UzI2kOedNEYjOlxCMCzz0wJNsBXP3fL4xtuOPGvnQvBEJ3weJg8nPjcJhUCvqcu7HkSO400r0yjDeok'
)

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState('')

  const currentOrder = useSelector(selectCurrentOrder)
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
      meta: {
        order_id: currentOrder.id,
      },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [])

  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className='Stripe'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
