import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Folder, LogOut, Plus, User, Edit3, Image as ImageIcon, Github, ExternalLink, FileText, Trash2, Save, UploadCloud } from 'lucide-react';


const API_URL = "https://my-portfolio-go8i.onrender.com"; 

export default function AdminProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) navigate('/login');
    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects`); // 👇 Dùng API_URL
      setProjects(await res.json());
    } catch (error) { console.error(error); }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: formData }); 
      const data = await res.json();
      if (data.url) setSelectedProject(prev => ({ ...prev, image: data.url }));
    } catch (error) { alert("Lỗi upload ảnh!"); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;
    setLoading(true);
    const method = selectedProject.id ? 'PUT' : 'POST';
    const url = selectedProject.id ? `${API_URL}/projects/${selectedProject.id}` : `${API_URL}/projects`; 

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedProject)
      });
      await fetchProjects();
      alert("Thành công!");
      if (!selectedProject.id) handleCreateNew();
    } catch (error) { alert("Lỗi lưu dữ liệu!"); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(window.confirm("Xóa thật không?")) {
      await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' }); 
      fetchProjects();
      if(selectedProject?.id === id) setSelectedProject(null);
    }
  };

  const handleCreateNew = () => setSelectedProject({ title: '', tech: '', image: '', description: '', gitUrl: '', demoUrl: '' });

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 font-bold text-xl text-blue-600">Admin Panel</div>
        <nav className="flex-1 px-4 mt-4"><div className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-bold"><Folder size={20}/> Quản Lý Dự Án</div></nav>
        <div className="p-4"><button onClick={() => {localStorage.removeItem('isAdmin'); navigate('/login')}} className="flex items-center gap-2 text-red-500 hover:bg-red-50 w-full p-3 rounded-lg"><LogOut size={20}/> Đăng xuất</button></div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 flex-1 overflow-auto flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-4 border-b flex justify-between items-center"><h2 className="font-bold">Danh sách dự án</h2><button onClick={handleCreateNew} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm flex gap-1 items-center"><Plus size={16}/> Thêm mới</button></div>
             <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 border-b"><tr><th className="p-4">Tên</th><th className="p-4">Công nghệ</th><th className="p-4 w-10">Sửa</th></tr></thead>
               <tbody>
                 {projects.map(p => (
                   <tr key={p.id} onClick={() => setSelectedProject(p)} className={`cursor-pointer hover:bg-slate-50 ${selectedProject?.id === p.id ? 'bg-blue-50' : ''}`}>
                     <td className="p-4 font-medium">{p.title}</td>
                     <td className="p-4 text-slate-500">{p.tech}</td>
                     <td className="p-4 text-blue-600"><Edit3 size={16}/></td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>

          <div className="w-full lg:w-96 bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit overflow-y-auto">
             <h3 className="font-bold text-lg mb-4">{selectedProject ? 'Chỉnh Sửa' : 'Thêm Mới'}</h3>
             {selectedProject ? (
               <form onSubmit={handleSave} className="space-y-3">
                 <div><label className="text-xs font-bold text-slate-500">TÊN DỰ ÁN</label><input required className="w-full border p-2 rounded-lg text-sm" value={selectedProject.title} onChange={e => setSelectedProject({...selectedProject, title: e.target.value})} /></div>
                 <div><label className="text-xs font-bold text-slate-500">CÔNG NGHỆ</label><input className="w-full border p-2 rounded-lg text-sm" value={selectedProject.tech} onChange={e => setSelectedProject({...selectedProject, tech: e.target.value})} /></div>
                 
                 <div>
                    <label className="text-xs font-bold text-slate-500">HÌNH ẢNH</label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center relative hover:bg-slate-50 cursor-pointer">
                      <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer"/>
                      {selectedProject.image ? <img src={selectedProject.image} className="h-24 mx-auto object-contain"/> : <div className="text-slate-400"><UploadCloud className="mx-auto mb-1"/>Chọn ảnh</div>}
                    </div>
                 </div>

                 <div><label className="text-xs font-bold text-slate-500">MÔ TẢ</label><textarea className="w-full border p-2 rounded-lg text-sm" rows="3" value={selectedProject.description || ''} onChange={e => setSelectedProject({...selectedProject, description: e.target.value})} /></div>
                 <div className="grid grid-cols-2 gap-2">
                   <div><label className="text-xs font-bold text-slate-500">GITHUB</label><input className="w-full border p-2 rounded-lg text-sm" value={selectedProject.gitUrl || ''} onChange={e => setSelectedProject({...selectedProject, gitUrl: e.target.value})} /></div>
                   <div><label className="text-xs font-bold text-slate-500">DEMO</label><input className="w-full border p-2 rounded-lg text-sm" value={selectedProject.demoUrl || ''} onChange={e => setSelectedProject({...selectedProject, demoUrl: e.target.value})} /></div>
                 </div>

                 <div className="flex gap-2 pt-2">
                   <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold text-sm">{loading ? '...' : 'Lưu'}</button>
                   {selectedProject.id && <button type="button" onClick={() => handleDelete(selectedProject.id)} className="px-3 border border-red-200 text-red-600 rounded-lg"><Trash2 size={18}/></button>}
                 </div>
               </form>
             ) : <div className="text-center text-slate-400 py-10">Chọn dự án để sửa</div>}
          </div>
        </div>
      </main>
    </div>
  );
}