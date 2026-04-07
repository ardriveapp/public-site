import { BaseImage } from "@/components/base-image";
import { FINAL_CTA_WIDTH_CLASS, SITE_CONTAINER_CLASS } from "@/components/site-container";
import Link from "next/link";

const FEATURES = [
  {
    title: "Permanent",
    desc: "Access your files indefinitely, beyond the life of any company or platform.",
  },
  {
    title: "Subscription-free",
    desc: "Break free from monthly costs. Pay once to own your content forever.",
    stat: "400+",
    statLabel: "Global access points",
  },
  {
    title: "Universal",
    desc: "Benefit from decentralized global access to your data — no gatekeepers.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "ArDrive's blessedly familiar UI, just like I was used to. There is something genuinely satisfying about knowing that every asset and link in the final NFT is backed up by the generations-spanning storage promise of Arweave, and ArDrive was the app that allowed this all to happen for me.",
    name: "Christopher Powers",
    handle: "Full of Eyes",
    art: "/nfts/full-of-eyes.jpeg",
  },
  {
    quote:
      "ArDrive literally saved the entire migration… If I was restarting from scratch, I would've used it way earlier. It's amazing to see that something as big as RTFKT can be fully permanent on chain.",
    name: "Sam Cardillo",
    handle: "RTFKT",
    art: "/nfts/rtfkt-samurai.png",
  },
  {
    quote:
      "I like paying for it a little bit at a time. Paying once and storing forever is a way better solution.",
    name: "Stellabelle",
    handle: "Cryptostellas",
    art: "/nfts/stellebelle.png",
  },
];

const COLLECTION_IMAGES = [
  { src: "/nfts/nft-rtfkt-skull.png",      alt: "RTFKT NFT" },
  { src: "/nfts/nft-ape.png",              alt: "NFT collection piece" },
  { src: "/nfts/nft-rtfkt-lightning.png",  alt: "RTFKT lightning NFT" },
  { src: "/nfts/nft-ape-astronaut.png",    alt: "Ape astronaut NFT" },
  { src: "/nfts/nft-clonex.jpg",           alt: "CloneX NFT" },
  { src: "/nfts/nft-cryptoadz-1.png",      alt: "CryptoadZ NFT" },
  { src: "/nfts/nft-rtfkt-doll.jpg",       alt: "RTFKT doll NFT" },
  { src: "/nfts/nft-space-drip.png",       alt: "Space Drip NFT" },
  { src: "/nfts/nft-hood-lizard.png",      alt: "Hooded lizard NFT" },
  { src: "/nfts/nft-cryptoadz-2.png",      alt: "CryptoadZ NFT" },
  { src: "/nfts/nft-pixel-bunny.png",      alt: "Pixel bunny NFT" },
  { src: "/nfts/nft-bull-grin.png",        alt: "Bull NFT" },
];

const RESOURCES = [
  {
    title: "Store your NFT data on Arweave",
    desc: "Learn how to store your NFT images and metadata permanently on Arweave using ArDrive.",
    href: "/articles/arweave-and-nft-metadata",
    art: "/nfts/nft-rtfkt-doll.jpg",
  },
  {
    title: "Using ArDrive with OpenSea",
    desc: "Learn how to use ArDrive for permanent storage, linked directly from OpenSea.",
    href: "/articles/using-ardrive-with-opensea",
    art: "/nfts/nft-ape.png",
  },
];

