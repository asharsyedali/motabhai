import React, { useState } from "react";
import { Search, Heart, X, Sparkles, Image as ImageIcon, MessageSquare } from "lucide-react";
import { memeGalleryData, MemeItem } from "../data/aqdasData";
import { playClick, playNotification } from "../utils/audio";

interface MemeGalleryProps {
  isDarkMode: boolean;
}

export const MemeGallery: React.FC<MemeGalleryProps> = ({ isDarkMode }) => {
  const [memes, setMemes] = useState<MemeItem[]>(memeGalleryData);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxMeme, setLightboxMeme] = useState<MemeItem | null>(null);

  const categories = ["All", "Overthinking", "Sleep", "Literature", "Snacks", "Gaming"];

  // Handle Likes
  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playNotification();
    setMemes((prev) =>
      prev.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
    // If lightbox is open, update lightbox state as well
    if (lightboxMeme && lightboxMeme.id === id) {
      setLightboxMeme((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
    }
  };

  const filteredMemes = selectedCategory === "All"
    ? memes
    : memes.filter((m) => m.category === selectedCategory);

  return (
    <div className="space-y-8" id="meme-gallery-section">
      {/* Header */}
      <div className="border-b border-slate-100 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest flex items-center gap-2 font-bold">
            <ImageIcon className="w-4 h-4 text-indigo-500" /> Visual Archives
          </span>
          <h1 className="text-4xl font-sans font-black tracking-tight mt-2 text-slate-900">
            The Meme Archival Gallery
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Carefully curated historic photographic proof of Aqdas' dramatic everyday accomplishments.
          </p>
        </div>

        {/* Categories filters */}
        <div className="flex flex-wrap gap-1.5 bg-slate-50 border border-slate-200/80 p-1.5 rounded-2xl shadow-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pinterest-Style Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6" id="meme-masonry-grid">
        {filteredMemes.map((m) => (
          <div
            key={m.id}
            onClick={() => {
              playClick();
              setLightboxMeme(m);
            }}
            className="break-inside-avoid group rounded-3xl border border-slate-200 bg-white overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Visual Frame */}
            <div className="relative overflow-hidden aspect-video sm:aspect-auto">
              <img
                src={m.imageUrl}
                alt={m.title}
                referrerPolicy="no-referrer"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs font-mono text-purple-600 bg-white/95 border border-purple-200 px-2.5 py-1 rounded-xl shadow-md font-bold">
                  Click to Expand
                </span>
              </div>
            </div>

            {/* Captions Frame */}
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-100/50 px-2.5 py-0.5 rounded-full uppercase font-bold">
                  {m.category}
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-bold">ID: {m.id}</span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                {m.title}
              </h3>
              <p className="text-xs text-slate-600 italic line-clamp-2 font-medium">
                "{m.caption}"
              </p>

              {/* Interaction row */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-xs">
                <button
                  onClick={(e) => handleLike(m.id, e)}
                  className="flex items-center gap-1.5 text-pink-600 hover:text-pink-500 transition-colors font-mono font-bold cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-pink-500/10" /> {m.likes}
                </button>
                <div className="flex items-center gap-1.5 text-slate-500 font-mono font-bold">
                  <MessageSquare className="w-3.5 h-3.5" /> {Math.floor(m.likes / 5)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal Overlay */}
      {lightboxMeme && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/40 animate-fade-in"
          onClick={() => setLightboxMeme(null)}
          id="meme-lightbox-overlay"
        >
          <div
            className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
            id="meme-lightbox-container"
          >
            {/* Close trigger button */}
            <button
              onClick={() => setLightboxMeme(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-slate-800 cursor-pointer transition-transform hover:scale-105 shadow-md font-bold"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Expanded Content image */}
            <div className="w-full h-auto max-h-[380px] bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
              <img
                src={lightboxMeme.imageUrl}
                alt={lightboxMeme.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[380px] object-contain"
              />
            </div>

            {/* Expanded Captions */}
            <div className="p-6 space-y-4 text-slate-900">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-xl uppercase font-bold">
                  Category: {lightboxMeme.category}
                </span>
                <span className="text-xs font-mono text-slate-400 font-bold">Archive Node: {lightboxMeme.id}</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" /> {lightboxMeme.title}
              </h2>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-sm text-slate-800 italic border-l-4 border-indigo-500 pl-3 py-1 font-serif font-semibold">
                  "{lightboxMeme.caption}"
                </p>
              </div>

              {/* Likes/Comments bar */}
              <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                <button
                  onClick={(e) => handleLike(lightboxMeme.id, e)}
                  className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 transition-colors font-mono text-xs font-black cursor-pointer shadow-sm"
                >
                  <Heart className="w-4 h-4 fill-pink-500/10 text-pink-600" /> Like Meme ({lightboxMeme.likes})
                </button>
                <div className="text-xs text-slate-500 font-mono font-bold">
                  Verified by the Aqdas Department of Symbolism
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
