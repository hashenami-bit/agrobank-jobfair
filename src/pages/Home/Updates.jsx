import { useReveal } from '../../hooks/useReveal';

export default function Updates() {
  const headerRef = useReveal();
  const gridRef = useReveal({ threshold: 0.1 });

  return (
    <section className="w-full max-w-7xl py-32 px-6 relative">
      <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 reveal-up gap-6">
        <div>
          <div className="flex items-center space-x-4 mb-4 text-[0.65rem] tracking-widest uppercase text-rose-500 font-medium">
            {/* Updated number from 05 to 06 to account for new Features section */}
            <span>06</span>
            <div className="w-12 h-px bg-rose-500/50"></div>
            <span>Updates</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white font-medium tracking-tight">
            Let's build the<br/>Future of <span className="text-rose-500">NovaChain</span>
          </h2>
        </div>
        
        <div className="flex items-center space-x-4 text-white/50 border-b border-white/10 pb-2 w-full md:w-1/3 justify-end">
          <iconify-icon icon="solar:user-linear" class="hover:text-white cursor-pointer transition-colors text-lg"></iconify-icon>
          <iconify-icon icon="solar:letter-linear" class="hover:text-white cursor-pointer transition-colors text-lg"></iconify-icon>
          <iconify-icon icon="solar:play-circle-linear" class="hover:text-white cursor-pointer transition-colors text-lg"></iconify-icon>
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-8 reveal-up">
        
        {/* Featured Article */}
        <article className="md:col-span-8 group cursor-pointer flex flex-col h-full">
          <div className="w-full aspect-[16/9] overflow-hidden rounded-sm border border-white/10 mb-6 relative">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            <img 
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a7b9b4aa-1744-4538-8124-de11b4544488_1600w.webp" 
              alt="Abstract Neon Mountain Landscape" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="text-[0.65rem] text-rose-500 tracking-widest uppercase mb-3">Oct 21, 2024</div>
          <h3 className="text-2xl text-white font-medium tracking-tight mb-3 group-hover:text-rose-500 transition-colors">Crypto Events » Blockchain Hub Global</h3>
          <p className="text-sm text-white/50 font-light leading-relaxed max-w-2xl mb-6 flex-grow">
            Join the core NovaChain development team at the upcoming Blockchain Hub Global event in Singapore. We'll be discussing the future of Layer 2 derivatives and our roadmap for Q4.
          </p>
          <div>
            <button className="px-6 py-2 border border-white/20 rounded-sm text-white text-[0.65rem] tracking-widest uppercase hover:bg-white hover:text-black transition-all">Read More</button>
          </div>
        </article>

        {/* Sidebar Articles */}
        <div className="md:col-span-4 flex flex-col gap-8">
          
          <article className="group cursor-pointer">
            <div className="w-full aspect-video overflow-hidden rounded-sm border border-white/10 mb-4">
              <img 
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d52d8e90-766e-47c7-a9e7-096874b15fd0_800w.webp" 
                alt="Futuristic glowing human silhouette in red light" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
              />
            </div>
            <div className="text-[0.65rem] text-white/40 tracking-widest uppercase mb-2">Dec 10, 2024</div>
            <h4 className="text-lg text-white font-medium tracking-tight mb-3 group-hover:text-pink-500 transition-colors">Integration with Major Non-Custodial Wallets</h4>
            <span className="text-[0.65rem] text-pink-500 tracking-widest uppercase font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Read More <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
            </span>
          </article>

          <article className="group cursor-pointer">
            <div className="w-full aspect-video overflow-hidden rounded-sm border border-white/10 mb-4 relative flex items-center justify-center">
              <img 
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a5122f84-43cb-4170-94c3-aded75f0d3ed_800w.webp" 
                alt="Glowing Abstract Planet Over Reflective Surface" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="relative z-10 w-12 h-12 bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center rounded-sm group-hover:bg-rose-500/20 group-hover:border-rose-500/50 transition-colors">
                <span className="text-xl font-bold group-hover:text-rose-500 transition-colors">N</span>
              </div>
            </div>
            <div className="text-[0.65rem] text-white/40 tracking-widest uppercase mb-2">Jan 15, 2025</div>
            <h4 className="text-lg text-white font-medium tracking-tight mb-3 group-hover:text-pink-500 transition-colors">NovaChain Tokenomics v2.0 Released</h4>
            <span className="text-[0.65rem] text-pink-500 tracking-widest uppercase font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Read More <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
            </span>
          </article>

        </div>
      </div>
    </section>
  );
}