import React, { lazy, Suspense } from 'react';

const pages = import.meta.glob('../pages/**/*.jsx');

const allRoutes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\.\/pages\/(.*)\.jsx$/)[1].toLowerCase();
  const Component = lazy(pages[path]);
  
  // Determina a role baseado no caminho do arquivo
  const role = path.includes('/admin/') ? 'admin' : 'user';
  
  return {
    path: name === 'home' ? '/' : `/${name}`,
    name: name === 'home' ? 'Home' : name.charAt(0).toUpperCase() + name.slice(1),
    role,
    element: (
      <Suspense fallback={<div>Carregando...</div>}>
        <Component />
      </Suspense>
    )
  };
});

// Função para filtrar rotas baseado na role do usuário
export const getRoutesByUserRole = (userRole) => {
  return allRoutes.filter(route => 
    userRole === 'admin' || route.role === userRole
  );
};

export default allRoutes;
