import svgPaths from "./svg-9nv30s3uwd";
import imgDumbbell11 from "figma:asset/943c06869a10ba142ba57671ced28ed983f482af.png";

function Group1() {
  return (
    <div className="absolute contents left-[109px] top-[192px]">
      <div className="absolute h-[24px] left-[109px] top-[192px] w-[100px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 24">
          <path d={svgPaths.p1c862580} fill="url(#paint0_linear_1_367)" id="Rectangle 1" stroke="var(--stroke-0, #63BBFF)" strokeWidth="2" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_367" x1="50" x2="50" y1="0" y2="24">
              <stop stopColor="#63BBFF" />
              <stop offset="0.995192" stopColor="#179AFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[159px] not-italic text-[10px] text-center text-white top-[197px] translate-x-[-50%] w-[100px]">Login</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[237px] top-[192px]">
      <div className="absolute h-[24px] left-[237px] top-[192px] w-[100px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 24">
          <path d={svgPaths.p1c862580} fill="url(#paint0_linear_1_367)" id="Rectangle 1" stroke="var(--stroke-0, #63BBFF)" strokeWidth="2" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_367" x1="50" x2="50" y1="0" y2="24">
              <stop stopColor="#63BBFF" />
              <stop offset="0.995192" stopColor="#179AFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[287px] not-italic text-[10px] text-center text-white top-[197px] translate-x-[-50%] w-[100px]">Register</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-[#282828] relative size-full" data-name="Landing Page">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[126px] not-italic text-[#4caeff] text-[32px] text-nowrap top-[101px] whitespace-pre">LiftTogether</p>
      <div className="absolute left-[175px] size-[95px] top-[11px]" data-name="dumbbell (1) 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgDumbbell11} />
      </div>
      <Group1 />
      <Group />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[223px] not-italic text-[#494949] text-[12px] text-center text-nowrap top-[196px] translate-x-[-50%] whitespace-pre">or</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[223px] not-italic text-[12px] text-center text-nowrap text-white top-[154px] translate-x-[-50%] whitespace-pre">Track your lifts with friends and progress together!</p>
    </div>
  );
}