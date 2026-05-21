import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import Toggle from '../../components/Toggle';
import MaskedText from '../../components/MaskedText';

export default function Pricing() {
  const headerRef = useReveal();
  const gridRef = useReveal({ threshold: 0.2 });
  const [isAnnual, setIsAnnual] = useState(false);

  const tiers = [
    {
      id: 'standard',
      name: 'Standard',
      monthlyPrice: '$29',
      annualPrice: '$24',
      subtitle: 'Per month',
      description: 'Perfect for casual traders getting started on NovaChain derivatives.',
      features: [
        'Up to 10x Leverage',
        'Standard Execution Speed',
        'Community Support',
        'Basic API Access'
      ],
      buttonText: 'Start Trading',
      isActive: false
    },
    {
      id: 'pro',
      name: 'Pro Trader',
      monthlyPrice: '$99',
      annualPrice: '$79',
      subtitle: 'Per month',
      description: 'For active traders seeking tighter spreads and priority execution.',
      features: [
        'Up to 50x Leverage',
        'Priority Trade Execution',
        '24/7 Dedicated Support',
        'Advanced API Access',
        'Stake $NOVA for 50% rebates'
      ],
      buttonText: 'Upgrade to Pro',
      isActive: true,
      badge: 'Most Popular'
    },
    {
      id: 'institutional',
      name: 'Institutional',
      monthlyPrice: '$499',
      annualPrice: '$399',
      subtitle: 'Per month',
      description: 'Bespoke infrastructure for market makers and high-volume funds.',
      features: [
        'Up to 100x Leverage',
        'Colocation / Direct Market Access',
        'Dedicated Account Manager',
        'Custom Rate Limits',
        'Zero Maker Fees'
      ],
      buttonText: 'Contact Sales',
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
      <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/[0.03] -z-10"></div>
      <div className="absolute top-0 bottom-0 right-1/3 w-px bg-white/[0.03] -z-10"></div>

      <div ref={headerRef} className="text-center mb-16">
        <div className="flex items-center justify-center space-x-4 mb-4 text-[0.65rem] tracking-widest uppercase text-rose-500 font-medium clip-slide delay-100">
          <span>05</span>
          <div className="w-12 h-px bg-rose-500/50"></div>
          <span>Fee Structure</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl text-white font-medium tracking-tight mb-8">
          <MaskedText text="Transparent Pricing" delayStart={200} stagger={100} />
        </h2>
        
        <div className="flex items-center justify-center space-x-4 clip-slide delay-400">
          <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-white/40'}`}>Monthly</span>
          <Toggle checked={isAnnual} onChange={setIsAnnual} />
          <span className={`text-sm ${isAnnual ? 'text-white' : 'text-white/40'}`}>Annually <span className="text-rose-500 text-[0.6rem] ml-1">(Save 20%)</span></span>
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto holodex-container">
        {tiers.map((tier, index) => (
          <div key={tier.id} className={`${getHolodexClass(index)} clip-slide delay-${(index + 1) * 200} h-full`}>
            <div 
              className={`
                holodex-item p-8 rounded-sm flex flex-col relative group h-full
                ${tier.isActive 
                  ? 'skeuo-card-active z-10' 
                  : 'border border-white/5 skeuo-card'
                }
              `}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#141820] border border-rose-500/30 text-[0.6rem] text-rose-500 tracking-widest uppercase rounded-sm z-20">
                  {tier.badge}
                </div>
              )}

              <div className="mb-8">
                <h3 className={`font-medium tracking-tight mb-2 ${tier.isActive ? 'text-2xl text-rose-500' : 'text-xl'}`}>
                  {tier.name}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-light min-h-[40px]">
                  {tier.description}
                </p>
              </div>

              <div className="mb-8 pb-8 border-b border-white/10">
                <div className="flex text-white items-baseline space-x-2">
                  <span className="text-5xl font-medium tracking-tight">
                    {isAnnual ? tier.annualPrice : tier.monthlyPrice}
                  </span>
                </div>
                <span className="text-[0.65rem] text-white/40 tracking-widest uppercase mt-2 block">
                  {tier.subtitle}
                </span>
              </div>

              <ul className="flex-grow space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-white/70">
                    <iconify-icon 
                      icon="solar:check-circle-linear" 
                      class={`text-lg mt-0.5 ${tier.isActive ? 'text-rose-500' : 'text-white/30'}`}
                    ></iconify-icon>
                    <span className="font-light">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`
                  w-full py-3 rounded-sm text-[0.65rem] tracking-widest uppercase transition-all duration-300 font-medium
                  ${tier.isActive 
                    ? 'bg-rose-500/10 text-rose-500 border border-rose-500/50 hover:bg-rose-500 hover:text-white' 
                    : 'border border-white/20 text-white/70 hover:bg-white hover:text-black'
                  }
                `}
              >
                {tier.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}