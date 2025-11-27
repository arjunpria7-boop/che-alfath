import React from 'react';
import { Anchor, Github, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ocean-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 font-serif font-bold text-xl mb-4 text-gold-400">
                <Anchor className="w-8 h-8" />
                <span>Alfath Nusantara</span>
            </div>
            <p className="text-ocean-100 text-sm leading-relaxed">
                Mewujudkan mimpi maritim bangsa melalui gotong royong digital. Setiap papan dan paku adalah bukti cinta tanah air.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Tautan</h3>
            <ul className="space-y-2 text-ocean-100">
                <li><a href="#home" className="hover:text-gold-400 transition-colors">Beranda</a></li>
                <li><a href="#progress" className="hover:text-gold-400 transition-colors">Progres Pembangunan</a></li>
                <li><a href="#donate" className="hover:text-gold-400 transition-colors">Donasi</a></li>
            </ul>
          </div>

          <div>
             <h3 className="font-bold text-lg mb-4">Kontak</h3>
             <ul className="space-y-2 text-ocean-100 text-sm">
                <li>Galangan Kapal Nusantara No. 1</li>
                <li>Tanjung Priok, Jakarta</li>
                <li>info@alfathnusantara.id</li>
                <li>+62 812 3456 7890</li>
             </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Sosial Media</h3>
            <div className="flex gap-4">
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-gold-500 transition-colors"><Twitter className="w-5 h-5"/></a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-gold-500 transition-colors"><Instagram className="w-5 h-5"/></a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-gold-500 transition-colors"><Github className="w-5 h-5"/></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-sm text-ocean-300">
            &copy; {new Date().getFullYear()} Alfath Nusantara Project. All rights reserved.
        </div>
      </div>
    </footer>
  );
};