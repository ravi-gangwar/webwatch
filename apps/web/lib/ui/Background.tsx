import React, { FC, ReactNode } from 'react'

interface BackgroundProps {
  children: ReactNode;
  type: 'landing' | 'quickmonitor';
}


const Background: FC<BackgroundProps> = ({ children, type="landing" }) => {
  

  switch (type) {
    case 'landing':
      return <div className="min-h-screen w-full relative bg-black">
    {/* Prismatic Aurora Burst - Multi-layered Gradient */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: `
          radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
          radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
          radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
          radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
          #000000
        `,
      }}
    />
          <div className="absolute inset-0 z-10">
        {children}
      </div>
    {/* Your Content/Components */}
  </div>
    case 'quickmonitor':
      return <div className="min-h-screen w-full relative">
  <div
    className="absolute inset-0 z-0"
    style={{
      background:
        "radial-gradient(circle at top, #1c1c1c, #000000)",
    }}
  />
  <div className="absolute inset-0 z-10">
    {children}
  </div>
</div>
  }
}

export default Background