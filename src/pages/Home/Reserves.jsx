import { useState } from 'react';
import Toggle from '../../components/Toggle';
import { useReveal } from '../../hooks/useReveal';
import MaskedText from '../../components/MaskedText';

export default function Reserves() {
  const [includeNvc, setIncludeNvc] = useState(true);
  const headerRef = useReveal();
  const tableRef = useReveal({ threshold: 0.2 });

  const data = [
    {
      id: 'ratio',
      title: 'Reserve Ratio',
      subtitle: 'Total assets / Total liabilities · IN MILLIONS USD',
      icon: 'solar:alt-arrow-right-linear',
      iconColor: 'text-pink-500',
      value: includeNvc ? '164.0%' : '142.5%',
      subValue: includeNvc ? '75.30 / 39.00' : '65.20 / 39.00',
      chartColor: 'bg-rose-500',
      chartOpacity: 'opacity-80',
      heights: ['h-3', 'h-5', 'h-8', 'h-4', 'h-6']
    },
    {
      id: 'custody',
      title: 'Custody Ratio',
      subtitle: 'Custodial storage / Total liabilities',
      value: '135.0%',
      subValue: '43.00 / 39.00',
      chartColor: 'bg-white',
      chartOpacity: 'opacity-40 grayscale',
      heights: ['h-2', 'h-4', 'h-7', 'h-3', 'h-5'],
      ml: 'ml-5'
    },
    {
      id: 'storage',
      title: 'Custodial Storage',
      subtitle: 'Cobo Custody / Fireblocks',
      value: '49.73',
      subValue: '26.66 / 23.07',
      chartColor: 'bg-white',
      chartOpacity: 'opacity-40 grayscale',
      heights: ['h-1', 'h-2', 'h-4', 'h-2', 'h-3'],
      ml: 'ml-5'
    }
  ];

  return (
    <section className="w-full max-w-7xl py-32 px-6 relative border-b border-white/[0.05]">
      <div ref={headerRef} className="text-center mb-16">
        <div className="flex items-center justify-center space-x-4 mb-4 text-[0.65rem] tracking-widest uppercase text-rose-500 font-medium clip-slide delay-100">
          <span>04</span>
          <div className="w-12 h-px bg-rose-500/50"></div>
          <span>Transparency</span>
        </div>
        <h2 className="text-4xl md:text-5xl text-white font-medium tracking-tight">
          <MaskedText text="Proof of reserves\nand liabilities" delayStart={200} stagger={100} />
        </h2>
      </div>

      <div ref={tableRef} className="max-w-4xl mx-auto border border-white/10 rounded-sm skeuo-card overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="clip-slide delay-100 flex flex-col sm:flex-row justify-between items-start sm:items-center px-8 py-5 border-b border-white/10 bg-white/[0.02] gap-4">
          <Toggle 
            checked={includeNvc} 
            onChange={setIncludeNvc} 
            label="Include NVC Token" 
          />
          <div className="flex items-center space-x-2 text-[0.65rem] text-white/40 tracking-widest uppercase">
            <span className="text-rose-500 animate-pulse">● 1 min ago</span>
            <span>- Data updated every 15 mins</span>
          </div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col">
          {data.map((row, index) => (
            <div key={row.id} className={`clip-slide delay-${(index + 2) * 100} flex flex-col sm:flex-row items-start sm:items-center justify-between px-8 py-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors group gap-4`}>
              <div className="flex items-center space-x-6">
                {/* Mini bar chart visual */}
                <div className={`flex items-end space-x-1 h-8 ${row.chartOpacity} transition-all duration-300`}>
                  {row.heights.map((h, i) => (
                    <div key={i} className={`w-1.5 ${h} ${row.chartColor} rounded-t-sm group-hover:h-8 transition-all duration-500 delay-${i*100}`}></div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    {row.icon && <iconify-icon icon={row.icon} class={`${row.iconColor} text-sm`}></iconify-icon>}
                    <span className={`text-sm font-medium tracking-wide ${row.ml || ''}`}>{row.title}</span>
                  </div>
                  <span className={`text-[0.65rem] text-white/40 uppercase tracking-wider ${row.ml || ''}`}>{row.subtitle}</span>
                </div>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto ml-16 sm:ml-0 border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                <div className="text-lg font-medium tracking-tight text-white/90">{row.value}</div>
                <div className="text-[0.65rem] text-white/40 tracking-wider">{row.subValue}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer of table */}
        <div className="clip-slide delay-500 px-8 py-5 bg-[#080a0e] flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3 max-w-sm">
            <iconify-icon icon="solar:stars-linear" class="text-xl text-white/50"></iconify-icon>
            <p className="text-[0.65rem] text-white/50 leading-relaxed tracking-wide">Market-leading transparency to inspire user confidence and create unparalleled trust in centralized trading products.</p>
          </div>
          <button className="px-5 py-2 border border-white/20 rounded-sm text-white text-[0.65rem] tracking-widest uppercase hover:bg-white hover:text-black transition-all whitespace-nowrap">
            View Full Audit
          </button>
        </div>
      </div>
    </section>
  );
}