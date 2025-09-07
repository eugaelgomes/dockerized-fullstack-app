import React from "react";
export default function Footer() {
  return (
    <footer class="rounded-lg shadow-md shadow-gray-600 border border-gray-800 m-4 bg-slate-900">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-400 sm:text-center">
          &copy; {new Date().getFullYear()}{" "}
          <a href="https://codaweb.com.br/" class="hover:underline">
            CodaWeb Notes.
          </a>{" "}
          Todos os direitos reservados.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              Sobre
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline">
              Contato
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}