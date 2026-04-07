"use client";

import { ExternalLink, Copy, Check } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";

type TokenNetwork = "ao" | "base";

interface ExternalButtonProps {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}

function ExternalButton({
  href,
  variant = "secondary",
  children,
}: ExternalButtonProps) {
  const className =
    variant === "primary"
      ? "inline-flex items-center justify-center gap-2 rounded-full bg-fd-foreground px-5 py-2.5 text-sm font-semibold text-fd-background hover:opacity-90 transition-opacity"
      : variant === "ghost"
        ? "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-fd-foreground hover:bg-fd-accent transition-colors"
        : "inline-flex items-center justify-center gap-2 rounded-full border border-fd-border bg-fd-background/70 px-5 py-2.5 text-sm font-semibold text-fd-foreground hover:bg-fd-accent transition-colors";

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
      <ExternalLink className="size-4" />
    </a>
  );
}

function ContractRow({
  label,
  value,
  explorerHref,
}: {
  label: string;
  value: string;
  explorerHref: string;
}) {
  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 900);
    } catch {
      // ignore
    }
  }, [value]);

  return (
    <div className="rounded-2xl border border-fd-border bg-fd-background/70 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground">
            {label}
          </div>
          <div className="mt-2 font-mono text-xs text-fd-foreground break-all">
            {value}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-background/70 px-3 py-2 text-xs font-semibold text-fd-foreground hover:bg-fd-accent transition-colors"
            aria-label={`Copy ${label}`}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <ExternalButton href={explorerHref} variant="ghost">
            Explorer
          </ExternalButton>
        </div>
      </div>
    </div>
  );
}

export function TokenPage() {
  const [network, setNetwork] = useState<TokenNetwork>("ao");

  const data = useMemo(() => {
    return {
      ao: {
        label: "AO (Canonical)",
        description:
          "The base asset that powers staking, rewards, and ArNS on ar.io.",
        contractId: "qNvAoz0TgcH7DMg8BCVn8jF32QH5L6T29VjHxhHqqGE",
        explorer: "https://scan.ar.io/#/entity/qNvAoz0TgcH7DMg8BCVn8jF32QH5L6T29VjHxhHqqGE",
        exchanges: [
          { name: "Gate", href: "https://gate.io/trade/ARIO_USDT" },
          { name: "Biconomy", href: "https://www.biconomy.com/exchange/ARIO_USDT" },
          { name: "LBank", href: "https://www.lbank.com/trade/ario_usdt" },
          { name: "Permaswap", href: "https://www.permaswap.network/#/liquidity?processId=T2r71KaJH15fpiyGD_RHsWqrIS1ccO7DZ7cm9g4HLRw&to=add" },
        ],
      },
      base: {
        label: "Base (Bridged)",
        description:
          "A bridged representation of $ARIO on Base for EVM liquidity and integrations.",
        contractId: "0x138746adfA52909E5920def027f5a8dc1C7EfFb6",
        explorer:
          "https://basescan.org/token/0x138746adfa52909e5920def027f5a8dc1c7effb6",
        exchanges: [
          { name: "ARIO Bridge", href: "https://swap.ar.io/" },
          { name: "Hydrex", href: "https://www.hydrex.fi/swap?tokenIn=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&tokenOut=0x138746adfa52909e5920def027f5a8dc1c7effb6" },
          { name: "Coinbase DEX", href: "https://www.coinbase.com/dex" },
        ],
      },
    } as const;
  }, []);

  const active = data[network];

  const onSelectAo = useCallback(() => setNetwork("ao"), []);
  const onSelectBase = useCallback(() => setNetwork("base"), []);

  return (
    <main className="relative overflow-hidden">
      {/* soft background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fd-primary/12 blur-3xl" />
        <div className="absolute right-[-220px] top-[140px] h-[420px] w-[420px] rounded-full bg-fd-primary/10 blur-3xl" />
      </div>

      <div className={`${SITE_CONTAINER_CLASS} py-14 md:py-20`}>
        {/* Hero */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-fd-foreground md:text-6xl">
            The $ARIO Token
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-7 text-fd-muted-foreground md:text-xl">
            $ARIO powers ar.io. It is the utility token that fuels gateway operations, protocol incentives, and ArNS smart domains.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ExternalButton
              href="https://coinmarketcap.com/currencies/ar-io-network/"
              variant="secondary"
            >
              CoinMarketCap
            </ExternalButton>
            <ExternalButton
              href="https://www.coingecko.com/en/coins/ar-io-network"
              variant="secondary"
            >
              CoinGecko
            </ExternalButton>
            <ExternalButton
              href="https://docs.ar.io/learn/token/get-the-token/"
              variant="ghost"
            >
              Learn more
            </ExternalButton>
          </div>
        </div>

        {/* Details */}
        <div className="mx-auto mt-10 max-w-5xl">
          <div
            className="relative overflow-hidden rounded-[2.25rem] border border-fd-border bg-fd-card p-8 shadow-sm"
            style={{
              background:
                "linear-gradient(to bottom right, rgb(var(--color-fd-card)) 0%, rgb(var(--color-fd-card)) 70%, rgb(223 214 247 / 0.35) 100%)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="relative">
                <div className="text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground">
                  {active.label}
                </div>
                <div className="mt-2 text-2xl font-bold tracking-tight text-fd-foreground">
                  Token details
                </div>
                <div className="mt-3 text-sm leading-6 text-fd-muted-foreground">
                  {active.description}
                </div>
              </div>

              <div className="relative flex items-center gap-3 self-start">
                <span className="text-sm font-semibold text-fd-muted-foreground">
                  Network:
                </span>
                <div className="inline-flex items-center gap-1 rounded-full border border-fd-border bg-fd-background/70 p-1">
                  <button
                    type="button"
                    onClick={onSelectAo}
                    className={
                      network === "ao"
                        ? "rounded-full bg-[#23232D] px-3 py-1.5 text-sm font-semibold text-[#F0F0F0] transition-colors"
                        : "rounded-full px-3 py-1.5 text-sm font-semibold text-fd-foreground hover:bg-fd-accent transition-colors"
                    }
                  >
                    AO
                  </button>
                  <button
                    type="button"
                    onClick={onSelectBase}
                    className={
                      network === "base"
                        ? "rounded-full bg-[#23232D] px-3 py-1.5 text-sm font-semibold text-[#F0F0F0] transition-colors"
                        : "rounded-full px-3 py-1.5 text-sm font-semibold text-fd-foreground hover:bg-fd-accent transition-colors"
                    }
                  >
                    Base
                  </button>
                </div>
              </div>
            </div>

            <div className="relative mt-6 space-y-4">
              <ContractRow
                label="Contract ID"
                value={active.contractId}
                explorerHref={active.explorer}
              />
            </div>

            <div className="relative mt-2">
              <div className="text-sm font-semibold text-fd-muted-foreground">
                Exchanges
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {active.exchanges.map((exchange) => (
                  <a
                    key={exchange.name}
                    href={exchange.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-fd-border bg-fd-background/70 px-4 py-2 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors"
                  >
                    {exchange.name}
                    <ExternalLink className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

