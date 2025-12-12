
import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface LegalViewProps {
  type: 'privacy' | 'terms';
  onBack: () => void;
}

const LegalView: React.FC<LegalViewProps> = ({ type, onBack }) => {
  useEffect(() => { window.scrollTo(0,0); }, []);

  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? "Politika e Privatësisë" : "Kushtet e Përdorimit";
  
  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 px-6 relative z-50 font-inter">
       <nav className="fixed w-full z-50 top-0 left-0 bg-white/90 backdrop-blur-md border-b border-neutral-200 py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
              <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-red-600 transition-colors">
                  <ArrowLeft size={18} /> Kthehu
              </button>
              <div className="flex items-center gap-2 font-bold text-lg">
                <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center text-white text-xs shadow-md">IA</div>
                <span className="text-[#1a1a1a] uppercase text-sm md:text-base tracking-tight">INTELIGJENCA ARTIFICIALE</span>
              </div>
          </div>
      </nav>
      
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-neutral-200 shadow-sm animate-[fadeIn_0.5s_ease-out]">
         <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#1a1a1a] border-b border-red-100 pb-6">{title}</h1>
         <div className="prose prose-neutral prose-red max-w-none text-neutral-600 space-y-6">
            {isPrivacy ? (
                <>
                   <p className="text-sm text-neutral-400">Përditësuar së fundmi: {new Date().toLocaleDateString('sq-AL')}</p>
                   
                   <section>
                       <h3 className="text-xl font-bold text-black mb-2">1. Mbledhja e Informacionit</h3>
                       <p>Ne mbledhim informacione kur ju regjistroheni në faqen tonë, hyni në llogarinë tuaj, bëni një blerje, merrni pjesë në një konkurs, dhe/ose kur dilni nga llogaria. Informacioni i mbledhur përfshin emrin tuaj, adresën e emailit, numrin e telefonit.</p>
                   </section>
                   
                   <section>
                       <h3 className="text-xl font-bold text-black mb-2">2. Përdorimi i Informacionit</h3>
                       <p>Çdo informacion që ne mbledhim nga ju mund të përdoret për:</p>
                       <ul className="list-disc pl-5 space-y-1">
                           <li>Të personalizuar përvojën tuaj dhe për t'iu përgjigjur nevojave tuaja individuale.</li>
                           <li>Për të ofruar përmbajtje reklamuese të personalizuar.</li>
                           <li>Për të përmirësuar faqen tonë të internetit bazuar në feedback-un tuaj.</li>
                           <li>Për të përmirësuar shërbimin ndaj klientit dhe nevojat për mbështetje.</li>
                           <li>Për t'ju kontaktuar përmes emailit për të rejat e fundit.</li>
                       </ul>
                   </section>

                   <section>
                       <h3 className="text-xl font-bold text-black mb-2">3. Mbrojtja e të Dhënave</h3>
                       <p>Ne zbatojmë një sërë masash sigurie për të ruajtur sigurinë e informacionit tuaj personal. Ne përdorim enkriptim të avancuar për të mbrojtur informacionin e ndjeshëm të transmetuar online.</p>
                   </section>

                   <section>
                       <h3 className="text-xl font-bold text-black mb-2">4. Privatësia e Palëve të Treta</h3>
                       <p>Ne jemi pronarët e vetëm të informacionit të mbledhur në këtë faqe. Informacioni juaj personal i identifikueshëm nuk do t'i shitet, këmbehet, transferohet, ose t'i jepet ndonjë kompanie tjetër për çfarëdo arsye, pa pëlqimin tuaj, përveçse kur është e nevojshme për të përmbushur një kërkesë dhe/ose transaksion.</p>
                   </section>
                </>
            ) : (
                <>
                   <section>
                       <h3 className="text-xl font-bold text-black mb-2">1. Prezantimi</h3>
                       <p>Duke hyrë në këtë faqe interneti, ju pranoni të jeni të detyruar nga këto kushte shërbimi, të gjitha ligjet dhe rregulloret në fuqi, dhe pranoni që jeni përgjegjës për pajtueshmërinë me çdo ligj lokal të zbatueshëm. Nëse nuk jeni dakord me ndonjë nga këto kushte, ju ndalohet përdorimi ose aksesi në këtë faqe.</p>
                   </section>
                   
                   <section>
                       <h3 className="text-xl font-bold text-black mb-2">2. Licenca e Përdorimit</h3>
                       <p>Jepet leje për të shkarkuar përkohësisht një kopje të materialeve (informacion ose softuer) në faqen e internetit të Inteligjenca Artificiale vetëm për shikim personal, jo-komercial kalimtar. Kjo është dhënia e një licence, jo një transferim titulli.</p>
                   </section>
                   
                   <section>
                       <h3 className="text-xl font-bold text-black mb-2">3. Mohim Përgjegjësie</h3>
                       <p>Materialet në faqen e internetit të Inteligjenca Artificiale ofrohen "siç janë". Ne nuk japim asnjë garanci, të shprehur ose të nënkuptuar, dhe me këtë mohojmë dhe anulojmë të gjitha garancitë e tjera, duke përfshirë, pa kufizim, garancitë e nënkuptuara ose kushtet e tregtueshmërisë, përshtatshmërisë për një qëllim të caktuar, ose mosshkeljes së pronësisë intelektuale ose shkeljeve të tjera të të drejtave.</p>
                   </section>

                   <section>
                       <h3 className="text-xl font-bold text-black mb-2">4. Kufizimet</h3>
                       <p>Në asnjë rast Inteligjenca Artificiale ose furnizuesit e saj nuk do të jenë përgjegjës për ndonjë dëm (përfshirë, pa kufizim, dëmet për humbjen e të dhënave ose fitimit, ose për shkak të ndërprerjes së biznesit) që rrjedhin nga përdorimi ose pamundësia për të përdorur materialet në faqen tonë të internetit.</p>
                   </section>
                </>
            )}
         </div>
      </div>
    </div>
  );
};
export default LegalView;
