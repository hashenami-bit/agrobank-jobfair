import { useReveal } from '../../hooks/useReveal';
import MaskedText from '../../components/MaskedText';

export default function Protocol() {
  const headerRef = useReveal();
  const gridRef = useReveal({ threshold: 0.2 });

  const features = [
    {
      id: 'dex',
      badge: 'Pro',
      badgeColor: 'text-rose-500',
      icon: 'solar:wallet-linear',
      iconColor: 'text-white/70 group-hover:text-white',
      title: 'DEX',
      description: 'Trade USDC and USDT Cross-Margined Perpetual Contracts',
      isActive: false
    },
    {
      id: 'staking',
      badge: 'Staking',
      badgeColor: 'text-white',
      badgeBorder: 'border-rose-500/30',
      icon: 'solar:chart-square-linear',
      iconColor: 'text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]',
      title: 'Revenue-Sharing',
      description: 'Stake $Nova and / or $esNova tokens to participate in NovaChain\'s revenue sharing program and earn real yield, weekly in USDC.',
      isActive: true,
      bgImage: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 'bot',
      badge: 'Bot',
      badgeColor: 'text-pink-500',
      icon: 'solar:smart-home-linear',
      iconColor: 'text-pink-500/70 group-hover:text-pink-500',
      title: 'Telegram Bot',
      description: 'Trade on a First Ever Layer 2 Derivatives DEX Bot',
      isActive: false
    }
  ];

  const getHolodexClass = (index) => {
    if (index === 0) return 'holodex-left';
    if (index === 1) return 'holodex-center';
    return 'holodex-right';
  };

  return (
    <section className="w-full max-w-7xl py-32 px-6 relative border-b border-white/[0.05]">
      {/* Grid Lines inside section */}
      <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/[0.03] -z-10"></div>
      <div className="absolute top-0 bottom-0 right-1/3 w-px bg-white/[0.03] -z-10"></div>

      <div ref={headerRef} className="text-center mb-24">
        <div className="flex items-center justify-center space-x-4 mb-4 text-[0.65rem] tracking-widest uppercase text-rose-500 font-medium clip-slide delay-100">
          <span>02</span>
          <div className="w-12 h-px bg-rose-500/50"></div>
          <span>Ecosystem</span>
        </div>
        <h2 className="text-4xl md:text-5xl text-white font-medium tracking-tight">
          <MaskedText text="NovaChain Protocol" delayStart={200} stagger={100} />
        </h2>
      </div>

      {/* Flowchart Container */}
      <div ref={gridRef} className="relative max-w-5xl mx-auto holodex-container">
        
        {/* Drawing the connector lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-white/20 clip-slide delay-200"></div>
        <div className="absolute top-12 left-[16.66%] right-[16.66%] h-px bg-white/20 clip-slide delay-300"></div>
        <div className="absolute top-12 left-[16.66%] w-px h-12 bg-white/20 clip-slide delay-400"></div>
        <div className="absolute top-12 left-1/2 w-px h-12 bg-white/20 -translate-x-1/2 clip-slide delay-400"></div>
        <div className="absolute top-12 right-[16.66%] w-px h-12 bg-white/20 clip-slide delay-400"></div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-24">
          
          {features.map((feature, index) => (
            <div key={feature.id} className={`${getHolodexClass(index)} clip-slide delay-${(index + 3) * 100} h-full`}>
              <div 
                className={`
                  holodex-item p-8 rounded-sm flex flex-col items-center text-center relative group h-full
                  ${feature.isActive 
                    ? 'skeuo-card-active px-10' 
                    : 'border border-white/5 skeuo-card'
                  }
                `}
              >
                {/* Active state specific backgrounds */}
                {feature.isActive && feature.bgImage && (
                  <div 
                    className="absolute inset-0 opacity-5 mix-blend-screen bg-cover rounded-sm pointer-events-none"
                    style={{ backgroundImage: `url('${feature.bgImage}')` }}
                  ></div>
                )}
                
                <div className={`
                  absolute -top-3 px-2 bg-[#0b0d12] border text-[0.6rem] tracking-widest uppercase rounded-sm z-20
                  ${feature.badgeColor} ${feature.badgeBorder || 'border-white/10'}
                  ${feature.isActive ? 'bg-[#141820]' : ''}
                `}>
                  {feature.badge}
                </div>

                <iconify-icon icon={feature.icon} class={`text-5xl mb-6 transition-colors ${feature.iconColor} ${feature.isActive ? 'text-6xl' : ''}`}></iconify-icon>
                
                <h3 className={`font-medium text-white tracking-tight mb-3 ${feature.isActive ? 'text-2xl mb-4' : 'text-xl'}`}>
                  {feature.title}
                </h3>
                
                <p className={`text-xs leading-relaxed font-light ${feature.isActive ? 'text-white/60 mb-8' : 'text-white/50'}`}>
                  {feature.description}
                </p>

                {feature.isActive && (
                  <button className="px-6 py-2 mt-auto border border-white/20 rounded-sm text-white text-[0.65rem] tracking-widest uppercase hover:bg-white hover:text-black transition-all relative z-20">
                    Learn More
                  </button>
                )}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}