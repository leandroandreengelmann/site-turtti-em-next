export interface Product {
  id: number;
  nome: string;
  preco: number;
  imagem_url: string;
  descricao?: string;
  categoria_id?: number;
  destaque?: boolean;
  estoque?: number;
  created_at?: string;
}

export interface SuvinilColor {
  id: number;
  nome: string;
  codigo_cor: string;
  descricao: string;
  created_at?: string;
}

export interface CarouselSlide {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  url: string;
} 