import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function Login() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true'); 
      navigate('/admin'); 
    } else {
      alert('Sai mật khẩu rồi bạn ơi! 😅');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="flex justify-center mb-6 text-primary-500">
          <div className="p-4 bg-blue-50 rounded-full">
            <Lock size={32} className="text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Admin Đăng Nhập</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Mật khẩu bảo mật</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Nhập mật khẩu..."
            />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
            Truy Cập Hệ Thống
          </button>
        </form>
      </div>
    </div>
  );
}