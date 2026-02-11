import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { User, GraduationCap, Heart, CheckCircle2, BookOpen } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  const softSkills = t('about.soft', { returnObjects: true });
  const softSkillsList = Array.isArray(softSkills) ? softSkills : [];

  return (
    <section id="about" className="py-20 px-6 bg-white dark:bg-dark-card transition-colors">
      <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-800 dark:text-white mb-4"
          >
            {t('about.title')}
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
                    <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 h-full">
              <div className="flex items-center gap-3 mb-4 text-primary-500">
                <User size={28} />
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{t('about.bio_title')}</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {t('about.bio_desc')}
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-6 text-blue-600 dark:text-blue-400">
                <GraduationCap size={28} />
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{t('about.edu_title')}</h3>
              </div>
              
              <div className="flex gap-4 items-start">
                 <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-blue-500">
                   <BookOpen size={24} />
                 </div>
                 <div>
                   <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                     {t('about.edu_school')}
                   </h4>
                   <p className="text-slate-600 dark:text-slate-300 mt-1">
                     {t('about.edu_major')}
                   </p>
                 </div>
              </div>
            </div>

             <div className="bg-pink-50 dark:bg-pink-900/20 p-8 rounded-3xl border border-pink-100 dark:border-pink-800">
               <div className="flex items-center gap-3 mb-6 text-pink-500">
                 <Heart size={28} />
                 <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{t('about.act_title')}</h3>
               </div>
               
               <div className="mb-6">
                 <h4 className="font-bold text-lg text-slate-800 dark:text-white mb-2">{t('about.act_role')}</h4>
                 <p className="text-slate-600 dark:text-slate-300">{t('about.act_desc')}</p>
               </div>
               
               <div className="pt-4 border-t border-pink-200 dark:border-pink-800">
                 <p className="font-medium text-pink-700 dark:text-pink-300 italic">
                   {t('about.hobbies')}
                 </p>
               </div>
             </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}