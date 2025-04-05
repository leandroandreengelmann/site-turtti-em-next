'use client';

import { useState } from 'react';
import Link from 'next/link';

// Definição dos menus para as categorias
const menuItems = [
  {
    title: 'Ferramentas',
    subcategories: [
      { name: 'Ferramentas Elétricas', url: '/categorias/ferramentas-eletricas' },
      { name: 'Ferramentas Manuais', url: '/categorias/ferramentas-manuais' },
      { name: 'Ferramentas de Medição', url: '/categorias/ferramentas-medicao' },
    ]
  },
  {
    title: 'Materiais',
    subcategories: [
      { name: 'Cimento e Argamassa', url: '/categorias/cimento-argamassa' },
      { name: 'Tijolos e Blocos', url: '/categorias/tijolos-blocos' },
      { name: 'Areia e Pedra', url: '/categorias/areia-pedra' },
    ]
  },
  {
    title: 'Tintas',
    subcategories: [
      { name: 'Tintas Internas', url: '/categorias/tintas-internas' },
      { name: 'Tintas Externas', url: '/categorias/tintas-externas' },
      { name: 'Acessórios para Pintura', url: '/categorias/acessorios-pintura' },
    ]
  },
  {
    title: 'Elétrica',
    subcategories: [
      { name: 'Fios e Cabos', url: '/categorias/fios-cabos' },
      { name: 'Tomadas e Interruptores', url: '/categorias/tomadas-interruptores' },
      { name: 'Iluminação', url: '/categorias/iluminacao' },
    ]
  },
  {
    title: 'Hidráulica',
    subcategories: [
      { name: 'Tubos e Conexões', url: '/categorias/tubos-conexoes' },
      { name: 'Registros e Torneiras', url: '/categorias/registros-torneiras' },
      { name: 'Caixas d\'água', url: '/categorias/caixas-agua' },
    ]
  }
];

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const handleCategoryHover = (category: string) => {
    setOpenCategory(category);
  };

  const handleCategoryLeave = () => {
    setOpenCategory(null);
  };

  return (
    <header className="w-full bg-dark-primary text-text-icons">
      {/* Barra superior */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <h1 className="text-3xl font-bold font-montserrat">TURATTI</h1>
        </Link>

        {/* Barra de pesquisa */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="O que você está procurando?"
              className="w-full px-4 py-2 rounded-md text-primary-text focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary-text"
              aria-label="Pesquisar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Ícones de ações */}
        <div className="flex items-center space-x-4">
          <button aria-label="Minha conta" className="hover:text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <Link href="/carrinho" className="hover:text-accent relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold px-1.5 py-0.5 rounded-full">0</span>
          </Link>
        </div>
      </div>

      {/* Mega Menu */}
      <nav className="bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-12">
            <ul className="flex space-x-1">
              {menuItems.map((item) => (
                <li 
                  key={item.title}
                  className="group relative h-full flex items-center"
                  onMouseEnter={() => handleCategoryHover(item.title)}
                  onMouseLeave={handleCategoryLeave}
                >
                  <a 
                    href={`/categorias/${item.title.toLowerCase()}`}
                    className={`px-4 py-3 h-full flex items-center font-medium hover:bg-accent transition-colors ${
                      openCategory === item.title ? 'bg-accent' : ''
                    }`}
                  >
                    {item.title}
                  </a>

                  {/* Dropdown */}
                  {openCategory === item.title && (
                    <div className="absolute left-0 top-full z-50 w-56 bg-white shadow-lg rounded-b-md overflow-hidden">
                      <div className="p-4">
                        <h3 className="font-semibold text-primary-text mb-2">{item.title}</h3>
                        <ul className="space-y-2">
                          {item.subcategories.map((subcategory) => (
                            <li key={subcategory.name}>
                              <Link 
                                href={subcategory.url}
                                className="text-secondary-text hover:text-primary block py-1"
                              >
                                {subcategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Barra de pesquisa móvel */}
      <div className="md:hidden px-4 py-2 bg-primary">
        <div className="relative">
          <input
            type="text"
            placeholder="O que você está procurando?"
            className="w-full px-4 py-2 rounded-md text-primary-text focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary-text"
            aria-label="Pesquisar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 