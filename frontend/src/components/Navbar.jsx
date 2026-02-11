import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Languages, Code2 } from 'lucide-react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  const toggleLang = () => {
    const newLang = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-card/90 backdrop-blur-md border-b border-primary-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
     <a href="#" className="flex items-center group">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" 
          />
        </a>
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600 dark:text-slate-300">
          {['home', 'projects', 'about', 'skills', 'contact'].map((item) => (
            <a key={item} href={`#${item}`} className="hover:text-primary-500 transition-colors cursor-pointer">
              {t(`nav.${item}`)} 
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          
          <button onClick={toggleLang} className="p-2 rounded-full hover:bg-primary-100 dark:hover:bg-slate-700 transition-colors text-primary-500">
            <div className="flex items-center gap-1 font-bold text-sm">
              <Languages size={20} />
              <span>{i18n.language.toUpperCase()}</span>
            </div>
          </button>

          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-primary-100 dark:bg-slate-700 text-primary-500 dark:text-yellow-400 hover:scale-110 transition-transform shadow-sm"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}