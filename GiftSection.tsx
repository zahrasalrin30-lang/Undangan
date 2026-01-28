
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Check, Heart } from 'lucide-react';

const Sparkles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute w-2 h-2 text-[#d4af37]/30"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%", 
            scale: 0,
            opacity: 0 
          }}
          animate={{
            y: ["0%", "-15%", "0%"],
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        >
          <path fill="currentColor" d="M12,2L14.39,8.26L21,9.27L16.13,13.74L17.27,20.3L12,17.1L6.73,20.3L7.87,13.74L3,9.27L9.61,8.26L12,2Z" />
        </motion.svg>
      ))}
    </div>
  );
};

const DecorativeDivider = () => (
  <svg viewBox="0 0 100 20" className="w-24 h-auto text-[#d4af37]/30 mx-auto my-4">
    <path d="M0 10 Q 25 0, 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const GiftSection: React.FC<{ data: any }> = ({ data }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const giftAddress = data.giftAddress || {
    recipient: "Kedua Mempelai",
    phone: "-",
    address: "Alamat belum diatur"
  };

  return (
    <section id="gift" className="py-24 px-6 bg-[#fcfbf7] text-center relative overflow-hidden">
      {/* Background Ornament */}
      <div className="absolute top-0 left-0 w-64 opacity-[0.03] pointer-events-none">
        <img src={data.assets.images.ornament} alt="" className="w-full" />
      </div>

      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="flex justify-center mb-4">
            <div className="p-5 bg-white rounded-full shadow-xl border border-[#d4af37]/10 relative group">
              <Gift size={36} className="text-[#d4af37] transform group-hover:rotate-12 transition-transform duration-500" />
              <div className="absolute -inset-1 border border-[#d4af37]/20 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          <h2 className="font-handwriting text-6xl text-[#d4af37]">Kado Pernikahan</h2>
          <DecorativeDivider />
          <p className="font-serif italic text-sm text-[#4a3a2a]/60 max-w-xl mx-auto leading-relaxed">
            Doa restu Anda merupakan kado terindah bagi kami. Namun, jika Anda ingin mengirimkan tanda kasih, dapat melalui pilihan di bawah ini:
          </p>
        </motion.div>

        {/* Gift Cards Grid/Columns */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <Sparkles />
          {data.gift.map((item: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="group relative bg-white p-8 md:p-10 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#d4af37]/10 flex flex-col items-center justify-between space-y-8 overflow-hidden transition-all duration-500 hover:shadow-[#d4af37]/10 hover:-translate-y-2"
            >
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#d4af37]/5 to-transparent rounded-bl-[60px]"></div>
              
              <div className="w-full space-y-8 relative z-10">
                <div className="h-14 flex items-center justify-center">
                  <img 
                    src={item.logo} 
                    alt={item.bank} 
                    className="h-full object-contain transition-all duration-500 group-hover:scale-110" 
                  />
                </div>
                
                <div className="space-y-3">
                  <p className="text-2xl md:text-3xl font-bold font-serif tracking-widest text-[#4a3a2a]">
                    {item.number}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-[0.5px] w-6 bg-[#d4af37]/30"></div>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4af37] font-montserrat">
                      a.n {item.owner}
                    </p>
                    <div className="h-[0.5px] w-6 bg-[#d4af37]/30"></div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleCopy(item.number, idx)}
                className={`relative z-10 w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-500 overflow-hidden shadow-lg ${
                  copiedIdx === idx 
                  ? 'bg-green-500 text-white shadow-green-200' 
                  : 'bg-[#4a3a2a] text-white hover:bg-[#d4af37] shadow-[#4a3a2a]/20'
                }`}
              >
                {copiedIdx === idx ? <Check size={16} /> : <Copy size={16} />}
                {copiedIdx === idx ? "Berhasil Disalin" : "Salin Rekening"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Physical Gift Address Section as a full-width column card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative group p-1 md:p-1 rounded-[52px] bg-gradient-to-r from-[#d4af37]/10 via-transparent to-[#d4af37]/10"
        >
          <div className="bg-white p-10 md:p-12 rounded-[50px] border border-dashed border-[#d4af37]/30 shadow-sm space-y-8">
            <div className="flex flex-col items-center gap-3 text-[#d4af37]">
              <Heart size={24} fill="currentColor" className="animate-pulse" />
              <h3 className="font-serif font-bold text-2xl tracking-wide text-[#4a3a2a] italic">Kirim Kado Fisik</h3>
              <div className="w-16 h-[0.5px] bg-[#d4af37]/30"></div>
            </div>
            
            <div className="space-y-4 font-serif">
              <div className="space-y-1">
                <p className="text-xl font-bold text-[#4a3a2a]">{giftAddress.recipient}</p>
                <div className="flex items-center justify-center gap-2 text-[#4a3a2a]/40 text-[10px] uppercase tracking-widest font-bold">
                  <span>Penerima Paket</span>
                </div>
              </div>
              
              <div className="relative inline-block px-6 py-4 bg-[#fcfbf7] rounded-3xl border border-[#d4af37]/5 max-w-md mx-auto">
                <p className="text-sm text-[#4a3a2a]/70 leading-relaxed italic">
                  {giftAddress.address}<br />
                  Telp: {giftAddress.phone}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Signature Flowers at the bottom */}
      <div className="absolute bottom-[-10%] right-[-5%] w-72 opacity-[0.08] pointer-events-none rotate-12">
        <img src={data.assets.images.flowerPink} alt="" />
      </div>
    </section>
  );
};

export default GiftSection;
