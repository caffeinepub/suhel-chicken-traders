import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { type Variants, motion } from "motion/react";
import { HeroRoosterSvg } from "./SvgAssets";

const particles = [
  { cx: "15%", cy: "20%", size: 6, color: "#CC0000", delay: 0, duration: 3.2 },
  {
    cx: "85%",
    cy: "15%",
    size: 4,
    color: "#FFD700",
    delay: 0.5,
    duration: 2.8,
  },
  {
    cx: "70%",
    cy: "75%",
    size: 8,
    color: "#CC0000",
    delay: 1.0,
    duration: 3.5,
  },
  {
    cx: "20%",
    cy: "65%",
    size: 5,
    color: "#FFD700",
    delay: 0.3,
    duration: 2.5,
  },
  {
    cx: "90%",
    cy: "45%",
    size: 4,
    color: "#CC0000",
    delay: 0.8,
    duration: 3.0,
  },
  {
    cx: "45%",
    cy: "10%",
    size: 5,
    color: "#FFD700",
    delay: 1.2,
    duration: 2.7,
  },
  { cx: "5%", cy: "45%", size: 3, color: "#CC0000", delay: 0.6, duration: 3.3 },
  {
    cx: "60%",
    cy: "90%",
    size: 6,
    color: "#FFD700",
    delay: 1.5,
    duration: 2.9,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #8B0000 0%, #CC0000 28%, #2A0808 58%, #0D0D0D 100%)",
        paddingTop: "72px",
      }}
    >
      {/* Noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* Radial light center */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(204,0,0,0.25) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating Particles */}
      {particles.map((p) => (
        <div
          key={`particle-${p.cx}-${p.cy}`}
          style={{
            position: "absolute",
            left: p.cx,
            top: p.cy,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: p.color,
            opacity: 0.6,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          padding: "40px 24px",
          textAlign: "center",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div
            className="pulse-gold"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "1.5px solid #FFD700",
              borderRadius: "999px",
              padding: "8px 20px",
              color: "#FFD700",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "rgba(255,215,0,0.08)",
            }}
          >
            <MapPin size={14} color="#FFD700" />
            <span>Serving Only Kotma</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div variants={itemVariants} className="hero-heading-glow">
          <h1
            className="shimmer-text"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(40px, 9vw, 92px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Suhel Chicken
          </h1>
          {/* "Traders" on its own line — larger, italic accent */}
          <p
            className="shimmer-text"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(44px, 10vw, 106px)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              margin: "0",
              display: "block",
            }}
          >
            Traders
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.div variants={itemVariants}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "32px",
                background:
                  "linear-gradient(to right, transparent, rgba(255,215,0,0.7))",
              }}
            />
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(14px, 2vw, 18px)",
                color: "#FFD700",
                fontWeight: 500,
                margin: 0,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Fresh &amp; Hygienic Chicken in Kotma
            </p>
            <div
              style={{
                height: "1px",
                width: "32px",
                background:
                  "linear-gradient(to left, transparent, rgba(255,215,0,0.7))",
              }}
            />
          </div>
        </motion.div>

        {/* Hero Chicken SVG */}
        <motion.div
          variants={itemVariants}
          className="float-anim"
          style={{ filter: "drop-shadow(0 16px 32px rgba(204,0,0,0.4))" }}
        >
          <HeroRoosterSvg />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {/* Call Button 1 — primary red CTA */}
          <motion.a
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.96 }}
            href="tel:9301567327"
            className="btn-cta-red"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              color: "white",
              borderRadius: "14px",
              padding: "15px 26px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              textDecoration: "none",
              minHeight: "54px",
              letterSpacing: "0.01em",
            }}
          >
            <Phone size={18} />
            <span>930-156-7327</span>
          </motion.a>

          {/* Call Button 2 — glass outline */}
          <motion.a
            whileHover={{
              scale: 1.04,
              y: -3,
              borderColor: "#CC0000",
              background: "rgba(204,0,0,0.12)",
            }}
            whileTap={{ scale: 0.96 }}
            href="tel:7000424742"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              background: "rgba(204,0,0,0.07)",
              color: "white",
              borderRadius: "14px",
              padding: "15px 26px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              textDecoration: "none",
              border: "1.5px solid rgba(204,0,0,0.55)",
              boxShadow:
                "0 1px 0 rgba(255,80,80,0.1) inset, 0 4px 16px rgba(204,0,0,0.2)",
              minHeight: "54px",
              letterSpacing: "0.01em",
              backdropFilter: "blur(8px)",
            }}
          >
            <Phone size={18} color="#FF6666" />
            <span>700-042-4742</span>
          </motion.a>

          {/* WhatsApp — tactile green CTA */}
          <motion.a
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.96 }}
            href="https://wa.me/919301567327?text=Hi%20Suhel%20Chicken%20Traders%2C%20I%20want%20to%20place%20an%20order"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-wa"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              color: "white",
              borderRadius: "14px",
              padding: "15px 26px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              textDecoration: "none",
              minHeight: "54px",
              letterSpacing: "0.01em",
            }}
          >
            <MessageCircle size={18} />
            <span>WhatsApp Order</span>
          </motion.a>

          {/* Instagram — glass outline */}
          <motion.a
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.96 }}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              background:
                "linear-gradient(145deg, rgba(64,93,230,0.85), rgba(131,58,180,0.9), rgba(193,53,132,0.85), rgba(253,29,29,0.8))",
              color: "white",
              borderRadius: "14px",
              padding: "15px 26px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              textDecoration: "none",
              boxShadow:
                "0 1px 0 rgba(255,200,255,0.15) inset, 0 -1px 0 rgba(0,0,0,0.3) inset, 0 8px 28px rgba(193,53,132,0.45)",
              border: "1px solid rgba(255,150,200,0.12)",
              minHeight: "54px",
              letterSpacing: "0.01em",
            }}
          >
            <Instagram size={18} />
            <span>Instagram</span>
          </motion.a>
        </motion.div>

        {/* Hours note */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "rgba(255,255,255,0.65)",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
          }}
        >
          <Clock size={14} />
          <span>Open Daily — Fresh Stock Every Morning</span>
        </motion.div>
      </motion.div>

      {/* Kotma Only Ribbon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(139,0,0,0.85)",
          backdropFilter: "blur(8px)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          borderTop: "1px solid rgba(204,0,0,0.4)",
        }}
      >
        <MapPin size={16} color="#FFD700" />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            color: "#FFFFFF",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Kotma Only Delivery — We don't deliver outside Kotma
        </span>
        <MapPin size={16} color="#FFD700" />
      </motion.div>
    </section>
  );
}
