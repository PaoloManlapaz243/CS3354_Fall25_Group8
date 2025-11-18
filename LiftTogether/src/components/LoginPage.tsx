import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp, ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: 'landing' | 'register' | 'home') => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    setError('');
    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.error || 'Login failed');
    } else {
      onNavigate('home');
    }
  };

  const handleCreateAccount = () => {
    onNavigate('register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#4caeff] to-[#179AFF] rounded-full mb-4 shadow-xl">
            <TrendingUp className="text-white" size={40} />
          </div>
          <h1 className="text-4xl text-white mb-2">
            <span className="bg-gradient-to-r from-[#4caeff] to-[#179AFF] bg-clip-text text-transparent">LiftTogether</span>
          </h1>
          <p className="text-gray-400">Welcome back!</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#2a2a2a] rounded-xl p-8 shadow-xl border border-[#404040]">
          <h2 className="text-2xl text-white mb-6">Login</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2 text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1f1f1f] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#4caeff] focus:outline-none transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-white mb-2 text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full bg-[#1f1f1f] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#4caeff] focus:outline-none transition-colors"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50">
                <p className="text-red-400 text-sm">{error}</p>
                {error.includes('create an account') && (
                  <button
                    onClick={handleCreateAccount}
                    className="mt-2 text-[#4caeff] hover:text-[#3a9eef] text-sm underline"
                  >
                    Click here to create an account
                  </button>
                )}
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-[#4caeff] to-[#179AFF] text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-[#404040] text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('register')}
                className="text-[#4caeff] hover:text-[#3a9eef] underline"
              >
                Register
              </button>
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('landing')}
          className="mt-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors mx-auto"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
}