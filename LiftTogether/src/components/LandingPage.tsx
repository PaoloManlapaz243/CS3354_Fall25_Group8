import svgPaths from "../imports/svg-9nv30s3uwd";
import imgDumbbell11 from "figma:asset/943c06869a10ba142ba57671ced28ed983f482af.png";
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
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 24">
          <path d={svgPaths.p1c862580} fill="url(#paint0_linear_1_367)" id="Rectangle 1" stroke="var(--stroke-0, #63BBFF)" strokeWidth="2" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_367" x1="50" x2="50" y1="0" y2="24">
              <stop stopColor="#63BBFF" />
              <stop offset="0.995192" stopColor="#179AFF" />
            </linearGradient>
          </defs>
        </svg>
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
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 24">
          <path d={svgPaths.p1c862580} fill="url(#paint0_linear_1_367_2)" id="Rectangle 1" stroke="var(--stroke-0, #63BBFF)" strokeWidth="2" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_367_2" x1="50" x2="50" y1="0" y2="24">
              <stop stopColor="#63BBFF" />
              <stop offset="0.995192" stopColor="#179AFF" />
            </linearGradient>
          </defs>
        </svg>
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
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#4caeff] to-[#179AFF] rounded-full mb-6 shadow-xl">
            <TrendingUp className="text-white" size={48} />
          </div>
          <h1 className="text-5xl text-white mb-3">
            <span className="bg-gradient-to-r from-[#4caeff] to-[#179AFF] bg-clip-text text-transparent">LiftTogether</span>
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