import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, Star, MapPin, Instagram } from "lucide-react";

import logo from "@/assets/quinta-essencia-marca.jpg";
import heroImg from "@/assets/buque-rosas-e-alstroemerias.webp";
import buqueColorido from "@/assets/buque-rosas-coloridas.webp";
import buqueRomantico from "@/assets/buque-romantico.jpg";
import arranjoLirios from "@/assets/arranjo-colorido-lirios.jpg";
import buqueRosasRosa from "@/assets/buque-rosas-rosa.jpg";
import buqueRosasVermelhas from "@/assets/buque-rosas-vermelhas.jpg";
import buqueRosasMisto from "@/assets/buque-rosas-vermelhas-e-brancas.jpg";
import buqueGirassol from "@/assets/buque-girassol-e-rosa.jpg";

const WA = "https://wa.me/5548999987905";
const waLink = (msg: string) => `${WA}?text=${encodeURIComponent(msg)}`;
const MSG_MAIN = "Oi! Vim pelo site da Quinta Essência e queria conhecer os arranjos disponíveis 🌷";
const MSG_ITEM = "Oi! Vi esse arranjo no site da Quinta Essência e queria saber mais 🌷";
const INSTAGRAM = "https://www.instagram.com/quintaessenciafloricultura/";
const MAPS = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Floricultura Quinta Essência, R. Cândido Pereira dos Anjos, 2731, São João do Rio Vermelho, Florianópolis, SC, 88060-300");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quinta Essência Floricultura — Florianópolis, SC" },
      { name: "description", content: "Flores, plantas e presentes feitos com carinho pela Quinta Essência, no Rio Vermelho, Florianópolis. Faça seu pedido pelo WhatsApp." },
      { property: "og:title", content: "Quinta Essência Floricultura · Florianópolis" },
      { property: "og:description", content: "Buquês, flores e plantas pra deixar qualquer momento mais especial. Fale com a Quinta Essência." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function WhatsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`block shrink-0 ${className}`} fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}

const gallery = [
  { src: buqueColorido, alt: "Buquê colorido de rosas, flores amarelas e folhagens", pos: "object-center" },
  { src: buqueRomantico, alt: "Buquê de rosas vermelhas e brancas com flores delicadas", pos: "object-center" },
  { src: arranjoLirios, alt: "Arranjo alegre com lírios, rosas e flores variadas", pos: "object-center" },
  { src: buqueRosasRosa, alt: "Buquê romântico de rosas cor-de-rosa", pos: "object-center" },
  { src: buqueRosasVermelhas, alt: "Buquê de rosas vermelhas com mosquitinho", pos: "object-center" },
  { src: buqueRosasMisto, alt: "Buquê clássico de rosas vermelhas e brancas", pos: "object-center" },
  { src: buqueGirassol, alt: "Buquê com girassol, rosa vermelha e flores brancas", pos: "object-center" },
  { src: heroImg, alt: "Buquê de rosas brancas e flores cor-de-rosa", pos: "object-center" },
];

const desktopScatter = [
  { photo: gallery[0], position: { top: "4%", left: "6%" }, width: "13rem" },
  { photo: gallery[2], position: { top: "2%", right: "10%" }, width: "9rem" },
  { photo: gallery[4], position: { top: "38%", left: "-2%" }, width: "11rem" },
  { photo: gallery[3], position: { bottom: "4%", left: "18%" }, width: "10rem" },
  { photo: gallery[6], position: { bottom: "10%", right: "4%" }, width: "12rem" },
  { photo: gallery[1], position: { top: "42%", right: "-3%" }, width: "9rem" },
];

