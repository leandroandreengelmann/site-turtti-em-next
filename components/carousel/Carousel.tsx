'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CarouselSlide {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  url: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
}

const Carousel = ({ slides, autoPlayInterval = 5000 }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className="relative bg-light-primary overflow-hidden">
      <div className="h-[300px] md:h-[400px] lg:h-[500px] relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 transform ${
              currentSlide === index 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-full'
            }`}
          >
            <div className="relative w-full h-full">
              <Image 
                src={slide.imageUrl}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="container mx-auto">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-sm md:text-base mb-4 max-w-xl">{slide.description}</p>
                  <Link 
                    href={slide.url} 
                    className="bg-accent hover:bg-primary px-6 py-2 rounded-md text-white font-medium transition-colors"
                  >
                    Saiba Mais
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles do carrossel */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary/80 text-white p-2 rounded-full hover:bg-accent transition-colors z-10"
        aria-label="Slide anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary/80 text-white p-2 rounded-full hover:bg-accent transition-colors z-10"
        aria-label="Próximo slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-accent' : 'bg-white/50'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel; 