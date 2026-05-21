import { useReveal } from '../../hooks/useReveal';
import MaskedText from '../../components/MaskedText';

export default function Features() {
  const headerRef = useReveal();
  const gridRef = useReveal({ threshold: 0.1 });

  const features = [
    {
      title: "Ultra-Low Latency Engine",
      description: "Our proprietary matching engine handles over 100k transactions per second with sub-millisecond execution.",
      icon: "solar:bolt-linear",
      colSpan: "md:col-span-2",
      image: "https://images.unsplash.com/photo-1640906152676-dace6710d24b?w=800&q=80"
    },
    {
      title: "Unified Cross-Margin",
      description: "Maximize capital efficiency by using a single margin account across all supported derivative markets.",
      icon: "solar:layers-linear",
      colSpan: "md:col-span-1",
      image: null
    },
    {
      title: "Institutional-Grade API",
      description: "Connect via REST or WebSocket with comprehensive documentation and dedicated SDKs for Python, Node, and Go.",
      icon: "solar:code-square-linear",
      colSpan: "md:col-span-1",
      image: null
    },
    {
      title: "Deep Liquidity",
      description: "Partnered with top-tier market makers to ensure tight spreads and minimal slippage on major pairs.",
      icon: "solar:waterdrops-linear",
      colSpan: "md:col-span-2",
      image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="w-full max-w-7xl py-32 px-6 relative border-b border-white/[0.05]">
      {/* Grid Lines inside section */}
      <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/[0.03] -z-10"></div>
      <div className="absolute top-0 bottom-0 right-1/3 w-px bg-white/[0.03] -z-10"></div>

      <div ref={headerRef} className="text-center mb-24">
        <div className="flex items-center justify-center space-x-4 mb-4 text-[0.65rem] tracking-widest uppercase text-rose-500 font-medium clip-slide delay-100">
          <span>03</span>
          <div className="w-12 h-px bg-rose-500/50"></div>
          <span>Core Features</span>
        </div>
        <h2 className="text-4xl md:text-5xl text-white font-medium tracking-tight">
          <MaskedText text="Built for Professional\nTraders" delayStart={200} stagger={100} />
        </h2>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature, idx) => (
          <div 
            key={idx}
            className={`clip-slide delay-${(idx + 1) * 100} ${feature.colSpan}`}
          >
            <div className="group relative overflow-hidden p-8 rounded-sm border border-white/5 skeuo-card hover:-translate-y-2 transition-all duration-300 h-full">
              {feature.image && (
                <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
              )}
              
              <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
                <div>
                  <div className="w-12 h-12 rounded-sm border border-white/10 bg-white/[0.02] flex items-center justify-center mb-6 group-hover:border-rose-500/30 group-hover:bg-rose-500/10 transition-colors">
                    <iconify-icon icon={feature.icon} class="text-2xl text-white/70 group-hover:text-rose-500 transition-colors"></iconify-icon>
                  </div>
                  <h3 className="text-2xl text-white font-medium tracking-tight mb-3 group-hover:text-rose-500 transition-colors">{feature.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed font-light">{feature.description}</p>
                </div>
              </div>
              
              {/* Subtle highlight effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}