'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { Calendar, ChevronDown } from 'lucide-react';

const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1];
const durationSlow = 0.32;
const durationNormal = 0.22;
const durationFast = 0.15;

const scrollVariant = {
  hidden: { opacity: 0, y: 6, filter: 'blur(2px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: durationSlow, ease: easeSmooth }
  }
};

function TopLeftCutout({ children, cornerRadius = 16, className = '' }: any) {
  return (
    <div 
      className={`absolute top-0 left-0 bg-[var(--bg-page)] z-10 ${className}`}
      style={{ borderBottomRightRadius: cornerRadius }}
    >
      {children}
      <div 
        className="absolute top-0 pointer-events-none"
        style={{
          right: -cornerRadius,
          width: cornerRadius,
          height: cornerRadius,
          background: `radial-gradient(circle at 100% 100%, transparent ${cornerRadius}px, var(--bg-page) ${cornerRadius + 0.5}px)`
        }}
      />
    </div>
  );
}

function TopRightCutout({ children, cornerRadius = 16, className = '' }: any) {
  return (
    <div 
      className={`absolute top-0 right-0 bg-[var(--bg-page)] z-10 ${className}`}
      style={{ borderBottomLeftRadius: cornerRadius }}
    >
      {children}
      <div 
        className="absolute top-0 pointer-events-none"
        style={{
          left: -cornerRadius,
          width: cornerRadius,
          height: cornerRadius,
          background: `radial-gradient(circle at 0% 100%, transparent ${cornerRadius}px, var(--bg-page) ${cornerRadius + 0.5}px)`
        }}
      />
      <div 
        className="absolute right-0 pointer-events-none"
        style={{
          bottom: -cornerRadius,
          width: cornerRadius,
          height: cornerRadius,
          background: `radial-gradient(circle at 0% 100%, transparent ${cornerRadius}px, var(--bg-page) ${cornerRadius + 0.5}px)`
        }}
      />
    </div>
  );
}

function Clickable({ children, className, onClick, ...props }: any) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
      transition={{ duration: durationFast }}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const menuData = [
  {
    category: "Nos Menus",
    items: [
      { name: "MENU DU MIDI SEIS", description: "Midi du lundi au vendredi. 6 Broches avec buffet à volonté.", price: "19,30 €" },
      { name: "MENU SEIS MAIS", description: "Virgin Mojito ou Piña Colada. 6 Broches + Mocktails.", price: "22,50 €" },
      { name: "MENU SOIR OITO", description: "Soir & week-end. 8 Broches : Pain à l'ail, Pilon, Aile, Saucisse, Alcatra, Picanha, Bœuf au fromage, Gigot, Ananas.", price: "29,90 €" },
      { name: "MENU NOVE", description: "Vendredi & Samedi soir. 9 Broches : Pain à l'ail, Pilon, Aile, Saucisse, Alcatra, Picanha, Haut de cuisse, Gigot, Ananas.", price: "35,90 €" }
    ]
  }
];

