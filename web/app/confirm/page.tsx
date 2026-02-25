"use client";

import { useEffect, useState } from "react";
import { APP_DEEP_LINK } from "@/lib/constants";

export default function ConfirmPage() {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    window.location.href = APP_DEEP_LINK;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="bg-surface border border-border rounded-2xl p-8 max-w-sm w-full text-center shadow-sm">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
          <svg
            className="w-10 h-10 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-text-primary mb-2">
          ¡Correo verificado!
        </h1>
        <p className="text-text-secondary text-sm mb-8">
          Tu cuenta está activa. Abriendo TocToc…
        </p>

        <a
          href={APP_DEEP_LINK}
          className="block w-full bg-primary text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors mb-4"
        >
          Abrir TocToc
        </a>

        <p className="text-text-tertiary text-xs">
          {countdown > 0
            ? `Abriendo automáticamente en ${countdown}…`
            : "Si la app no abrió, usa el botón de arriba."}
        </p>
      </div>
    </div>
  );
}
