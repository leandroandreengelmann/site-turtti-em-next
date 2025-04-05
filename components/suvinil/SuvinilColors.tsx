'use client';

import Link from 'next/link';

interface SuvinilColor {
  id: number;
  nome: string;
  codigo_cor: string;
  descricao: string;
}

interface SuvinilColorsProps {
  colors: SuvinilColor[];
}

const SuvinilColors = ({ colors }: SuvinilColorsProps) => {
  if (!colors || colors.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-light-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-text mb-8 text-center">
          Cores Suvinil
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {colors.map((color) => (
            <div 
              key={color.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div 
                className="h-32 w-full" 
                style={{ backgroundColor: `#${color.codigo_cor}` }}
              />
              <div className="p-4">
                <h3 className="text-primary-text font-medium mb-1">{color.nome}</h3>
                <p className="text-secondary-text text-sm mb-2">#{color.codigo_cor}</p>
                <p className="text-secondary-text text-xs line-clamp-2 h-10">{color.descricao}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Link 
            href="/cores-suvinil" 
            className="bg-primary hover:bg-accent text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Ver Todas as Cores
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuvinilColors; 