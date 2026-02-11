import { useState } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight, Heart, FileText, X } from 'lucide-react';
import avatarImg from '../assets/avatar.jpg';

export default function Hero() {
  const { t } = useTranslation();
  
  const [showCV, setShowCV] = useState(false);

  return (
    <section id="home" className="min-h-[90vh] flex items-center justify-center pt-20 relative overflow-hidden">
      
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 right-10 w-20 h-20 bg-primary-200 rounded-full blur-xl opacity-50"/>
      <motion.div animate={{ y: [0, 30, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 left-10 w-32 h-32 bg-pink-200 rounded-full blur-xl opacity-40"/>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-2 text-primary-500 font-bold mb-4 bg-primary-100 w-fit px-4 py-1 rounded-full">
            <Sparkles size={18} /> <span>{t('hero.role')}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-white leading-tight mb-6">{t('hero.greeting')}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-lg leading-relaxed">{t('hero.desc')}</p>

          <div className="flex flex-wrap gap-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#projects" className="px-6 py-3 bg-primary-500 text-white rounded-full font-medium shadow-lg flex items-center gap-2 hover:bg-primary-600 transition-colors">
              {t('hero.btn_projects')} <ArrowRight size={20} />
            </motion.a>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCV(true)} 
              className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium shadow-lg flex items-center gap-2 hover:bg-orange-600 transition-colors"
            >
              <FileText size={20} /> {t('hero.btn_cv')}
            </motion.button>
            
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#contact" className="px-6 py-3 bg-white text-slate-700 border-2 border-slate-100 rounded-full font-medium flex items-center gap-2 hover:border-primary-200 hover:text-primary-500 transition-colors dark:bg-dark-card dark:border-slate-700 dark:text-white">
              {t('hero.btn_contact')} <Heart size={20} className="text-pink-400" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative flex justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-200 to-pink-200 rounded-full blur-2xl opacity-60 animate-pulse"></div>
          <div className="relative w-80 h-80 md:w-96 md:h-96 bg-white dark:bg-slate-800 p-4 rounded-full border-4 border-white/50 shadow-2xl overflow-hidden">
           <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-500"/>
          </div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -bottom-4 right-10 bg-white dark:bg-slate-700 p-3 rounded-2xl shadow-lg">
            <span className="text-2xl">👩‍💻</span>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showCV && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowCV(false)}>
            
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="flex justify-between items-center p-4 border-b bg-slate-50 dark:bg-slate-800">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">CV - Nguyễn Thị Tử Vi</h3>
                <button onClick={() => setShowCV(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                  <X size={24} className="text-slate-500 dark:text-slate-300"/>
                </button>
              </div>

              <iframe 
                src="/cv.pdf" 
                className="w-full flex-grow" 
                title="CV Preview"
              ></iframe>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}