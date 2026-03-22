export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Suraj Medical Agencies. All rights reserved.</p>
        <p className="text-sm mt-2">Developed by Er. Dipak</p>
      </div>
    </footer>
  );
}
