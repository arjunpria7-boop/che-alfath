import React, { useState, useEffect } from 'react';
import { Anchor, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Progres', href: '#progress' },
    { name: 'Donatur', href: '#donors' },
    { name: 'Donasi Sekarang', href: '#donate', isButton: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
        const headerOffset = 80; // Sesuaikan dengan tinggi header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className={`flex items-center gap-2 font-serif font-bold text-xl ${isScrolled ? 'text-ocean-900' : 'text-white'}`}>
          <Anchor className="w-8 h-8" />
          <span>Alfath Nusantara</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-medium transition-colors cursor-pointer ${
                link.isButton 
                  ? 'bg-gold-500 text-white px-5 py-2 rounded-full hover:bg-gold-400 shadow-lg shadow-gold-500/20' 
                  : isScrolled ? 'text-slate-600 hover:text-ocean-900' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen 
            ? <X className={isScrolled ? 'text-ocean-900' : 'text-white'} /> 
            : <Menu className={isScrolled ? 'text-ocean-900' : 'text-white'} />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`block text-center py-2 font-medium rounded-lg cursor-pointer ${
                link.isButton ? 'bg-gold-500 text-white' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};