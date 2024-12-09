import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { createPayPalOrder, handlePayPalApproval } from '../../services/payment/paypalService';

interface PayPalPaymentButtonProps {
  amount: number;
  bookingReference: string;
  description: string;
  onSuccess: (details: any) => void;
  onError: (error: Error) => void;
}

const PayPalPaymentButton: React.FC<PayPalPaymentButtonProps> = ({
  amount,
  bookingReference,
  description,
  onSuccess,
  onError,
}) => {
  return (
    <PayPalButtons
      style={{
        layout: "vertical",
        shape: "pill",
        label: "pay",
      }}
      createOrder={(_data, actions) => {
        return actions.order.create(
          createPayPalOrder({
            amount,
            currency: "EUR",
            description,
            bookingReference,
          })
        );
      }}
      onApprove={async (data, actions) => {
        try {
          const result = await handlePayPalApproval(data, actions);
          onSuccess(result);
        } catch (error) {
          onError(error as Error);
        }
      }}
      onError={(error) => {
        onError(error as Error);
      }}
    />
  );
};

export default PayPalPaymentButton;