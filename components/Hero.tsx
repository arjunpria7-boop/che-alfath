import React from 'react';
import { Button } from './Button';
import { ArrowRight, PlayCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Lighter Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.postimg.cc/bwQpfP0B/1764241357747-2.jpg" 
          alt="Alfath Nusantara Ship Construction" 
          className="w-full h-full object-cover object-center"
        />
        {/* Reduced overlay opacity significantly (from 80% to 30-60%) so the ship is visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/60 via-ocean-900/20 to-ocean-900/90" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center text-white pt-20">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6 text-sm font-medium tracking-wide animate-fade-in-up">
          ⚓ Proyek Maritim Terbesar Abad Ini
        </div>
        
        <h1 className="text-5xl md:text-8xl font-serif font-bold mb-4 leading-tight drop-shadow-2xl max-w-5xl mx-auto tracking-tight">
          ALFATH <span className="text-gold-400">NUSANTARA</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white font-medium mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Bangkitkan kejayaan maritim bangsa. Donasi Anda adalah paku, papan, dan layar kapal ini.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#donate">
            <Button variant="gold" className="text-lg w-full sm:w-auto h-14 shadow-black/20">
              Donasi Sekarang <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
          <a href="#progress">
             <Button variant="outline" className="text-lg w-full sm:w-auto h-14 backdrop-blur-sm bg-white/5 hover:bg-white/20">
              Lihat Blueprint <PlayCircle className="w-5 h-5" />
            </Button>
          </a>
        </div>

        {/* Floating Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/20 pt-8 bg-black/20 backdrop-blur-sm rounded-xl p-6">
            <div>
                <p className="text-3xl font-bold text-white drop-shadow-sm">45%</p>
                <p className="text-sm text-ocean-100">Konstruksi</p>
            </div>
            <div>
                <p className="text-3xl font-bold text-white drop-shadow-sm">12.5rb</p>
                <p className="text-sm text-ocean-100">Donatur</p>
            </div>
            <div>
                <p className="text-3xl font-bold text-white drop-shadow-sm">120</p>
                <p className="text-sm text-ocean-100">Pekerja Ahli</p>
            </div>
             <div>
                <p className="text-3xl font-bold text-white drop-shadow-sm">2026</p>
                <p className="text-sm text-ocean-100">Target Peluncuran</p>
            </div>
        </div>
      </div>
    </section>
  );
};