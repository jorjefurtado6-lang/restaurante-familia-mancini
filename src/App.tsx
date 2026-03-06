import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Utensils, 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  Facebook, 
  Star, 
  ChevronRight, 
  Menu, 
  X,
  Wine,
  Award,
  Users
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline();
      tl.from('.hero-text-anim', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
      })
      .from('.hero-btn-anim', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.5');

      // Scroll Reveal Sections
      gsap.utils.toArray('.reveal-section').forEach((section: any) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });

      // Bento Grid Stagger
      gsap.from('.bento-item', {
        scrollTrigger: {
          trigger: '.bento-grid',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });

    });
    
    return () => ctx.revert();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-cream selection:bg-luxury-gold selection:text-black">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-panel border-b-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="z-50 flex items-center gap-2 cursor-pointer">
            <span className="font-serif text-2xl font-bold tracking-tighter text-white">
              FAMIGLIA <span className="text-luxury-gold">MANCINI</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['História', 'Cardápio', 'Experiência', 'Depoimentos'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm uppercase tracking-widest hover:text-luxury-gold transition-colors duration-300"
              >
                {item}
              </a>
            ))}
            <button className="px-6 py-2 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all duration-300 uppercase text-xs tracking-widest font-bold">
              Reservar
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="md:hidden z-50 text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Nav Overlay */}
          <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {['História', 'Cardápio', 'Experiência', 'Depoimentos'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={toggleMenu}
                className="font-serif text-3xl hover:text-luxury-gold transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940&auto=format&fit=crop" 
            alt="Ambiente Famiglia Mancini" 
            className="w-full h-full object-cover opacity-50 scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/60 to-black/30" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6" ref={heroRef}>
          <div className="flex justify-center mb-6 hero-text-anim">
            <div className="w-24 h-24 rounded-full border border-luxury-gold/30 flex items-center justify-center backdrop-blur-sm bg-black/20">
              <div className="text-center">
                <span className="block text-luxury-gold text-[10px] uppercase tracking-widest">Desde</span>
                <span className="block text-white font-serif text-2xl font-bold">1980</span>
              </div>
            </div>
          </div>
          
          <p className="hero-text-anim text-luxury-gold uppercase tracking-[0.3em] text-sm md:text-base mb-4 font-medium">
            Desde 1980 na Rua Avanhandava
          </p>
          <h1 className="hero-text-anim font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-white">
            A Alma da <br />
            <span className="italic font-light text-luxury-gold">Itália em São Paulo</span>
          </h1>
          <p className="hero-text-anim text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Mais que um restaurante, um patrimônio gastronômico. Experimente a tradição, a fartura e a atmosfera boêmia que encantam gerações.
          </p>
          <div className="hero-btn-anim flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-luxury-gold text-black font-bold uppercase tracking-wider overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Ver Cardápio <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </button>
            <button className="px-8 py-4 border border-white/20 hover:border-white text-white uppercase tracking-wider transition-colors duration-300 backdrop-blur-sm">
              Conhecer a História
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent" />
        </div>
      </section>

      {/* AUTHORITY MARQUEE */}
      <div className="py-8 border-y border-white/5 bg-luxury-dark overflow-hidden relative">
        <div className="flex gap-16 items-center whitespace-nowrap animate-marquee opacity-60 hover:opacity-100 transition-opacity duration-500">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center">
              <span className="text-2xl font-serif italic">O Restaurante dos Artistas</span>
              <Star className="text-luxury-gold w-4 h-4" />
              <span className="text-2xl font-serif italic">40+ Anos de Tradição</span>
              <Star className="text-luxury-gold w-4 h-4" />
              <span className="text-2xl font-serif italic">Rua Avanhandava</span>
              <Star className="text-luxury-gold w-4 h-4" />
              <span className="text-2xl font-serif italic">Culinária Italiana Clássica</span>
              <Star className="text-luxury-gold w-4 h-4" />
              <span className="text-2xl font-serif italic">Buffet de Antepastos</span>
              <Star className="text-luxury-gold w-4 h-4" />
            </div>
          ))}
        </div>
      </div>

      {/* DIFFERENTIALS (BENTO GRID) */}
      <section id="experiência" className="py-24 px-6 max-w-7xl mx-auto reveal-section">
        <div className="text-center mb-16">
          <span className="text-luxury-gold uppercase tracking-widest text-xs font-bold">Nossa Essência</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6">Uma Experiência Única</h2>
          <div className="w-24 h-[1px] bg-luxury-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bento-grid h-auto md:h-[800px]">
          {/* Main Feature - Large */}
          <div className="bento-item md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2940&auto=format&fit=crop" 
              alt="Rua Avanhandava" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-3xl font-serif mb-2">A Mágica Rua Avanhandava</h3>
              <p className="text-gray-300 font-light">
                Uma experiência cenográfica que transporta você diretamente para as vilas europeias. 
                Iluminação charmosa, fontes e música ao vivo criam o cenário perfeito.
              </p>
            </div>
          </div>

          {/* Feature 2 - Antepastos */}
          <div className="bento-item relative group overflow-hidden rounded-2xl bg-luxury-dark border border-white/5">
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
              <Utensils className="text-luxury-gold w-10 h-10" />
              <div>
                <h3 className="text-2xl font-serif mb-2">Buffet de Antepastos</h3>
                <p className="text-gray-400 text-sm">
                  Mais de 100 variedades de queijos, embutidos e conservas. O pioneiro buffet por quilo de alto padrão.
                </p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark to-black opacity-90 z-0" />
            <img 
              src="https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=2940&auto=format&fit=crop" 
              alt="Antepastos" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Feature 3 - Vinhos */}
          <div className="bento-item relative group overflow-hidden rounded-2xl bg-luxury-dark border border-white/5">
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
              <Wine className="text-luxury-gold w-10 h-10" />
              <div>
                <h3 className="text-2xl font-serif mb-2">Adega Exclusiva</h3>
                <p className="text-gray-400 text-sm">
                  Uma seleção rigorosa de vinhos italianos e internacionais para harmonizar perfeitamente com sua refeição.
                </p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark to-black opacity-90 z-0" />
             <img 
              src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop" 
              alt="Vinhos" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Feature 4 - Fartura */}
          <div className="bento-item md:col-span-3 relative group overflow-hidden rounded-2xl h-64">
            <img 
              src="https://images.unsplash.com/photo-1551183053-bf91b1d3116c?q=80&w=2940&auto=format&fit=crop" 
              alt="Pratos Fartos" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/60 p-8 flex items-center justify-between">
              <div className="max-w-2xl">
                <h3 className="text-3xl font-serif mb-2">Fartura para Compartilhar</h3>
                <p className="text-gray-300 font-light">
                  Nossas famosas travessas são servidas com generosidade, ideais para reunir a família e amigos em volta da mesa, como manda a tradição italiana.
                </p>
              </div>
              <button className="hidden md:flex items-center gap-2 text-luxury-gold uppercase tracking-widest text-sm font-bold hover:text-white transition-colors">
                Ver Pratos <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / HISTORY */}
      <section id="história" className="py-24 bg-luxury-dark reveal-section">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-luxury-gold/30" />
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2874&auto=format&fit=crop" 
              alt="Interior Restaurante" 
              className="w-full rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-luxury-gold/30" />
          </div>
          
          <div>
            <span className="text-luxury-gold uppercase tracking-widest text-xs font-bold">Nossa História</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 leading-tight">
              O Restaurante dos <span className="italic text-luxury-gold">Artistas</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6 font-light text-lg">
              Inaugurada em 1980 por Walter Mancini, a Trattoria não é apenas um restaurante, é um pedaço da história de São Paulo. 
              Com paredes adornadas por centenas de fotos de celebridades e garrafas de Chianti, cada canto conta uma história.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8 font-light text-lg">
              Fomos pioneiros na revitalização do centro, transformando a Rua Avanhandava em um polo gastronômico e turístico seguro e encantador.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-3xl font-serif text-white mb-1">1980</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Ano de Fundação</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-white mb-1">100+</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Tipos de Antepastos</p>
              </div>
            </div>

            <button className="text-white border-b border-luxury-gold pb-1 hover:text-luxury-gold transition-colors">
              Ler história completa
            </button>
          </div>
        </div>
      </section>

      {/* MENU HIGHLIGHTS */}
      <section id="cardápio" className="py-24 px-6 max-w-7xl mx-auto reveal-section">
        <div className="text-center mb-16">
          <span className="text-luxury-gold uppercase tracking-widest text-xs font-bold">Gastronomia</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6">Clássicos da Casa</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Lasanha à Bolonhesa",
              desc: "Massa fresca artesanal, molho bolonhesa rico cozido lentamente, bechamel cremoso e parmesão gratinado.",
              price: "Para compartilhar",
              image: "https://guiadacozinha.com.br/wp-content/uploads/2014/01/lasanha-bolonhesa-na-pressao.jpg"
            },
            {
              title: "Filé à Parmegiana",
              desc: "O clássico dos clássicos. Filé mignon empanado crocante, molho de tomate caseiro e muito queijo derretido.",
              price: "O mais pedido",
              image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2940&auto=format&fit=crop"
            },
            {
              title: "Perna de Cabrito",
              desc: "Assada lentamente ao forno com ervas finas, acompanhada de brócolis ao alho e óleo e batatas coradas.",
              price: "Especialidade",
              image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2938&auto=format&fit=crop"
            }
          ].map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl mb-6 relative aspect-[4/3]">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-luxury-gold uppercase tracking-wider border border-luxury-gold/20">
                  {item.price}
                </div>
              </div>
              <h3 className="text-2xl font-serif mb-2 group-hover:text-luxury-gold transition-colors">{item.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="px-10 py-4 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all duration-300 uppercase tracking-widest font-bold text-sm">
            Ver Cardápio Completo
          </button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="depoimentos" className="py-24 bg-luxury-dark relative overflow-hidden reveal-section">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8 text-luxury-gold">
            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-6 h-6" />)}
          </div>
          
          <h2 className="text-3xl md:text-5xl font-serif italic leading-tight mb-10">
            "Uma joia de São Paulo. A comida é espetacular, mas a atmosfera da Rua Avanhandava é o que torna a experiência inesquecível."
          </h2>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop" alt="Cliente" referrerPolicy="no-referrer" />
            </div>
            <div className="text-left">
              <p className="font-bold text-white">Roberto Almeida</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Crítico Gastronômico</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-black pt-20 pb-10 border-t border-white/5 reveal-section overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
             <img src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2940&auto=format&fit=crop" alt="Texture" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-tighter text-white block mb-6">
              FAMIGLIA <span className="text-luxury-gold">MANCINI</span>
            </span>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Tradição, fartura e a verdadeira alma italiana no coração de São Paulo desde 1980.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contato</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-luxury-gold shrink-0" />
                <span>Rua Avanhandava, 81<br />Bela Vista, São Paulo - SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-luxury-gold shrink-0" />
                <span>(11) 3256-4320</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Horários</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-luxury-gold shrink-0" />
                <div>
                  <p><span className="text-white">Seg - Qua:</span> 11:30 - 23:00</p>
                  <p><span className="text-white">Qui - Sáb:</span> 11:30 - 00:00</p>
                  <p><span className="text-white">Dom:</span> 11:30 - 23:00</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Links Rápidos</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Reservas</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Menu Completo</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Eventos</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Trabalhe Conosco</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © 2026 Restaurante Famiglia Mancini Trattoria. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-gray-600 text-xs">
            <a href="#" className="hover:text-gray-400">Privacidade</a>
            <a href="#" className="hover:text-gray-400">Termos</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
