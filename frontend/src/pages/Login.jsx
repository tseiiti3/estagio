import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import { Church, ShieldCheck, Lock, AlertCircle, UserPlus } from 'lucide-react';
import api from '../api';

const Login = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const navigate = useNavigate();

  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await api.post('/api/token/', { username, password });
      
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      return navigate("/");
    } catch (err) {
      setError(err.message || 'Erro ao processar solicitação');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
            <Church size={36} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Bem-vindo</h1>
          <p className="text-slate-500 text-center text-sm">
            Sistema de Gestão de Membros e Cursos
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">
              Usuário
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <UserPlus size={16} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-sm"
                placeholder="Nome de usuário"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={16} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-sm"
                placeholder="•••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-violet-200 active:scale-[0.98] mt-2 text-sm"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <ShieldCheck size={18} />
                Entrar no Sistema
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/register')}
            className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
          >
            Não tem conta? Cadastre-se como Visitante.
          </button>
        </div>
      </div>
      
      <p className="mt-6 text-slate-400 text-xs">
        © 2026 Igreja Tenrikyo Rikuhaku Osasco.
      </p>
    </div>
  );
}

export default Login;
