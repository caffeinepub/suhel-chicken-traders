import { useCartStore } from "@/stores/cartStore";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { RoosterLogoSvg } from "./SvgAssets";

export function Header() {
  const { items, toggleCart } = useCartStore();
  const [scrolled, setScrolled] = useState(false);
  const totalItems = items.length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(204,0,0,0.25)",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.6)" : "none",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "default",
          }}
        >
          <RoosterLogoSvg size={44} />
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(14px, 2.5vw, 18px)",
                color: "#FFFFFF",
                lineHeight: 1.1,
                letterSpacing: "0.02em",
              }}
            >
              Suhel Chicken Traders
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                color: "#FFD700",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Fresh &amp; Hygienic
            </div>
          </div>
        </motion.div>

        {/* Cart Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          onClick={toggleCart}
          aria-label={`Shopping cart, ${totalItems} items`}
          style={{
            position: "relative",
            background: "rgba(204,0,0,0.15)",
            border: "1px solid rgba(204,0,0,0.4)",
            borderRadius: "12px",
            padding: "10px 14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "white",
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            minHeight: "44px",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(204,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(204,0,0,0.15)";
          }}
        >
          <ShoppingCart size={20} color="#CC0000" />
          <span style={{ display: "none" }}>Cart</span>
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                position: "absolute",
                top: "-6px",
                right: "-6px",
                background: "#CC0000",
                color: "white",
                borderRadius: "50%",
                width: "22px",
                height: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                border: "2px solid #0D0D0D",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {totalItems}
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.header>
  );
}
