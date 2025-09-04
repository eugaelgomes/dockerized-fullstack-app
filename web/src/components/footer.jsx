import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-2 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} CodaWeb Notes. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}