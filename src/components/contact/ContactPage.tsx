"use client";

import { useCallback } from "react";
import { Calendar, ClipboardList } from "lucide-react";
import { BaseImage } from "@/components/base-image";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";
import {
  CONTACT_CAL_CONFIG_JSON,
  CONTACT_CAL_LINK,
  CONTACT_CAL_NAMESPACE,
  CONTACT_FORM_URL,
} from "@/lib/contact";

export function ContactPage() {
  const onScheduleIntro = useCallback(() => {
    window.dispatchEvent(new Event("ar-io:schedule-intro"));
  }, []);

  const onOpenContactForm = useCallback(() => {
    window.dispatchEvent(new Event("ar-io:open-contact-form"));
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-12 pt-20`}>
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-fd-foreground md:text-6xl">
            Contact
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-7 text-fd-muted-foreground">
            Get in touch with the ar.io team. We’re here to help.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className={`${SITE_CONTAINER_CLASS} pb-20 pt-10`}>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Talk to Sales */}
          <div
            className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-fd-border shadow-sm"
            style={{
              background:
                "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(223 214 247))",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />
            <div className="relative flex h-full flex-col p-6">
              <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
                Talk to Sales
              </h2>
              <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
                Evaluating ar.io for enterprise, institutional, or large-scale infrastructure? Let’s talk.
              </p>
              <div className="mt-auto pt-8">
                <button
                  type="button"
                  onClick={onScheduleIntro}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#23232D] px-4 py-2.5 text-sm font-semibold text-[#F0F0F0] hover:opacity-90 transition-opacity"
                >
                  <Calendar className="size-4 shrink-0" />
                  Book a Demo
                </button>
                {/* Keep the Cal embed attributes here for a direct overlay fallback if needed. */}
                <span
                  className="hidden"
                  data-cal-link={CONTACT_CAL_LINK}
                  data-cal-namespace={CONTACT_CAL_NAMESPACE}
                  data-cal-config={CONTACT_CAL_CONFIG_JSON}
                />
              </div>
            </div>
          </div>

          {/* General Inquiries */}
          <div
            className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-fd-border shadow-sm"
            style={{
              background:
                "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(223 214 247))",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />
            <div className="relative flex h-full flex-col p-6">
              <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
                General Inquiries
              </h2>
              <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
                Not ready for a meeting? Share a few details and we’ll follow up.
              </p>
              <div className="mt-auto pt-8">
                <button
                  type="button"
                  onClick={onOpenContactForm}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#23232D] px-4 py-2.5 text-sm font-semibold text-[#F0F0F0] hover:opacity-90 transition-opacity"
                >
                  <ClipboardList className="size-4 shrink-0" />
                  Contact Us
                </button>
                {/* Keep the URL accessible for non-modal fallback / crawlers */}
                <a className="sr-only" href={CONTACT_FORM_URL}>
                  Contact form
                </a>
              </div>
            </div>
          </div>

          {/* Community & Technical Questions */}
          <div
            className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-fd-border shadow-sm"
            style={{
              background:
                "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(223 214 247))",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />
            <div className="relative flex h-full flex-col p-6">
              <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
                Community & Technical Questions
              </h2>
              <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
                Have a technical question or looking to connect with the ecosystem?
              </p>
              <div className="mt-auto pt-8">
                <a
                  href="https://discord.com/invite/HGG52EtTc2"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#23232D] px-4 py-2.5 text-sm font-semibold text-[#F0F0F0] hover:opacity-90 transition-opacity"
                >
                  <BaseImage
                    src="/icons/discord-icon.svg"
                    alt="Discord"
                    width={16}
                    height={16}
                    className="shrink-0 brightness-0 invert"
                  />
                  Join the Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}