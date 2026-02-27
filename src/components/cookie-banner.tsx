"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// --- Types ---

type ConsentCategory = "necessary" | "analytics" | "marketing";

interface ConsentState {
  necessary: boolean; // always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const COOKIE_NAME = "cookie_consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 12 months in seconds

// --- Helpers ---

function getStoredConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.split("=")[1]));
  } catch {
    return null;
  }
}

function setConsentCookie(consent: ConsentState) {
  const value = encodeURIComponent(JSON.stringify(consent));
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

// --- GTM / Consent Mode v2 ---

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function pushConsentDefault() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "consent_default",
    "gtm.start": new Date().getTime(),
  });
  // Google Consent Mode v2 default: deny all
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });
}

function pushConsentUpdate(consent: ConsentState) {
  window.dataLayer = window.dataLayer || [];
  gtag("consent", "update", {
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
    analytics_storage: consent.analytics ? "granted" : "denied",
  });
  window.dataLayer.push({
    event: "consent_update",
    consent_analytics: consent.analytics,
    consent_marketing: consent.marketing,
  });
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments as unknown as Record<string, unknown>);
}

// --- Category config ---

const CATEGORIES: {
  key: ConsentCategory;
  label: string;
  desc: string;
  locked?: boolean;
}[] = [
  {
    key: "necessary",
    label: "Notwendig",
    desc: "Technisch erforderliche Cookies f\u00FCr den Betrieb der Website.",
    locked: true,
  },
  {
    key: "analytics",
    label: "Statistik",
    desc: "Helfen uns zu verstehen, wie Besucher die Website nutzen (z.B. Google Analytics).",
  },
  {
    key: "marketing",
    label: "Marketing",
    desc: "Werden verwendet, um Werbung relevanter zu gestalten (z.B. Google Ads).",
  },
];

// --- Component ---

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: "",
  });

  useEffect(() => {
    // Set consent default for GTM before anything else
    pushConsentDefault();

    const stored = getStoredConsent();
    if (stored) {
      // Consent already given — push update to GTM
      pushConsentUpdate(stored);
      setConsent(stored);
    } else {
      // No consent yet — show banner
      setVisible(true);
    }
  }, []);

  const saveConsent = useCallback((newConsent: ConsentState) => {
    const withTimestamp = { ...newConsent, timestamp: new Date().toISOString() };
    setConsentCookie(withTimestamp);
    pushConsentUpdate(withTimestamp);
    setConsent(withTimestamp);
    setVisible(false);
    setShowDetails(false);
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({ necessary: true, analytics: true, marketing: true, timestamp: "" });
  }, [saveConsent]);

  const rejectAll = useCallback(() => {
    saveConsent({ necessary: true, analytics: false, marketing: false, timestamp: "" });
  }, [saveConsent]);

  const saveSelection = useCallback(() => {
    saveConsent(consent);
  }, [consent, saveConsent]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-5 shadow-lg sm:p-6">
        {!showDetails ? (
          <>
            <h2 className="text-base font-semibold text-gray-800">
              Cookie-Einstellungen
            </h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Wir verwenden Cookies, um die Website zu verbessern und den
              Datenverkehr zu analysieren. Sie k&ouml;nnen selbst entscheiden,
              welche Kategorien Sie zulassen m&ouml;chten.{" "}
              <Link
                href="/datenschutz"
                className="text-brand hover:underline"
              >
                Datenschutzerkl&auml;rung
              </Link>
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={acceptAll}
                className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={rejectAll}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Nur notwendige
              </button>
              <button
                onClick={() => setShowDetails(true)}
                className="px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
              >
                Einstellungen
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-base font-semibold text-gray-800">
              Cookie-Einstellungen
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              W&auml;hlen Sie, welche Cookie-Kategorien Sie zulassen
              m&ouml;chten.
            </p>
            <div className="mt-4 space-y-3">
              {CATEGORIES.map((cat) => (
                <label
                  key={cat.key}
                  className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
                    consent[cat.key]
                      ? "border-brand/30 bg-brand/5"
                      : "border-gray-200"
                  } ${cat.locked ? "cursor-default" : "cursor-pointer"}`}
                >
                  <input
                    type="checkbox"
                    checked={consent[cat.key]}
                    disabled={cat.locked}
                    onChange={(e) =>
                      setConsent((prev) => ({
                        ...prev,
                        [cat.key]: e.target.checked,
                      }))
                    }
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand disabled:opacity-60"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">
                        {cat.label}
                      </span>
                      {cat.locked && (
                        <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
                          Immer aktiv
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">{cat.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={saveSelection}
                className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
              >
                Auswahl speichern
              </button>
              <button
                onClick={acceptAll}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={() => setShowDetails(false)}
                className="px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
              >
                Zur&uuml;ck
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// --- Reopen button for footer/datenschutz ---

export function CookieSettingsButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function reopenBanner() {
    // Delete cookie to re-show banner
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
    window.location.reload();
  }

  if (!mounted) return null;

  return (
    <button
      onClick={reopenBanner}
      className="py-1 text-inherit transition-colors hover:text-gray-600"
    >
      Cookie-Einstellungen
    </button>
  );
}