function Index() {
  const [menu, setMenu] = useState(false);
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const galleryViewportRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollArea = galleryScrollRef.current;
    const viewport = galleryViewportRef.current;
    const track = galleryTrackRef.current;
    if (!scrollArea || !viewport || !track) return;

    const desktop = window.matchMedia("(min-width: 1280px)");
    let frame = 0;

    const updateGallery = () => {
      if (desktop.matches) {
        scrollArea.style.height = "";
        track.style.transform = "";
        return;
      }

      const style = window.getComputedStyle(viewport);
      const horizontalPadding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const contentWidth = viewport.clientWidth - horizontalPadding;
      const distance = Math.max(0, track.scrollWidth - contentWidth);
      scrollArea.style.height = `${viewport.offsetHeight + distance}px`;
      const progress = Math.min(1, Math.max(0, -scrollArea.getBoundingClientRect().top / Math.max(distance, 1)));
      track.style.transform = `translate3d(${-distance * progress}px, 0, 0)`;
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateGallery();
      });
    };

    updateGallery();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    desktop.addEventListener("change", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      desktop.removeEventListener("change", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const nav = [
    { href: "#arranjos", label: "Arranjos" },
    { href: "#como-pedir", label: "Como pedir" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="relative isolate h-[100svh] min-h-[600px] overflow-hidden bg-wine-deep">
        <img
          src={heroImg}
          alt="Buquê artesanal da Quinta Essência Floricultura"
          fetchPriority="high"
          className="animate-slow-zoom absolute inset-0 -z-10 h-full w-full object-cover object-[50%_40%] md:object-[50%_35%]"
        />
        <div className="absolute inset-0 -z-10 bg-hero-veil" />

        <header className="relative z-20 flex items-center justify-between px-5 pt-5 md:px-12 md:pt-8">
          <a href="#" aria-label="Quinta Essência — início" className="flex items-center gap-3 text-on-photo">
            <img src={logo} alt="" width={48} height={48} className="h-11 w-11 rounded-full object-cover md:h-12 md:w-12" />
            <span className="font-display text-2xl leading-none md:text-3xl">Quinta Essência</span>
          </a>
          <nav className="hidden items-center gap-10 text-sm text-on-photo md:flex" aria-label="Principal">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="opacity-90 transition-opacity hover:opacity-100">{n.label}</a>
            ))}
            <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" className="border border-on-photo/60 px-5 py-2.5 transition-colors hover:bg-on-photo hover:text-wine">
              Fazer pedido
            </a>
          </nav>
          <button
            className="flex h-11 w-11 items-center justify-center text-on-photo md:hidden"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>

        {menu && (
          <div className="absolute inset-0 z-10 flex flex-col justify-center gap-8 bg-wine-deep/95 px-8 animate-in fade-in md:hidden">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenu(false)} className="font-display text-4xl text-on-photo">{n.label}</a>
            ))}
            <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-fit items-center gap-2 bg-crimson px-6 py-4 text-on-photo">
              <WhatsIcon className="h-5 w-5" /> Fazer meu pedido
            </a>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-12 md:pb-16">
          <div className="max-w-3xl text-on-photo">
            <p className="animate-rise text-sm tracking-wide text-on-photo/85" style={{ animationDelay: "300ms" }}>Floricultura no Rio Vermelho · Florianópolis</p>
            <h1 className="animate-rise mt-3 font-display text-[3.25rem] font-medium leading-[0.95] md:text-8xl" style={{ animationDelay: "450ms" }}>
              Um carinho em forma <em className="font-normal">de flor.</em>
            </h1>
            <p className="animate-rise mt-5 max-w-md text-base leading-relaxed opacity-90 md:text-lg" style={{ animationDelay: "650ms" }}>
              Flores, plantas e arranjos pra presentear, celebrar e surpreender quem você ama.
            </p>
            <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6" style={{ animationDelay: "850ms" }}>
              <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-crimson px-7 py-4 font-medium text-on-photo transition-transform hover:-translate-y-0.5">
                <WhatsIcon className="h-5 w-5" /> Fazer meu pedido
              </a>
              <a href="#arranjos" className="inline-flex items-center justify-center py-3 underline decoration-on-photo/40 underline-offset-8 transition-colors hover:decoration-on-photo">
                Conhecer os arranjos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ARRANJOS */}
      <section id="arranjos" className="py-20 md:py-32 xl:py-0">
        <Reveal className="px-5 md:px-12 xl:hidden">
          <div className="grid gap-4 md:grid-cols-12 md:items-end">
            <h2 className="font-display text-4xl leading-[1.05] text-wine md:col-span-7 md:text-6xl">
              Um detalhe que transforma <em>qualquer momento.</em>
            </h2>
            <p className="max-w-sm text-muted-foreground md:col-span-4 md:col-start-9">
              Cada buquê é montado à mão. Gostou de algum? Toque e converse com a gente.
            </p>
          </div>
        </Reveal>

        <div ref={galleryScrollRef} className="relative mt-12 h-[210svh] md:mt-16 md:px-12 xl:hidden">
          <div ref={galleryViewportRef} className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-5 xl:static xl:block xl:h-auto xl:overflow-visible xl:px-0">
            <div ref={galleryTrackRef} className="flex w-max gap-4 will-change-transform xl:grid xl:w-full xl:grid-cols-12 xl:gap-6 xl:overflow-visible xl:will-change-auto">
              {gallery.map((g, i) => {
                const layout = [
                  "md:col-span-7",
                  "md:col-span-5 md:mt-24",
                  "md:col-span-4",
                  "md:col-span-4 md:mt-16",
                  "md:col-span-4 md:mt-6",
                  "md:col-span-5",
                  "md:col-span-7 md:mt-24",
                  "md:col-span-6",
                  "md:col-span-6 md:mt-20",
                ][i];
                const imageShape = [
                  "md:aspect-[4/3]",
                  "md:aspect-[3/4]",
                  "md:aspect-[4/5]",
                  "md:aspect-[4/5]",
                  "md:aspect-[4/5]",
                  "md:aspect-[4/5]",
                  "md:aspect-[4/3]",
                  "md:aspect-[4/5]",
                  "md:aspect-[4/5]",
                ][i];
                return (
                  <Reveal key={g.alt} delay={i * 120} className={`w-[78vw] shrink-0 sm:w-[55vw] xl:w-auto ${layout}`}>
                    <a href={waLink(MSG_ITEM)} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`Consultar este arranjo: ${g.alt}`}>
                      <div className="overflow-hidden bg-ivory">
                        <img src={g.src} alt={g.alt} loading="lazy" className={`aspect-[3/4] w-full object-cover ${imageShape} ${g.pos} transition-transform duration-[1200ms] ease-out group-hover:scale-105`} />
                      </div>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm text-wine">
                        <span className="h-px w-6 bg-crimson transition-all duration-500 group-hover:w-10" />
                        Consultar este arranjo
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        <div className="hidden xl:block">
          <div className="relative grid min-h-[110svh] place-items-center overflow-hidden bg-background px-12 py-24">
            {desktopScatter.map((item) => (
              <img
                key={item.photo.alt}
                src={item.photo.src}
                alt={item.photo.alt}
                loading="lazy"
                className="absolute h-auto border-[0.4rem] border-background"
                style={{ ...item.position, width: item.width, boxShadow: "0 18px 40px -18px oklch(0.2 0.015 40 / 0.45)" }}
              />
            ))}
            <div className="relative z-10 grid max-w-[40rem] justify-items-center gap-5 text-center">
              <p className="text-xs uppercase tracking-[0.24em] text-crimson">Quinta Essência · Rio Vermelho</p>
              <h2 className="font-display text-4xl leading-[1.05] text-wine 2xl:text-6xl">
                Tem coisa melhor que receber flores?
              </h2>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                A gente prepara tudo com muito carinho. Escolha o seu e chama a gente pra combinar 🌷
              </p>
              <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-crimson px-6 py-4 font-medium text-on-photo transition-transform hover:-translate-y-0.5">
                <WhatsIcon className="h-5 w-5" /> Escolher meu arranjo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DESTAQUE */}
      <section className="bg-wine text-on-photo">
        <div className="grid md:grid-cols-2">
          <Reveal className="h-full">
            <img src={buqueRosasMisto} alt="Buquê de rosas vermelhas e brancas da Quinta Essência" loading="lazy" className="h-[75svh] w-full object-cover object-[50%_55%] md:h-full md:min-h-[720px]" />
          </Reveal>
          <div className="flex items-center px-6 py-16 md:px-16 lg:px-24">
            <Reveal>
              <p className="text-sm text-blush">Para cada ocasião</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] md:text-6xl">
                Presentes que fazem <em>momentos especiais.</em>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed opacity-85">
                Um buquê muda o dia, né? Conta pra gente o que você imaginou que a gente prepara com carinho 💐
              </p>
              <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 border border-on-photo/50 px-7 py-4 transition-colors hover:bg-on-photo hover:text-wine">
                <WhatsIcon className="h-5 w-5" /> Conversar com a floricultura
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMO PEDIR */}
      <section id="como-pedir" className="px-5 py-20 md:px-12 md:py-32">
        <Reveal>
          <h2 className="font-display text-4xl text-wine md:text-6xl">Como fazer seu pedido</h2>
        </Reveal>
        <ol className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-12">
          {[
            ["Escolha suas flores", "Viu um buquê que gostou? Ou já tem uma ideia? Conta pra gente."],
            ["Chama a gente", "A gente conversa sobre os detalhes e confirma tudo direitinho com você."],
            ["Receba com carinho", "Pode retirar na loja ou combinar a entrega com a gente 🌷"],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 120}>
              <li className="border-t border-border pt-6">
                <span className="font-display text-5xl italic text-crimson">{i + 1}</span>
                <h3 className="mt-3 text-lg font-medium text-foreground">{t}</h3>
                <p className="mt-2 max-w-xs text-muted-foreground">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-14">
          <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-wine px-7 py-4 font-medium text-on-photo transition-colors hover:bg-crimson">
            <WhatsIcon className="h-5 w-5" /> Começar meu pedido
          </a>
        </Reveal>
      </section>

      {/* PROVA SOCIAL */}
      <section className="border-y border-border bg-ivory px-5 py-12 md:px-12">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="font-display text-5xl text-wine">4,7</span>
            <div>
              <div className="flex gap-0.5 text-crimson" aria-label="4,7 de 5 estrelas">
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} opacity={i === 4 ? 0.7 : 1} />)}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">152 avaliações no Google</p>
            </div>
          </div>
          <p className="max-w-md font-display text-xl italic text-foreground md:text-2xl">Flores lindas, atendimento com carinho e um presente pra guardar no coração.</p>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer id="contato" className="bg-wine-deep px-5 pb-28 pt-20 text-on-photo md:px-12 md:pb-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="font-display text-5xl leading-none md:text-7xl">Vamos escolher <em>suas flores?</em></h2>
            <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex flex-nowrap items-center gap-2 whitespace-nowrap bg-crimson px-7 py-4 font-medium transition-transform hover:-translate-y-0.5">
              <WhatsIcon className="h-5 w-5" /> WhatsApp (48) 99998-7905
            </a>
            <a href="tel:+5548998537777" className="mt-4 block w-fit text-sm underline underline-offset-4 opacity-85 hover:opacity-100">Ou ligue: (48) 99853-7777</a>
            <a href="tel:+554832347040" className="mt-2 block w-fit text-sm underline underline-offset-4 opacity-85 hover:opacity-100">Loja: (48) 3234-7040</a>
          </div>
          <div className="grid gap-8 text-sm sm:grid-cols-2 md:col-span-6">
            <div>
              <p className="text-blush">Endereço</p>
              <a href={MAPS} target="_blank" rel="noopener noreferrer" className="mt-2 flex gap-2 leading-relaxed opacity-90 hover:opacity-100">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> R. Cândido Pereira dos Anjos, 2731 — São João do Rio Vermelho, Florianópolis, SC · 88060-300
              </a>
            </div>
            <div>
              <p className="text-blush">Atendimento</p>
              <p className="mt-2 leading-relaxed opacity-90">Temos flores, plantas e jardinagem. Fazemos entrega e retirada na loja. Chama a gente pra consultar 🌿</p>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 opacity-90 hover:opacity-100">
                <Instagram className="h-4 w-4" /> @quintaessenciafloricultura
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-between border-t border-on-photo/15 pt-8">
          <a href="#" className="font-display text-3xl">Quinta Essência</a>
          <p className="text-xs opacity-60">© {new Date().getFullYear()} Quinta Essência Floricultura</p>
        </div>
      </footer>

      <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Quinta Essência no WhatsApp" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 flex-nowrap items-center justify-center overflow-hidden rounded-full bg-botanic text-on-photo shadow-lg transition-transform hover:scale-105">
        <WhatsIcon className="h-7 w-7" />
      </a>
    </main>
  );
}
