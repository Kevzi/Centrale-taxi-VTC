import { PayPalScriptOptions } from "@paypal/react-paypal-js";

export const paypalConfig: PayPalScriptOptions = {
  "client-id": "AYV7zbOQYeMfYIBOBP9-cx4Z7WX7AVKcLawLNdcRNxzmfIMdwiENYgLW32KG9gYKz_BAqZ1VW2FL4gm0",
  currency: "EUR",
  intent: "capture",
  components: "buttons",
};