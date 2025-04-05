import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/header/Header';
import Carousel from '@/components/carousel/Carousel';
import ProductSlide from '@/components/products/ProductSlide';
import SuvinilColors from '@/components/suvinil/SuvinilColors';
import Footer from '@/components/footer/Footer';
import { Product, SuvinilColor, CarouselSlide } from '@/lib/types';

// Função para listar tabelas disponíveis no Supabase
async function listAvailableTables() {
  try {
    // Esta consulta SQL retorna todas as tabelas no esquema público
    const { data, error } = await supabase.rpc('get_available_tables');
    
    if (error) {
      console.error('Erro ao listar tabelas:', error);
      
      // Tentativa alternativa usando uma consulta SQL direta
      const { data: tables, error: sqlError } = await supabase.from('pg_catalog.pg_tables')
        .select('tablename')
        .eq('schemaname', 'public');
      
      if (sqlError) {
        console.error('Erro na consulta SQL alternativa:', sqlError);
        return [];
      }
      
      console.log('Tabelas disponíveis:', tables);
      return tables || [];
    }
    
    console.log('Tabelas disponíveis:', data);
    return data || [];
  } catch (error) {
    console.error('Erro ao listar tabelas:', error);
    return [];
  }
}

// Mock de slides para o carrossel
const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/1600x700/BBDEFB/333333?text=Promoção+de+Ferramentas',
    title: 'Promoção de Ferramentas',
    description: 'Confira nossa seleção de ferramentas com descontos imperdíveis',
    url: '/promocoes/ferramentas',
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/1600x700/BBDEFB/333333?text=Tintas+Suvinil',
    title: 'Tintas Suvinil',
    description: 'Transforme sua casa com as cores da linha Suvinil',
    url: '/categorias/tintas-externas',
  },
  {
    id: 3,
    imageUrl: 'https://via.placeholder.com/1600x700/BBDEFB/333333?text=Materiais+de+Construção',
    title: 'Materiais de Construção',
    description: 'Tudo o que você precisa para sua obra em um só lugar',
    url: '/categorias/materiais',
  },
];

// Produtos de exemplo para quando o banco de dados não estiver configurado
const exampleProducts: Product[] = [
  {
    id: 1,
    nome: 'Furadeira de Impacto 750W',
    preco: 299.90,
    imagem_url: 'https://via.placeholder.com/300x300/CCCCCC/666666?text=Furadeira',
  },
  {
    id: 2,
    nome: 'Conjunto de Chaves de Fenda 6 peças',
    preco: 59.90,
    imagem_url: 'https://via.placeholder.com/300x300/CCCCCC/666666?text=Chaves',
  },
  {
    id: 3,
    nome: 'Tinta Acrílica Premium 18L',
    preco: 229.90,
    imagem_url: 'https://via.placeholder.com/300x300/CCCCCC/666666?text=Tinta',
  },
  {
    id: 4,
    nome: 'Escada Alumínio 5 Degraus',
    preco: 149.90,
    imagem_url: 'https://via.placeholder.com/300x300/CCCCCC/666666?text=Escada',
  },
  {
    id: 5,
    nome: 'Martelo Unha 29mm',
    preco: 39.90,
    imagem_url: 'https://via.placeholder.com/300x300/CCCCCC/666666?text=Martelo',
  },
  {
    id: 6,
    nome: 'Serra Circular 7.1/4 1400W',
    preco: 399.90,
    imagem_url: 'https://via.placeholder.com/300x300/CCCCCC/666666?text=Serra',
  },
];

