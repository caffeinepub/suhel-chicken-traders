import { Heart, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { RoosterLogoSvg } from "./SvgAssets";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #111111 0%, #0D0D0D 100%)",
        borderTop: "1px solid rgba(204,0,0,0.2)",
        padding: "56px 24px 32px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px",
            marginBottom: "40px",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <RoosterLogoSvg size={40} />
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "white",
                    lineHeight: 1.2,
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
                    letterSpacing: "0.05em",
                  }}
                >
                  Fresh &amp; Hygienic
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Your trusted source for fresh, hygienic chicken in Kotma. Order
              online and get it delivered to your door.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                color: "white",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Contact Us
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <motion.a
                whileHover={{ x: 4 }}
                href="tel:9301567327"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "rgba(255,255,255,0.65)",
                  textDecoration: "none",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#CC0000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                }}
              >
                <Phone size={16} color="#CC0000" />
                <span>9301567327</span>
              </motion.a>
              <motion.a
                whileHover={{ x: 4 }}
                href="tel:7000424742"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "rgba(255,255,255,0.65)",
                  textDecoration: "none",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#CC0000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                }}
              >
                <Phone size={16} color="#CC0000" />
                <span>7000424742</span>
              </motion.a>
              <motion.a
                whileHover={{ x: 4 }}
                href="https://wa.me/919301567327?text=Hi%20Suhel%20Chicken%20Traders"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "rgba(255,255,255,0.65)",
                  textDecoration: "none",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#25D366";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                }}
              >
                <MessageCircle size={16} color="#25D366" />
                <span>WhatsApp: 9301567327</span>
              </motion.a>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                }}
              >
                <span style={{ fontSize: "16px" }}>📲</span>
                <span>
                  UPI:{" "}
                  <span style={{ color: "#FFD700", fontWeight: 600 }}>
                    9301567327
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Delivery & Social */}
          <div>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                color: "white",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Delivery Area
            </h4>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              <MapPin size={16} color="#FFD700" />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Kotma, Madhya Pradesh
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.35)",
                marginBottom: "20px",
              }}
            >
              We currently deliver only within Kotma. Enter "Kotma" in your
              address while ordering.
            </p>

            {/* Social Links */}
            <div style={{ display: "flex", gap: "12px" }}>
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.94 }}
                href="https://wa.me/919301567327"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MessageCircle size={18} color="white" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.94 }}
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(45deg, #405DE6, #833AB4, #C13584, #E1306C)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Instagram size={18} color="white" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.94 }}
                href="tel:9301567327"
                aria-label="Call us"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #CC0000, #8B0000)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Phone size={18} color="white" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.3)",
              margin: 0,
            }}
          >
            © {year} Suhel Chicken Traders. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.3)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.3)";
            }}
          >
            Built with <Heart size={12} fill="currentColor" /> using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