export function NftsPage() {
  return (
    <main style={{ backgroundColor: "#080808", color: "#FAFAFA" }}>

      {/* ── Hero ── */}
      <section
        className="relative px-4 pt-20 pb-16 overflow-hidden"
        style={{
          background:
            "radial-gradient(70% 60% at 15% 40%, rgba(46,5,8,0.95) 0%, transparent 60%), radial-gradient(50% 60% at 80% 50%, rgba(30,3,5,0.7) 0%, transparent 55%), #080808",
        }}
      >
        <div className={`${SITE_CONTAINER_CLASS} flex flex-col lg:flex-row lg:items-center lg:gap-16`}>
          {/* Text */}
          <div className="flex-1 text-left">
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(254,2,48,0.7)" }}
            >
              NFT Storage
            </p>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl leading-none"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              Be{" "}
              <span className="text-fd-primary">Unruggable.</span>
            </h1>
            <p
              className="mt-5 max-w-md text-lg leading-relaxed"
              style={{ color: "rgba(250,250,250,0.55)" }}
            >
              Permanent NFT asset storage. Your digital legacy, secured on
              Arweave — no subscriptions, no servers, no rug pulls.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://app.ardrive.io"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-7 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Store NFTs
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-colors hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(250,250,250,0.8)" }}
              >
                Let's Connect
              </Link>
            </div>
          </div>

          {/* Hero NFT art */}
          <div className="mt-12 lg:mt-0 lg:w-[420px] shrink-0">
            <div className="relative mx-auto w-72 lg:w-full">
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl blur-3xl opacity-30"
                style={{ background: "radial-gradient(circle, #D31721 0%, transparent 70%)" }}
              />
              <BaseImage
                src="/nfts/hero-bull.jpg"
                alt="Unruggable NFT — ArDrive permanent storage"
                width={420}
                height={420}
                className="relative z-10 w-full rounded-3xl object-cover"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Own your digital legacy ── */}
      <section className="px-4 py-20">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="text-center mb-12">
            <h2
              className="text-4xl sm:text-5xl font-extrabold"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              Own your{" "}
              <span className="text-fd-primary">digital legacy.</span>
            </h2>
            <p
              className="mt-4 max-w-xl mx-auto text-base sm:text-lg leading-relaxed"
              style={{ color: "rgba(250,250,250,0.5)" }}
            >
              Leverage the power of permanent data to future-proof your NFTs.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-7 flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(250,250,250,0.5)" }}>
                  {f.desc}
                </p>
                {f.stat && (
                  <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <p
                      className="text-3xl font-extrabold"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
                    >
                      {f.stat}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(250,250,250,0.35)" }}>
                      {f.statLabel}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        className="px-4 py-12"
        style={{ background: "radial-gradient(60% 80% at 50% 50%, rgba(46,5,8,0.5) 0%, transparent 100%)" }}
      >
        <div className={`${SITE_CONTAINER_CLASS} text-center`}>
          <p
            className="text-6xl sm:text-7xl font-extrabold leading-none"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            18,000,000+
          </p>
          <p className="mt-3 text-lg" style={{ color: "rgba(250,250,250,0.45)" }}>
            files stored permanently on Arweave.
          </p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="px-4 py-20">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-7 flex flex-col"
                style={{
                  background: "radial-gradient(80% 60% at 0% 0%, rgba(46,5,8,0.5) 0%, rgba(255,255,255,0.025) 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="mb-5 w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <BaseImage
                    src={t.art}
                    alt={t.handle}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <p
                  className="text-sm leading-relaxed flex-1 italic"
                  style={{ color: "rgba(250,250,250,0.65)" }}
                >
                  "{t.quote}"
                </p>
                <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(250,250,250,0.35)" }}>
                    {t.handle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Legacies live on ArDrive ── */}
      <section className="px-4 py-16">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="text-center mb-10">
            <h2
              className="text-3xl sm:text-4xl font-extrabold"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              Legacies live on{" "}
              <span className="text-fd-primary">ArDrive.</span>
            </h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(250,250,250,0.4)" }}>
              Explore iconic collections made unruggable via ArDrive.
            </p>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {COLLECTION_IMAGES.map((img) => (
              <div
                key={img.src}
                className="overflow-hidden rounded-xl aspect-square"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <BaseImage
                  src={img.src}
                  alt={img.alt}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resources ── */}
      <section className="px-4 py-16">
        <div className={SITE_CONTAINER_CLASS}>
          <h2
            className="text-3xl font-extrabold mb-8"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Resources to{" "}
            <span className="text-fd-primary">get started.</span>
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {RESOURCES.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group flex gap-5 rounded-2xl p-6 transition-colors hover:bg-white/5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <BaseImage
                    src={r.art}
                    alt={r.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p
                    className="text-sm font-bold leading-snug group-hover:text-fd-primary transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {r.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: "rgba(250,250,250,0.4)" }}>
                    {r.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Red blob CTA ── */}
      <section className="px-4 py-12" style={{ background: "#080808" }}>
        <div
          className={`${FINAL_CTA_WIDTH_CLASS} relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-fd-primary px-6 py-14 text-center text-white shadow-2xl shadow-black/35 sm:px-10 sm:py-16 lg:px-12 lg:py-20`}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[45%] opacity-35"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 100%)" }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{ background: "radial-gradient(75% 55% at 50% 100%, rgba(255,255,255,0.22) 0%, transparent 60%)" }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "url(/home/texture-noise.png)", backgroundSize: "200px" }}
          />
          <h2
            className="relative z-10 mx-auto max-w-3xl text-balance text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Your NFTs. Forever unruggable.
          </h2>
          <p className="relative z-10 mx-auto mt-5 max-w-md text-base leading-relaxed text-white/85">
            Pay once. Store forever. No subscriptions. No platform risk.
          </p>
          <a
            href="https://app.ardrive.io"
            target="_blank"
            rel="noreferrer"
            className="relative z-10 mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-fd-primary transition-opacity hover:opacity-90"
          >
            Store Your NFTs
          </a>
        </div>
      </section>

    </main>
  );
}
