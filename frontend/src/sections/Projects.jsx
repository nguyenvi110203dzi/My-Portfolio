import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github, Code2 } from 'lucide-react';

const API_URL = "https://my-portfolio-go8i.onrender.com"; 
export default function Projects() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/projects`) 
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Lỗi tải dự án:", err));
  }, []);

  return (
    <section id="projects" className="min-h-screen py-20 px-6 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            {t('projects.subtitle')}
          </p>
        </motion.div>
        {projects.length === 0 && (
            <p className="text-center text-slate-400">Đang tải dự án từ Server...</p>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-700 flex flex-col"
            >
              <div className="h-48 rounded-2xl overflow-hidden mb-6 border border-slate-200 dark:border-slate-600 bg-white">
                {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500">
                        <Code2 size={40} />
                    </div>
                )}
              </div>

              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 line-clamp-1">
                {project.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow line-clamp-3 text-sm">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech && project.tech.split(',').map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-full border border-slate-200 dark:border-slate-600">
                    {tag.trim()}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700 mt-auto">
                                {project.gitUrl && (
                  <a 
                    href={project.gitUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-900 transition-colors text-sm font-medium dark:bg-white dark:text-slate-900"
                  >
                    <Github size={18} /> Code
                  </a>
                )}
                {project.demoUrl && project.demoUrl !== "" && (
                  <a 
                    href={project.demoUrl}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors text-sm font-medium dark:bg-slate-700 dark:text-white"
                  >
                    <ExternalLink size={18} /> Demo
                  </a>
                )}

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}