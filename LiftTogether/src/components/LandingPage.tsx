import blueLogo from "../assets/LiftTogetherLogo-Blue.png";
import { TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'login' | 'register') => void;
}

function Group1({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute contents left-[109px] top-[192px]">
      <button
        onClick={onClick}
        className="absolute h-[24px] left-[109px] top-[192px] w-[100px] cursor-pointer"
      >
      </button>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[159px] not-italic text-[10px] text-center text-white top-[197px] translate-x-[-50%] w-[100px] pointer-events-none">Login</p>
    </div>
  );
}

function Group({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute contents left-[237px] top-[192px]">
      <button
        onClick={onClick}
        className="absolute h-[24px] left-[237px] top-[192px] w-[100px] cursor-pointer"
      >
      </button>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[287px] not-italic text-[10px] text-center text-white top-[197px] translate-x-[-50%] w-[100px] pointer-events-none">Register</p>
    </div>
  );
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <img src={blueLogo} width="150px" className="center-image"/>
          <h1 className="text-5xl text-white mb-3">
            <span className="landingPageFont">LiftTogether</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Track your lifts with friends and progress together!
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-[#2a2a2a] rounded-xl p-8 shadow-xl border border-[#404040]">
          <div className="space-y-4">
            <button
              onClick={() => onNavigate('login')}
              className="w-full bg-gradient-to-r from-[#4caeff] to-[#179AFF] text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Login
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#404040]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#2a2a2a] text-gray-400">or</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('register')}
              className="w-full bg-[#1f1f1f] border border-[#404040] text-white py-3 rounded-lg hover:bg-[#2a2a2a] transition-colors"
            >
              Register
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}