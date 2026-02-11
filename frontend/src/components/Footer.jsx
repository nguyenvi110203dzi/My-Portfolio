import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 py-16 px-6 text-center transition-colors">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {t('footer.title')}
        </h2>
        
        <p className="text-slate-400 text-lg">
          {t('footer.subtitle')}
        </p>

        <p className="text-slate-500 text-sm pt-8 mt-8 border-t border-slate-800">
          {t('footer.copyright')}
        </p>

      </div>
    </footer>
  );
}