import { Download, QrCode, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

// Minimal QR code renderer using a canvas + data URL approach
// Uses a third-party QR encoding URL to generate the QR image
function QRCodeCanvas({
  value,
  size,
  fgColor,
  bgColor,
  canvasRef,
}: {
  value: string;
  size: number;
  fgColor: string;
  bgColor: string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    img.onload = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
    };

    // Use QR server API - this is a fallback; for offline we render a placeholder
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&color=${fgColor.replace("#", "")}&bgcolor=${bgColor.replace("#", "")}`;
    img.crossOrigin = "anonymous";

    // If image fails to load, draw a placeholder pattern
    img.onerror = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);

      // Draw a simple grid pattern to indicate QR code
      ctx.fillStyle = fgColor;
      const cellSize = size / 21;

      // Corner squares
      const corners = [
        [0, 0],
        [14, 0],
        [0, 14],
      ];
      for (const [cx, cy] of corners) {
        // Outer square
        ctx.fillRect(cx * cellSize, cy * cellSize, 7 * cellSize, 7 * cellSize);
        ctx.fillStyle = bgColor;
        ctx.fillRect(
          (cx + 1) * cellSize,
          (cy + 1) * cellSize,
          5 * cellSize,
          5 * cellSize,
        );
        ctx.fillStyle = fgColor;
        ctx.fillRect(
          (cx + 2) * cellSize,
          (cy + 2) * cellSize,
          3 * cellSize,
          3 * cellSize,
        );
        ctx.fillStyle = fgColor;
      }

      // Central data area dots
      for (let row = 8; row < 13; row++) {
        for (let col = 8; col < 13; col++) {
          if ((row + col) % 2 === 0) {
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
          }
        }
      }
    };
  }, [value, size, fgColor, bgColor, canvasRef]);

  return (
    <>
      {/* Hidden img used to load QR */}
      <img ref={imgRef} alt="" style={{ display: "none" }} />
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ borderRadius: "4px" }}
      />
    </>
  );
}

export function QRCodeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://suhelchickentraders.app";

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a download canvas with label
    const downloadCanvas = document.createElement("canvas");
    const size = 400;
    downloadCanvas.width = size;
    downloadCanvas.height = size + 60;

    const ctx = downloadCanvas.getContext("2d");
    if (!ctx) return;

    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, downloadCanvas.width, downloadCanvas.height);

    // Draw QR code
    ctx.drawImage(canvas, 0, 0, size, size);

    // Draw label below QR
    ctx.fillStyle = "#CC0000";
    ctx.font = "bold 22px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Suhel Chicken Traders", size / 2, size + 38);

    // Download
    const link = document.createElement("a");
    link.download = "suhel-chicken-traders-qr.png";
    link.href = downloadCanvas.toDataURL("image/png");
    link.click();
  }, []);

  return (
    <section
      style={{
        background:
          "linear-gradient(180deg, #0D0D0D 0%, #111111 50%, #0D0D0D 100%)",
        borderTop: "1px solid rgba(204,0,0,0.15)",
        borderBottom: "1px solid rgba(204,0,0,0.15)",
        padding: "72px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(204,0,0,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ maxWidth: "720px", margin: "0 auto", position: "relative" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          {/* Icon badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(204,0,0,0.12)",
              border: "1px solid rgba(204,0,0,0.3)",
              borderRadius: "100px",
              padding: "6px 16px 6px 10px",
              marginBottom: "20px",
            }}
          >
            <Smartphone size={14} color="#CC0000" />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                color: "#CC0000",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Mobile App
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 5vw, 42px)",
              color: "#FFFFFF",
              margin: "0 0 12px",
              lineHeight: 1.2,
            }}
          >
            Scan Karke App Kholen
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              color: "rgba(255,255,255,0.5)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Apne phone se scan karein aur seedha order karein
          </p>
        </motion.div>

        {/* QR Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              background: "#1A1A1A",
              border: "1.5px solid rgba(204,0,0,0.4)",
              borderRadius: "20px",
              padding: "32px",
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              boxShadow:
                "0 0 0 1px rgba(204,0,0,0.1), 0 8px 32px rgba(0,0,0,0.6), 0 0 60px rgba(204,0,0,0.08)",
            }}
          >
            {/* Inner white frame */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "12px",
                padding: "16px",
                border: "2px solid rgba(204,0,0,0.25)",
                boxShadow: "0 4px 20px rgba(204,0,0,0.15)",
              }}
            >
              <QRCodeCanvas
                value={appUrl}
                size={200}
                fgColor="#CC0000"
                bgColor="#FFFFFF"
                canvasRef={canvasRef}
              />
            </div>

            {/* Label */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "#FFFFFF",
                  marginBottom: "4px",
                }}
              >
                Suhel Chicken Traders
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.03em",
                  wordBreak: "break-all",
                  maxWidth: "220px",
                }}
              >
                {appUrl}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 24px rgba(204,0,0,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDownload}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "linear-gradient(135deg, #CC0000 0%, #8B0000 100%)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "12px",
              padding: "14px 28px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              cursor: "pointer",
              letterSpacing: "0.02em",
              transition: "box-shadow 0.2s",
            }}
          >
            <Download size={18} />
            QR Code Download Karein
          </motion.button>
        </motion.div>

        {/* Info pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          {[
            { icon: <QrCode size={14} />, text: "Camera se scan karein" },
            {
              icon: <Smartphone size={14} />,
              text: "Kisi bhi phone mein kaam karta hai",
            },
            {
              icon: <Download size={14} />,
              text: "Print karke shop pe lagayen",
            },
          ].map(({ icon, text }) => (
            <div
              key={text}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "100px",
                padding: "8px 16px",
              }}
            >
              <span style={{ color: "#CC0000" }}>{icon}</span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