export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'menu' | 'reservation'>('home');
  const shouldReduceMotion = useReducedMotion();

  const activeScrollVariant = shouldReduceMotion ? {
    hidden: { opacity: 0, y: 0, filter: 'blur(0px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
  } : scrollVariant;

  return (
    <div className="flex flex-col lg:flex-row gap-[16px] p-[14px] min-h-screen">
      {/* Left Column (Stage) */}
      <div className="w-full lg:w-[68%] lg:sticky lg:top-[14px] h-[70vh] lg:h-[calc(100vh-28px)] rounded-[var(--radius-lg)] overflow-hidden relative flex-shrink-0">
        
        <Image
          src="https://i.pinimg.com/736x/6a/6b/e0/6a6be0cf20105501c9bd23274f2ac464.jpg"
          alt="Restaurant Interior"
          fill
          className="object-cover z-0"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[rgba(0,0,0,0.75)] via-[rgba(0,0,0,0.15)_45%] to-transparent to-[70%]" />

        {/* Nav Bar */}
        <TopLeftCutout cornerRadius={32} className="flex items-center pt-[12px] pl-[24px] pr-[16px] pb-[12px]">
          <div className="font-serif italic text-[24px] text-[var(--text-primary)] leading-none mr-[32px] tracking-tight">Brasa Viva</div>
          
          <div className="hidden md:flex items-center gap-[24px] text-[14.5px] font-sans text-[var(--text-primary)]">
            <button onClick={() => setCurrentView('menu')} className="opacity-90 hover:opacity-100 transition-opacity duration-200">
              Menu
            </button>
            <button onClick={() => setCurrentView('reservation')} className="opacity-90 hover:opacity-100 transition-opacity duration-200">
              Réservation
            </button>
          </div>
        </TopLeftCutout>

      </div>

      {/* Right Column (Sidebar) */}
      <div className="w-full lg:w-[32%] flex flex-col gap-[16px]">
        
        {currentView === 'home' ? (
          <>
            {/* Menu Card */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={activeScrollVariant}
              className="relative w-full h-[190px] rounded-[var(--radius-lg)] overflow-hidden cursor-pointer"
              onClick={() => setCurrentView('menu')}
            >
              <Image referrerPolicy="no-referrer" src="https://i.pinimg.com/736x/92/22/c0/9222c0ba977ac703ffd92d23892df939.jpg" alt="Menu" fill className="object-cover z-0" />
              
              <TopLeftCutout cornerRadius={16} className="pt-[12px] pl-[12px] pr-[12px] pb-[12px] absolute top-0 left-0 z-10">
                <div className="inline-flex rounded-full px-[14px] py-[6px] text-[13px] font-medium text-[var(--text-primary)] bg-[rgba(10,10,10,0.5)] backdrop-blur-md">
                  Menu
                </div>
              </TopLeftCutout>
            </motion.div>

            {/* Book a Table */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={activeScrollVariant}>
              <Clickable onClick={() => setCurrentView('reservation')} className="w-full h-[56px] bg-[var(--btn-bg)] text-[var(--btn-text)] rounded-[var(--radius-md)] flex justify-between items-center px-[22px] cursor-pointer">
                <span className="font-medium text-[15px]">Réserver une Table</span>
                <div className="w-[32px] h-[32px] bg-[rgba(0,0,0,0.05)] rounded-full flex items-center justify-center">
                  <Calendar size={16} />
                </div>
              </Clickable>
            </motion.div>

            {/* Opening Hours */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={activeScrollVariant}
              className="bg-[var(--bg-card)] border border-[var(--card-border)] rounded-[var(--radius-lg)] p-[28px]"
            >
              <div className="text-[14px] text-[var(--text-secondary)] mb-[16px]">Horaires d&apos;Ouverture</div>
              <div className="flex flex-col">
                {[
                  { day: 'Lundi', time: '12:00 – 15:00 / 19:00 – 23:00' },
                  { day: 'Mardi', time: '12:00 – 15:00 / 19:00 – 23:00' },
                  { day: 'Mercredi', time: '12:00 – 15:00 / 19:00 – 23:00' },
                  { day: 'Jeudi', time: '12:00 – 15:00 / 19:00 – 23:00' },
                  { day: 'Vendredi', time: '12:00 – 15:00 / 19:00 – 00:00' },
                  { day: 'Samedi', time: '12:00 – 17:00 / 19:00 – 23:00' },
                  { day: 'Dimanche', time: '12:00 – 17:00 / 19:00 – 23:00' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-baseline py-[10px]">
                    <span className="text-[14px] text-[var(--text-primary)]">{item.day}</span>
                    <div className="flex-1 border-b border-dotted border-[var(--divider)] mx-[12px]"></div>
                    <span className={`text-[14px] ${item.time === 'Fermé' ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={activeScrollVariant}
              className="bg-[var(--bg-card)] rounded-[var(--radius-lg)] p-[48px_32px] text-center relative"
            >
              <h3 className="font-serif italic text-[20px] text-[var(--text-primary)] mb-[20px]">Navigation</h3>
              <div className="flex flex-col">
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }} className="text-[14px] leading-[2.4] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Accueil
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('menu'); }} className="text-[14px] leading-[2.4] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Menu
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('reservation'); }} className="text-[14px] leading-[2.4] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Réservation
                </a>
              </div>
              
              <div className="h-[40px]"></div>
              
              <h3 className="font-serif italic text-[20px] text-[var(--text-primary)] mb-[20px]">Contact</h3>
              <div className="flex flex-col gap-[12px] text-[14px] leading-[1.6] text-[var(--text-secondary)]">
                <a href="mailto:Contact.brasaviva@gmail.com" className="hover:text-[var(--text-primary)] transition-colors">
                  Contact.brasaviva@gmail.com
                </a>
                <p>
                  33 bis Av. de l&apos;Europe<br/>
                  78140 Vélizy-Villacoublay, France
                </p>
                <div className="mt-[8px] w-full h-[180px] rounded-[var(--radius-md)] overflow-hidden border border-[var(--card-border)] relative">
                  <iframe 
                    src="https://www.google.com/maps?q=33+bis+Av.+de+l'Europe,+78140+Vélizy-Villacoublay,+France&output=embed"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              
              <div className="h-[40px]"></div>
              <div className="w-full h-[1px] bg-[var(--divider)] mb-[40px]"></div>
              
              <div className="text-[13px] text-[var(--text-muted)] pb-[8px]">
                &copy; Brasa Viva {new Date().getFullYear()}
              </div>
            </motion.div>
          </>
        ) : currentView === 'menu' ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="bg-[var(--bg-card)] rounded-[var(--radius-lg)] p-[32px] flex flex-col gap-[32px]"
          >
            <div className="flex flex-col gap-[16px]">
              <h2 className="font-serif italic text-[42px] text-[var(--text-primary)] leading-[1.1]">Menu</h2>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">
                Découvrez notre menu de plats authentiques. De nos viandes grillées à nos accompagnements, goûtez au meilleur de Brasa Viva !
              </p>
            </div>

            <div className="flex flex-col gap-[24px]">
              {menuData.map((category, idx) => (
                <div key={idx} className="flex flex-col gap-[12px]">
                  <div className="flex justify-between items-center py-[12px] border-b border-[var(--divider)]">
                    <h3 className="text-[14px] font-medium text-[var(--text-primary)]">{category.category}</h3>
                  </div>
                  <div className="flex flex-col gap-[20px] pt-[8px]">
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex justify-between items-start gap-[16px]">
                        <div className="flex flex-col gap-[4px] flex-1">
                          <h4 className="font-serif italic text-[18px] text-[var(--text-primary)]">{item.name}</h4>
                          <p className="text-[13px] text-[var(--text-secondary)] leading-[1.5]">{item.description}</p>
                        </div>
                        <div className="text-[15px] font-medium text-[var(--text-primary)] whitespace-nowrap pt-[2px]">{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-[12px] mt-[16px]">
              <Clickable onClick={() => setCurrentView('home')} className="w-full h-[52px] border border-[var(--card-border)] hover:border-[rgba(255,255,255,0.25)] rounded-[var(--radius-md)] flex justify-center items-center px-[22px] bg-transparent text-[var(--text-primary)] cursor-pointer transition-colors duration-200">
                <span className="font-medium text-[15px]">Go Back</span>
              </Clickable>
              <Clickable onClick={() => setCurrentView('reservation')} className="w-full h-[52px] bg-[var(--btn-bg)] text-[var(--btn-text)] rounded-[var(--radius-md)] flex justify-between items-center px-[22px] cursor-pointer">
                <span className="font-medium text-[15px]">Réserver une Table</span>
                <div className="w-[32px] h-[32px] bg-[rgba(0,0,0,0.05)] rounded-full flex items-center justify-center">
                  <Calendar size={16} />
                </div>
              </Clickable>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="bg-[var(--bg-card)] rounded-[var(--radius-lg)] p-[32px] flex flex-col gap-[32px]"
          >
            <div className="flex flex-col gap-[16px]">
              <h2 className="font-serif italic text-[42px] text-[var(--text-primary)] leading-[1.1]">Réserver une Table</h2>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">
                Réservez votre table et savourez le goût authentique. Nous avons hâte de vous accueillir pour une expérience inoubliable !
              </p>
            </div>

            <form className="flex flex-col gap-[20px]" onSubmit={(e) => e.preventDefault()}>
              <div className="flex gap-[16px]">
                <div className="flex flex-col gap-[8px] flex-1">
                  <label className="font-serif italic text-[16px] text-[var(--text-primary)]">Nom</label>
                  <input type="text" placeholder="Jane Smith" className="w-full bg-[rgba(10,10,10,0.5)] border border-[var(--card-border)] rounded-[var(--radius-sm)] p-[12px_16px] text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--text-secondary)] transition-colors" />
                </div>
                <div className="flex flex-col gap-[8px] flex-1">
                  <label className="font-serif italic text-[16px] text-[var(--text-primary)]">Email</label>
                  <input type="email" placeholder="jane@example.com" className="w-full bg-[rgba(10,10,10,0.5)] border border-[var(--card-border)] rounded-[var(--radius-sm)] p-[12px_16px] text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--text-secondary)] transition-colors" />
                </div>
              </div>

              <div className="flex gap-[16px]">
                <div className="flex flex-col gap-[8px] flex-1">
                  <label className="font-serif italic text-[16px] text-[var(--text-primary)]">Téléphone</label>
                  <input type="tel" placeholder="+33 6 12 34 56 78" className="w-full bg-[rgba(10,10,10,0.5)] border border-[var(--card-border)] rounded-[var(--radius-sm)] p-[12px_16px] text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--text-secondary)] transition-colors" />
                </div>
                <div className="flex flex-col gap-[8px] flex-1">
                  <label className="font-serif italic text-[16px] text-[var(--text-primary)]">Personnes</label>
                  <div className="relative">
                    <select className="w-full bg-[rgba(10,10,10,0.5)] border border-[var(--card-border)] rounded-[var(--radius-sm)] p-[12px_16px] pr-[40px] text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--text-secondary)] transition-colors appearance-none">
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex gap-[16px]">
                <div className="flex flex-col gap-[8px] flex-1">
                  <label className="font-serif italic text-[16px] text-[var(--text-primary)]">Date</label>
                  <input type="date" className="w-full bg-[rgba(10,10,10,0.5)] border border-[var(--card-border)] rounded-[var(--radius-sm)] p-[12px_16px] text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--text-secondary)] transition-colors [color-scheme:dark]" />
                </div>
                <div className="flex flex-col gap-[8px] flex-1">
                  <label className="font-serif italic text-[16px] text-[var(--text-primary)]">Heure</label>
                  <input type="time" className="w-full bg-[rgba(10,10,10,0.5)] border border-[var(--card-border)] rounded-[var(--radius-sm)] p-[12px_16px] text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--text-secondary)] transition-colors [color-scheme:dark]" />
                </div>
              </div>
              
              <button className="w-full h-[52px] bg-[var(--btn-bg)] text-[var(--btn-text)] rounded-[var(--radius-md)] flex justify-center items-center px-[22px] cursor-pointer mt-[8px]">
                <span className="font-medium text-[15px]">Confirmer la Réservation</span>
              </button>
            </form>

            <div className="flex flex-col gap-[12px] mt-auto">
              <Clickable onClick={() => setCurrentView('home')} className="w-full h-[52px] border border-[var(--card-border)] hover:border-[rgba(255,255,255,0.25)] rounded-[var(--radius-md)] flex justify-center items-center px-[22px] bg-transparent text-[var(--text-primary)] cursor-pointer transition-colors duration-200">
                <span className="font-medium text-[15px]">Go Back</span>
              </Clickable>
            </div>
          </motion.div>
        )}
        
      </div>
    </div>
  );
}
