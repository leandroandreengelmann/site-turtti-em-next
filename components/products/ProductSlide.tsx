'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  nome: string;
  preco: number;
  imagem_url: string;
}

interface ProductSlideProps {
  title: string;
  products: Product[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const ProductSlide = ({ title, products }: ProductSlideProps) => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-text">{title}</h2>
          
          {/* Controles de navegação - apenas visíveis em telas maiores */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={scrollLeft}
              className="bg-primary hover:bg-accent p-2 rounded-full text-white transition-colors"
              aria-label="Rolar para a esquerda"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="bg-primary hover:bg-accent p-2 rounded-full text-white transition-colors"
              aria-label="Rolar para a direita"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainer}
          className="flex overflow-x-auto pb-6 -mx-2 scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[250px] max-w-[250px] px-2"
            >
              <div className="bg-white rounded-lg border border-divider overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={product.imagem_url}
                    alt={product.nome}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-primary-text line-clamp-2 h-14">{product.nome}</h3>
                  <p className="text-accent text-xl font-bold mt-2">{formatCurrency(product.preco)}</p>
                  <button className="w-full mt-4 bg-primary hover:bg-accent text-white py-2 rounded-md transition-colors">
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Link 
            href="/produtos" 
            className="text-primary hover:text-accent font-medium transition-colors"
          >
            Ver todos os produtos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSlide; 