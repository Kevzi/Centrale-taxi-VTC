import { MERCHANT_EMAIL, MERCHANT_ID } from "./paypalConfig";

export interface PaymentDetails {
  amount: number;
  currency: string;
  description: string;
  bookingReference: string;
}

export const createPayPalOrder = async (details: PaymentDetails) => {
  return {
    purchase_units: [
      {
        amount: {
          value: details.amount.toString(),
          currency_code: details.currency,
        },
        description: details.description,
        reference_id: details.bookingReference,
        payee: {
          email_address: MERCHANT_EMAIL,
          merchant_id: MERCHANT_ID,
        },
      },
    ],
  };
};

export const handlePayPalApproval = async (data: any, actions: any) => {
  try {
    const details = await actions.order.capture();
    if (details.status === "COMPLETED") {
      return {
        success: true,
        transactionId: details.id,
        status: details.status,
      };
    }
    throw new Error("Payment not completed");
  } catch (error) {
    console.error("Payment failed:", error);
    throw error;
  }
};