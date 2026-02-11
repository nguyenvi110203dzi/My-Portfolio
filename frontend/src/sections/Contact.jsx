import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone, Send, Loader2, Facebook, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        alert("Đã gửi tin nhắn thành công! Vi sẽ sớm trả lời bạn.");
      } else {
        setStatus('error');
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      }
    } catch (error) {
      setStatus('error');
      alert("Không kết nối được với Server. Hãy chắc chắn bạn đã chạy 'node server.js'");
    } finally {
      setStatus('idle');
    }
  };

  return (
    <section id="contact" className="min-h-[80vh] py-20 px-6 bg-white dark:bg-dark-bg transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">{t('contact.title')}</h2>
          <p className="text-slate-600 dark:text-slate-400">{t('contact.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="space-y-6">
                        <div className="flex items-center gap-4 p-6 bg-primary-50 dark:bg-slate-800 rounded-2xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-primary-500 shadow-sm"><Mail /></div>
              <div><p className="text-sm text-slate-500 dark:text-slate-400">{t('contact.info_email')}</p><p className="font-semibold text-slate-800 dark:text-white">tuvi0304.gl@gmail.com</p></div>
            </div>
                        <div className="flex items-center gap-4 p-6 bg-pink-50 dark:bg-slate-800 rounded-2xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-pink-500 shadow-sm"><Phone /></div>
              <div><p className="text-sm text-slate-500 dark:text-slate-400">{t('contact.info_phone')}</p><p className="font-semibold text-slate-800 dark:text-white">0348 958 193</p></div>
            </div>
                        <div className="flex items-center gap-4 p-6 bg-orange-50 dark:bg-slate-800 rounded-2xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-orange-500 shadow-sm"><MapPin /></div>
              <div><p className="text-sm text-slate-500 dark:text-slate-400">{t('contact.info_loc')}</p><p className="font-semibold text-slate-800 dark:text-white">Quận 8, TP. Hồ Chí Minh</p></div>
            </div>
            <div className="pt-4">
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4">Kết nối với mình:</h3>
              <div className="flex gap-4">
                                <a 
                  href="https://www.facebook.com/viiter1102" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-blue-50 dark:bg-slate-800 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-1"
                >
                  <Facebook size={24} />
                </a>

                <a 
                  href="https://github.com/nguyenvi110203dzi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white rounded-full hover:bg-slate-800 hover:text-white dark:hover:bg-white dark:hover:text-slate-800 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1"
                >
                  <Github size={24} />
                </a>

                <a 
                  href="https://www.linkedin.com/in/nguyễn-thị-tử-vi-8b4895399" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-blue-50 dark:bg-slate-800 text-blue-700 rounded-full hover:bg-blue-700 hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-1"
                >
                  <Linkedin size={24} />
                </a>

              </div>
            </div>

          </motion.div>

          <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.name')}</label>
                <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-400" placeholder="Nguyen Van A" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.email')}</label>
                <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-400" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.message')}</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-400" placeholder="Hello Vi..."></textarea>
              </div>

              <button disabled={status === 'sending'} type="submit" className="w-full py-4 bg-primary-500 text-white rounded-xl font-bold text-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30 disabled:opacity-50">
                {status === 'sending' ? <><Loader2 className="animate-spin" /> Sending...</> : <><Send size={20} /> {t('contact.btn_send')}</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}