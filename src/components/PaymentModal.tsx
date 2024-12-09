import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { X } from 'lucide-react';
import { sendTelegramNotification } from '../utils/telegramNotification';
import { fadeInUp, scaleIn } from '../styles/animations';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  bookingData: {
    firstName: string;
    lastName: string;
    phone: string;
    pickup: string;
    destination: string;
    date: Date;
    distance: number;
    duration: number;
  };
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  bookingData,
}) => {
  const handlePaymentSuccess = async () => {
    try {
      await sendTelegramNotification({
        ...bookingData,
        price: amount,
      });
      onClose();
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Overlay avec effet de flou */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={scaleIn}
            initial="initial"
            animate="animate"
            exit="initial"
            className="relative z-50 w-full max-w-md mx-4 bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden"
          >
            {/* En-tête du modal */}
            <motion.div
              variants={fadeInUp}
              className="relative p-6 border-b border-gray-800"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-white">
                Paiement sécurisé
              </h2>
            </motion.div>

            {/* Contenu du modal */}
            <div className="p-6 space-y-6">
              {/* Résumé de la réservation */}
              <motion.div
                variants={fadeInUp}
                className="bg-white/5 rounded-xl p-4 space-y-2"
              >
                <p className="text-gray-300">Montant total :</p>
                <p className="text-3xl font-bold text-yellow-400">{amount}€</p>
              </motion.div>

              {/* Détails de la course */}
              <motion.div
                variants={fadeInUp}
                className="space-y-2 text-sm text-gray-400"
              >
                <p>De : {bookingData.pickup}</p>
                <p>À : {bookingData.destination}</p>
                <p>Distance : {(bookingData.distance / 1000).toFixed(1)} km</p>
              </motion.div>

              {/* Boutons PayPal */}
              <motion.div variants={fadeInUp}>
                <PayPalScriptProvider
                  options={{
                    'client-id':
                      'AYV7zbOQYeMfYIBOBP9-cx4Z7WX7AVKcLawLNdcRNxzmfIMdwiENYgLW32KG9gYKz_BAqZ1VW2FL4gm0',
                    currency: 'EUR',
                    intent: 'capture',
                  }}
                >
                  <PayPalButtons
                    style={{
                      layout: 'vertical',
                      color: 'gold',
                      shape: 'pill',
                      label: 'pay',
                    }}
                    createOrder={(_data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: amount.toString(),
                              currency_code: 'EUR',
                            },
                          },
                        ],
                        application_context: {
                          shipping_preference: 'NO_SHIPPING',
                        },
                      });
                    }}
                    onApprove={async (_data, actions) => {
                      if (actions.order) {
                        const details = await actions.order.capture();
                        if (details.status === 'COMPLETED') {
                          await handlePaymentSuccess();
                        }
                      }
                    }}
                  />
                </PayPalScriptProvider>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
