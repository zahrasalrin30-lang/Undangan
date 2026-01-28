
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Music, Play, Heart, Calendar, Gift, MessageSquare, Menu, X } from 'lucide-react';
import { DEFAULT_WEDDING_DATA, supabase } from './constants';
import { Cover } from './components/Cover';
import VideoGreeting from './components/VideoGreeting';
import Intro from './components/Intro';
import Couple from './components/Couple';
import EventDetails from './components/EventDetails';
import Countdown from './components/Countdown';
import { Story } from './components/Story';
import Gallery from './components/Gallery';
import { GiftSection } from './components/GiftSection';
import RSVP from './components/RSVP';
import Footer from './components/Footer';

const preloadImages = async (srcs: string[]) => {
  const promises = srcs.map((src) => {
    return new Promise((resolve) => {
      if (!src) {
        resolve(true);
        return;
      }
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = resolve; 
    });
  });
  await Promise.all(promises);
};

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [weddingData, setWeddingData] = useState(DEFAULT_WEDDING_DATA);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const initApp = async () => {
      let finalData = DEFAULT_WEDDING_DATA;
      try {
        const params = new URLSearchParams(window.location.search);
        let slug = params.get('u');
        if (!slug) {
          const path = window.location.pathname.replace(/^\/|\/$/g, '');
          if (path && path !== 'index.html') slug = path;
        }
        const finalSlug = slug || 'ryan-zahra';
        const { data, error } = await supabase.from('wedding_config').select('content').eq('slug', finalSlug).single();
        if (data && data.content) {
          finalData = { ...DEFAULT_WEDDING_DATA, ...data.content };
          setWeddingData(finalData);
        }
      } catch (err) {
        console.warn("Menggunakan data default.");
      } 

      const coverImg = finalData.assets.images.coverPhoto || finalData.assets.images.coupleIntro;
      const priorityImages = [coverImg, finalData.assets.images.coupleIntro, finalData.assets.images.ornament];
      await Promise.all([preloadImages(priorityImages), new Promise(resolve => setTimeout(resolve, 2500))]);
      setIsLoading(false);
    };
    initApp();
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    // Timer dihapus agar Intro mengontrol animasinya sendiri saat terlihat di layar
  };

  const playMusic = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Autoplay audio gagal.");
      }
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Gagal memutar audio.");
      }
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsNavOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#F0F8FF] z-[10000] flex flex-col items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center space-y-8">
          <div className="relative">
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-24 h-24 rounded-full border border-dashed border-[#7AB2D3]/30" />
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-handwriting text-3xl text-[#7AB2D3]">{weddingData.groom.shortName[0]} & {weddingData.bride.shortName[0]}</span>
             </div>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#2A4365]/40 font-bold font-montserrat">Menyiapkan Undangan Anda</p>
            <div className="flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div key={i} animate={{ opacity: [0.1, 1, 0.1] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }} className="w-1.5 h-1.5 bg-[#7AB2D3] rounded-full" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-[#7AB2D3]/20">
      <audio ref={audioRef} loop preload="auto">
        <source src={weddingData.audioUrl} type="audio/mpeg" />
      </audio>

      <AnimatePresence mode="wait">
        {!isOpen && <Cover key="cover" onOpen={handleOpen} onPlayMusic={playMusic} weddingData={weddingData} />}
      </AnimatePresence>

      <div id="desk_cov">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.8, delay: 0.8, ease: "easeOut" }} className="max-w-md space-y-6">
          <p className="uppercase tracking-[0.6em] text-[10px] font-bold text-white/70">The Wedding Of</p>
          <h1 className="font-handwriting text-7xl text-white">{weddingData.groom.shortName} & {weddingData.bride.shortName}</h1>
          <p className="text-xs italic text-white/60 leading-relaxed font-serif px-8">"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri..."</p>
          <p className="font-bold text-[#7AB2D3] text-xs tracking-widest uppercase">(Qs. Ar. Rum : 21)</p>
        </motion.div>
      </div>

      <div id="isi" className="scroll-smooth">
        <VideoGreeting data={weddingData} isOpened={isOpen} />
        {/* Intro sekarang tidak butuh startAnimation prop, dia mendeteksi scroll sendiri */}
        <Intro data={weddingData} />
        <Couple data={weddingData} />
        <Countdown date={weddingData.countdownDate} />
        <EventDetails data={weddingData} />
        <Story data={weddingData} />
        <Gallery data={weddingData} />
        <GiftSection data={weddingData} />
        <RSVP data={weddingData} />
        <Footer data={weddingData} />

        <button onClick={toggleMusic} className="fixed bottom-24 right-6 z-[110] w-12 h-12 bg-white shadow-2xl rounded-full flex items-center justify-center border border-[#7AB2D3]/10 text-[#2A4365] hover:scale-110 active:scale-95 transition-all">
          {isPlaying ? <Music className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] md:hidden">
            <motion.nav
              layout
              initial={false}
              animate={{
                width: isNavOpen ? 'auto' : '48px',
                height: '48px',
                borderRadius: '50px',
                backgroundColor: isNavOpen ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.2)', 
                backdropFilter: "blur(8px)",
                boxShadow: isNavOpen ? "0 10px 30px rgba(42,67,101,0.2)" : "0 4px 12px rgba(0,0,0,0.1)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex items-center justify-center border border-white/20 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isNavOpen ? (
                  <motion.div key="menu-items" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }} className="flex items-center gap-1 px-2">
                    {[{ id: 'couple', icon: <Heart size={18} />, label: 'Couple' }, { id: 'event', icon: <Calendar size={18} />, label: 'Event' }, { id: 'gift', icon: <Gift size={18} />, label: 'Gift' }, { id: 'rsvp', icon: <MessageSquare size={18} />, label: 'RSVP' }].map((item) => (
                      <a key={item.id} href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)} className="p-3 text-[#2A4365]/60 hover:text-[#7AB2D3] hover:bg-[#7AB2D3]/10 rounded-full transition-all" aria-label={item.label}>{item.icon}</a>
                    ))}
                    <div className="w-[1px] h-4 bg-[#2A4365]/10 mx-1"></div>
                    <button onClick={() => setIsNavOpen(false)} className="p-2 ml-1 text-[#2A4365] bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><X size={16} /></button>
                  </motion.div>
                ) : (
                  <motion.button key="menu-btn" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }} onClick={() => setIsNavOpen(true)} className="w-12 h-12 flex items-center justify-center text-white drop-shadow-md"><Menu size={24} /></motion.button>
                )}
              </AnimatePresence>
            </motion.nav>
        </div>
      </div>
    </div>
  );
};
