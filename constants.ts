import { createClient } from '@supabase/supabase-js';

const BUCKET_URL = "https://pocaiiawtgclrzsypmoc.supabase.co/storage/v1/object/public/vintage9";

// Menggunakan Environment Variables standar Vite
const supabaseUrl = 'https://pocaiiawtgclrzsypmoc.supabase.co';
// Fix: Casting import.meta to any to resolve "Property 'env' does not exist" error and removing vite/client reference to resolve "Cannot find type definition file" error.
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'FALLBACK_KEY_ONLY_FOR_LOCAL';

export const supabase = createClient(supabaseUrl, supabaseKey);

const getAssetUrl = (folder: 'css' | 'image' | 'fonts' | 'js' | 'media', filename: string) => 
  `${BUCKET_URL}/${folder}/${filename}`;

export const DEFAULT_WEDDING_DATA = {
  assets: {
    baseUrl: BUCKET_URL,
    images: {
      ornament: getAssetUrl('image', 'VINTAGE-09-ORNAMEN2.webp'),
      flowerWhite: getAssetUrl('image', 'VINTAGE-09-BUNGA-W.webp'),
      flowerPink: getAssetUrl('image', 'VINTAGE-09-BUNGA-P.webp'),
      coverPhoto: "https://ik.imagekit.io/RyanZahra/Ryan&Zahra/KLD06802.jpg",
      coupleIntro: "https://ik.imagekit.io/RyanZahra/Ryan&Zahra/KLD06802.jpg",
      groomPhoto: "https://ik.imagekit.io/RyanZahra/Ryan&Zahra/KLD06746.jpg",
      bridePhoto: "https://ik.imagekit.io/RyanZahra/Ryan&Zahra/KLD06626.jpg",
      footerPhoto: "https://ik.imagekit.io/RyanZahra/Ryan&Zahra/KLD07130.jpg",
      countdownPhoto: "https://ik.imagekit.io/RyanZahra/Ryan&Zahra/KLD06802.jpg",
    },
    audio: "https://ik.imagekit.io/RyanZahra/Ryan&Zahra/Melodi%20Bambu%20yang%20Tenang.mp3",
    video: "https://hi.nikustory.id/wp-content/uploads/2025/09/VINTG09-V2-PII.mp4"
  },
  groom: {
    name: "Rahmad Ryansyah",
    shortName: "Ryan",
    father: "Bapak Kamsin",
    mother: "Ibu Tentrem",
    ig: "",
  },
  bride: {
    name: "Zahratul Maula",
    shortName: "Zahra",
    father: "(Alm) Bapak Asrin Kasim",
    mother: "Ibu Salmi",
    ig: "",
  },
  akad: {
    day: "Minggu",
    date: "08 Februari 2026",
    time: "09:00 - 16:00 WIB",
    location: "Jl. Jakarta",
    address: "Jl. Jakarta Gg Imam Karti Blok 1",
    mapUrl: "https://maps.app.goo.gl/zTbbJSo3ouGHJAkGA"
  },
  resepsi: {
    day: "Minggu",
    date: "08 Februari 2026",
    time: "11:00 - 16:00 WIB",
    location: "Jl. Jakarta",
    address: "Jl. Jakarta Gg Imam Karti Blok 1",
    mapUrl: "https://maps.app.goo.gl/zTbbJSo3ouGHJAkGA"
  },
  countdownDate: "2026-02-08T09:00:00",
  audioUrl: "https://ik.imagekit.io/RyanZahra/Ryan&Zahra/Melodi%20Bambu%20yang%20Tenang.mp3",
  gift: [
    {
      bank: "Bank Kaltim",
      number: "5141889424",
      owner: "Zahratul Maula",
      logo: getAssetUrl('image', 'BCA_logo_Bank_Central_Asia-1-3-5-1-scaled.png')
    },
    {
      bank: "DANA",
      number: "081227623117",
      owner: "Zahratul Maula",
      logo: getAssetUrl('image', '1200px-Logo_dana_blue.svg-1-1-1-3.png')
    }
  ],
  giftAddress: {
    recipient: "Zahra / Ryan",
    phone: "082148066242",
    address: "Jl. Jakarta Gg Imam karti Blok 1"
  },
  gallery: [
    "https://inv.punakawandigital.id/wp-content/uploads/2025/09/25TB014-1.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2025/09/25TB014-2.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2025/09/25TB014-3.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2025/09/25TB014-4.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2025/09/25TB014-6.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2025/09/25TB014-7.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2025/09/25TB014-8.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2025/09/25TB014-9.jpg",
  ],
  story: [
    { 
      title: "Awal Cerita", 
      content: "Pertemuan kami berawal dari momen sederhana yang tak terduga, membawa kami pada pengenalan yang lebih dalam.",
      image: "https://inv.punakawandigital.id/wp-content/uploads/2025/09/25TB014-1.jpg"
    },
    { 
      title: "Lamaran", 
      content: "Kami memutuskan untuk melangkah ke jenjang yang lebih serius dengan restu kedua orang tua.",
      image: "https://inv.punakawandigital.id/wp-content/uploads/2025/09/25TB014-2.jpg"
    },
    { 
      title: "Harapan", 
      content: "Semoga pernikahan ini menjadi awal dari keluarga yang Sakinah, Mawaddah, dan Warahmah.",
      image: "https://inv.punakawandigital.id/wp-content/uploads/2025/09/25TB014-3.jpg"
    }
  ],
  invitationTo: "Nama Tamu"
};

export const WEDDING_DATA = DEFAULT_WEDDING_DATA;