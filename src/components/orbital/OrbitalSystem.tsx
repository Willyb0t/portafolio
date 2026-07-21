import React from 'react';

export default function OrbitalSystem() {
  return (
    <div className="relative flex items-center justify-center w-80 h-80 pointer-events-none opacity-60">
      {/* Cuerpo Central (Planeta/Estrella) - Accent Blue */}
      <div className="absolute w-8 h-8 rounded-full bg-[#00b4d8] shadow-[0_0_24px_#00b4d8]"></div>

      {/* Sistema Orbital 1 */}
      <div className="absolute w-full h-full transform -rotate-12">
        {/* El contorno de la órbita (Elíptico gracias al rotateX) */}
        <div className="w-full h-full rounded-full border border-white/10 animate-[spin_15s_linear_infinite]" style={{ transform: 'rotateX(70deg)' }}>
          {/* Satélite - Vibrant Purple */}
          <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[#0077b6] shadow-[0_0_12px_#0077b6]"></div>
        </div>
      </div>

      {/* Sistema Orbital 2 */}
      <div className="absolute w-[140%] h-[140%] transform rotate-45">
        <div className="w-full h-full rounded-full border border-white/10 animate-[spin_25s_linear_infinite_reverse]" style={{ transform: 'rotateX(75deg)' }}>
          {/* Satélite - Cosmic Pink */}
          <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#ff006e] shadow-[0_0_10px_#ff006e]"></div>
        </div>
      </div>
      
      {/* Sistema Orbital 3 (Acelerado sutilmente) */}
      <div className="absolute w-[70%] h-[70%] transform rotate-90">
        <div className="w-full h-full rounded-full border border-white/10 animate-[spin_8s_linear_infinite]" style={{ transform: 'rotateX(65deg)' }}>
          {/* Satélite - Stellar White */}
          <div className="absolute top-0 left-1/2 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[#f8f9fa] shadow-[0_0_8px_#f8f9fa]"></div>
        </div>
      </div>
    </div>
  );
}