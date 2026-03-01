import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed
    const alreadyDismissed = localStorage.getItem("installBannerDismissed");
    if (alreadyDismissed) return;

    // Check if already installed (standalone mode)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone ===
        true;
    if (isStandalone) return;

    // Detect iOS
    const ios =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIOS(ios);

    // Always show banner after 2 seconds for all devices
    const timer = setTimeout(() => setShowBanner(true), 2000);

    // Also listen for Android/Chrome install prompt to enable native install button
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    localStorage.setItem("installBannerDismissed", "true");
  };

  if (!showBanner || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "linear-gradient(135deg, #B91C1C, #7F1D1D)",
        borderTop: "2px solid #EF4444",
        padding: "14px 16px",
        boxShadow: "0 -4px 24px rgba(185,28,28,0.5)",
        animation: "slideUp 0.4s ease-out",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: "24px",
          }}
        >
          🐔
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: "14px",
              lineHeight: "1.3",
            }}
          >
            Home Screen pe Install Karein!
          </div>
          <div
            style={{
              color: "#FCA5A5",
              fontSize: "12px",
              marginTop: "2px",
              lineHeight: "1.4",
            }}
          >
            {isIOS
              ? 'Safari mein Share button daba ke "Add to Home Screen" tap karein'
              : "Ek tap mein app jaisa icon ban jayega phone mein"}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          {!isIOS && deferredPrompt && (
            <button
              type="button"
              onClick={handleInstall}
              style={{
                background: "#fff",
                color: "#B91C1C",
                border: "none",
                borderRadius: "8px",
                padding: "8px 14px",
                fontWeight: "700",
                fontSize: "13px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Install
            </button>
          )}
          <button
            type="button"
            onClick={handleDismiss}
            style={{
              background: "transparent",
              color: "#FCA5A5",
              border: "1px solid #EF4444",
              borderRadius: "8px",
              padding: "8px 10px",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* iOS arrow hint */}
      {isIOS && (
        <div
          style={{
            textAlign: "center",
            color: "#FEE2E2",
            fontSize: "12px",
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <span>Neeche Share</span>
          <span style={{ fontSize: "16px" }}>⬆️</span>
          <span>button dabao phir "Add to Home Screen"</span>
        </div>
      )}
    </div>
  );
}
