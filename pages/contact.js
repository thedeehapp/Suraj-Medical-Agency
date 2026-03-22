export default function Contact() {
  const address = "Tetarpur, Shardanagr Road, Lakhimpur Kheri, UP-31";
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(address)}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-4"><strong>Address:</strong> {address}</p>
          <p className="text-lg mb-4"><strong>Phone:</strong> +91 9569647205</p>
          <p className="text-lg mb-4"><strong>Email:</strong> info@surajmedical.com</p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
          >
            📱 Chat on WhatsApp
          </a>
        </div>
        <div className="h-96 rounded overflow-hidden shadow">
          <iframe
            src={googleMapsUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Office Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
