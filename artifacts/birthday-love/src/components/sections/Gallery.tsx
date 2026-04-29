import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Using the generated images
import img1 from "../../assets/gallery/sunset-silhouettes.png";
import img2 from "../../assets/gallery/candlelit-dinner.png";
import img3 from "../../assets/gallery/rose-petals.png";
import img4 from "../../assets/gallery/fairy-lights.png";
import img5 from "../../assets/gallery/beach-sunset.png";
import img6 from "../../assets/gallery/hand-in-hand.png";
import img7 from "../../assets/gallery/roses-bouquet.png";
import img8 from "../../assets/gallery/polaroid.png";
import img9 from "../../assets/gallery/starry-night.png";
import img10 from "../../assets/gallery/picnic.png";

const images = [
  { src: img1, alt: "Sunset Silhouettes" },
  { src: img2, alt: "Candlelit Dinner" },
  { src: img3, alt: "Rose Petals" },
  { src: img4, alt: "Fairy Lights" },
  { src: img5, alt: "Beach Sunset" },
  { src: img6, alt: "Hand in Hand" },
  { src: img7, alt: "Roses Bouquet" },
  { src: img8, alt: "Polaroid" },
  { src: img9, alt: "Starry Night" },
  { src: img10, alt: "Picnic" },
];

export const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-6xl text-primary font-bold mb-4 text-glow" style={{ fontFamily: 'var(--font-serif)' }}>
          Our Beautiful Moments
        </h2>
        <p className="text-lg text-muted-foreground font-serif">Every picture tells a story of us.</p>
      </motion.div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl"
            onClick={() => setSelectedImg(img.src)}
          >
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 MixBlendMode-overlay" />
            <img 
              src={img.src} 
              alt={img.alt} 
              className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-500 rounded-xl"
              loading="lazy"
            />
            <div className="absolute inset-0 ring-2 ring-primary/0 group-hover:ring-primary/50 rounded-xl transition-all duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors bg-black/50 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImg(null);
              }}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              src={selectedImg}
              alt="Selected"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl shadow-primary/20 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
