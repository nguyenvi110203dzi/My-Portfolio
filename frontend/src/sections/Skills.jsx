import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout, Database, PenTool, Sparkles } from 'lucide-react';

export default function Skills() {
  const { t } = useTranslation();

  const skillGroups = [
    {
      title: t('skills.fe'),
      icon: <Layout size={24} />, 
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      tagBg: "bg-blue-100/50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200",
      skills: ["ReactJS", "JavaScript", "HTML5/CSS3", "Tailwind CSS", "Responsive Design"]
    },
    {
      title: t('skills.be'),
      icon: <Database size={24} />,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      tagBg: "bg-emerald-100/50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-200",
      skills: ["NodeJS", "MySQL", "Flutter (BLOC)", "RESTful API"]
    },
    {
      title: t('skills.tools'),
      icon: <PenTool size={24} />,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      tagBg: "bg-orange-100/50 dark:bg-orange-900/40 text-orange-700 dark:text-orange-200",
      skills: ["Git/GitHub", "Postman", "Figma (Basic)", "VS Code"]
    }
  ];

  const softSkills = t('about.soft', { returnObjects: true }) || [];

  return (
    <section id="skills" className="py-24 px-6 bg-slate-50 dark:bg-dark-bg transition-colors">
      <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
         <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {skillGroups.map((group, index) => (
            <motion.div 
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }} 
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${group.bg} ${group.color}`}>
                  {group.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  {group.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {group.skills.map(skill => (
                  <span 
                    key={skill} 
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-default ${group.tagBg}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 md:p-10 shadow-lg text-white overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 p-8 bg-black opacity-5 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex items-center gap-3 md:w-1/3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Sparkles size={24} className="text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold">{t('skills.soft')}</h3>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-3 md:w-2/3">
              {Array.isArray(softSkills) && softSkills.map((skill, idx) => (
                <motion.span 
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-medium text-sm hover:bg-white hover:text-indigo-600 transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}