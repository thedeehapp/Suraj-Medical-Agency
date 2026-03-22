export default function WhatsAppButton({ productName }) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;
  const message = `Hello, I'm interested in ${productName}. Please share details and price.`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded mt-2"
    >
      📞 Enquire on WhatsApp
    </a>
  );
}