// Cores de exemplo para quando o banco de dados não estiver configurado
const exampleColors: SuvinilColor[] = [
  { id: 1, nome: 'Azul Sereno', codigo_cor: '1E88E5', descricao: 'Azul tranquilo e relaxante' },
  { id: 2, nome: 'Verde Natureza', codigo_cor: '43A047', descricao: 'Verde revigorante e natural' },
  { id: 3, nome: 'Branco Neve', codigo_cor: 'FFFFFF', descricao: 'Branco puro e luminoso' },
  { id: 4, nome: 'Cinza Urbano', codigo_cor: '757575', descricao: 'Cinza moderno e sofisticado' },
  { id: 5, nome: 'Amarelo Sol', codigo_cor: 'FFC107', descricao: 'Amarelo vibrante e alegre' },
  { id: 6, nome: 'Vermelho Paixão', codigo_cor: 'E53935', descricao: 'Vermelho intenso e marcante' },
  { id: 7, nome: 'Lilás Suave', codigo_cor: 'BA68C8', descricao: 'Lilás delicado e aconchegante' },
  { id: 8, nome: 'Laranja Vibrante', codigo_cor: 'FF9800', descricao: 'Laranja energético e moderno' },
  { id: 9, nome: 'Marrom Terra', codigo_cor: '795548', descricao: 'Marrom neutro e acolhedor' },
  { id: 10, nome: 'Preto Elegante', codigo_cor: '212121', descricao: 'Preto clássico e sofisticado' },
  { id: 11, nome: 'Rosa Suave', codigo_cor: 'F48FB1', descricao: 'Rosa delicado e aconchegante' },
  { id: 12, nome: 'Azul Petróleo', codigo_cor: '00838F', descricao: 'Azul profundo e versátil' },
];

// Função genérica para consultar qualquer tabela no Supabase
async function queryTable(tableName: string, limit: number = 10) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(limit);

    if (error) {
      console.error(`Erro ao consultar tabela ${tableName}:`, error);
      return null;
    }

    console.log(`Dados da tabela ${tableName}:`, data);
    return data;
  } catch (error) {
    console.error(`Erro ao consultar tabela ${tableName}:`, error);
    return null;
  }
}

async function getProducts() {
  try {
    // Tentativas de tabelas que podem conter produtos
    const tableNames = ['produtos', 'products', 'itens', 'items', 'product'];
    
    for (const tableName of tableNames) {
      const data = await queryTable(tableName);
      if (data && data.length > 0) {
        console.log(`Usando dados da tabela "${tableName}"`);
        return data as Product[];
      }
    }
    
    console.log('Nenhuma tabela de produtos encontrada. Usando dados de exemplo.');
    return [];
  } catch (error) {
    console.error('Erro na consulta de produtos:', error);
    return [];
  }
}

async function getSuvinilColors() {
  try {
    // Tentativas de tabelas que podem conter cores
    const tableNames = ['cores_suvinil', 'colors', 'cores', 'suvinil_colors', 'tintas'];
    
    for (const tableName of tableNames) {
      const data = await queryTable(tableName);
      if (data && data.length > 0) {
        console.log(`Usando dados da tabela "${tableName}"`);
        return data as SuvinilColor[];
      }
    }
    
    console.log('Nenhuma tabela de cores encontrada. Usando dados de exemplo.');
    return [];
  } catch (error) {
    console.error('Erro na consulta de cores:', error);
    return [];
  }
}

// Componente de fallback para carregamento
function LoadingFallback() {
  return (
    <div className="w-full py-20 flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

export default async function Home() {
  // Listar tabelas disponíveis
  await listAvailableTables();
  
  // Obter produtos do Supabase ou usar dados de exemplo
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.warn('Falha ao buscar produtos, usando dados de exemplo:', error);
  }
  
  // Obter cores do Supabase ou usar dados de exemplo
  let suvinilColors: SuvinilColor[] = [];
  try {
    suvinilColors = await getSuvinilColors();
  } catch (error) {
    console.warn('Falha ao buscar cores Suvinil, usando dados de exemplo:', error);
  }
  
  // Usar dados do banco ou fallback para dados de exemplo
  const productsToShow = products.length > 0 ? products : exampleProducts;
  const colorsToShow = suvinilColors.length > 0 ? suvinilColors : exampleColors;

  return (
    <main>
      <Header />
      
      <Carousel slides={carouselSlides} />
      
      <Suspense fallback={<LoadingFallback />}>
        <ProductSlide 
          title="Produtos em Destaque" 
          products={productsToShow} 
        />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <SuvinilColors 
          colors={colorsToShow} 
        />
      </Suspense>
      
      <Footer />
    </main>
  );
}
