"use client";
import React, { useEffect, useState } from "react";
import Image, {StaticImageData} from "next/image";
import Link from "next/link";
import Allfood from '@/public/allfood1.png';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: StaticImageData;
  buttonText: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "All Food",
    subtitle: "Fresh looks for the season. Stay warm, stay stylish.",
    image: Allfood ,
    buttonText: "Shop Now",
    link: "/shop",
  },
  {
    id: 2,
    title: "Flash Sale!",
    subtitle: "Up to 60% off selected items. Limited time only!",
    image: Allfood,
    buttonText: "Grab Deals",
    link: "/sale",
  },
  {
    id: 3,
    title: "Accessories That Shine",
    subtitle: "Upgrade your style with the latest accessories.",
    image: Allfood,
    buttonText: "Browse Accessories",
    link: "/accessories",
  },
];

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[60vh] overflow-hidden ml-16 mr-16 my-10 rounded-4xl">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start px-8 md:px-16 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
            <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
            <Link
              href={slide.link}
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              {slide.buttonText}
            </Link>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
          title="Dots slide"
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
