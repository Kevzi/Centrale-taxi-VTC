const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';

interface BookingData {
  firstName: string;
  lastName: string;
  phone: string;
  pickup: string;
  destination: string;
  date: Date;
  distance: number;
  duration: number;
  price: number;
}

export const sendTelegramNotification = async (booking: BookingData) => {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h${minutes}min` : `${minutes} minutes`;
  };

  const message = `
🚗 Nouvelle réservation VTC !

👤 Client: ${booking.firstName} ${booking.lastName}
📱 Téléphone: ${booking.phone}
📍 Départ: ${booking.pickup}
🎯 Arrivée: ${booking.destination}
🕒 Date: ${booking.date.toLocaleString('fr-FR')}
📏 Distance: ${(booking.distance / 1000).toFixed(1)} km
⏱ Durée: ${formatDuration(booking.duration)}
💰 Prix: ${booking.price}€

✅ Paiement effectué via PayPal
`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to send Telegram notification');
    }
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    throw error;
  }
};