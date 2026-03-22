import WhatsAppButton from './WhatsAppButton';

export default function ProductCard({ product }) {
  const { name, category, manufacturer, packSize, imageUrl } = product;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition hover:shadow-lg">
      <img src={imageUrl || '/images/placeholder.jpg'} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-blue-800">{name}</h2>
        <p className="text-gray-600 text-sm">{manufacturer}</p>
        <p className="text-gray-500 text-sm">Pack: {packSize}</p>
        <p className="text-gray-500 text-sm">Category: {category}</p>
        <WhatsAppButton productName={name} />
      </div>
    </div>
  );
}
