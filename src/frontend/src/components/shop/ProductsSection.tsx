import { useAdminStore } from "@/stores/adminStore";
import { motion } from "motion/react";
import { ProductCard } from "./ProductCard";

export function ProductsSection() {
  const {
    cuttingPrice,
    zindaPrice,
    cuttingInStock,
    zindaInStock,
    cuttingFreshToday,
    zindaFreshToday,
  } = useAdminStore();

  return (
    <section
      id="products"
      style={{
        padding: "80px 24px",
        background: "linear-gradient(180deg, #0D0D0D 0%, #111111 100%)",
        minHeight: "600px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "linear-gradient(to right, transparent, #CC0000)",
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                color: "#CC0000",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Our Menu
            </span>
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "linear-gradient(to left, transparent, #CC0000)",
              }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(32px, 5vw, 52px)",
              color: "white",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Our Products
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              color: "rgba(255,255,255,0.5)",
              margin: "12px 0 0",
            }}
          >
            Choose your cut, select your weight, and order instantly
          </p>
        </motion.div>

        {/* Product Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "28px",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            style={{ flex: "1 1 340px", maxWidth: "420px" }}
          >
            <ProductCard
              id="cutting"
              name="Cutting Chicken"
              pricePerKg={cuttingPrice}
              inStock={cuttingInStock}
              freshToday={cuttingFreshToday}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.22, ease: "easeOut" }}
            style={{ flex: "1 1 340px", maxWidth: "420px" }}
          >
            <ProductCard
              id="zinda"
              name="Zinda Chicken"
              pricePerKg={zindaPrice}
              inStock={zindaInStock}
              freshToday={zindaFreshToday}
            />
          </motion.div>
        </motion.div>

        {/* Hygiene Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: "56px",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {[
            { icon: "🧊", label: "Always Fresh", desc: "Daily fresh stock" },
            { icon: "🔪", label: "Clean Cut", desc: "Hygienic cutting" },
            { icon: "⚖️", label: "Exact Weight", desc: "Accurate weighing" },
            {
              icon: "🚚",
              label: "Kotma Delivery",
              desc: "Local delivery only",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minWidth: "180px",
              }}
            >
              <span style={{ fontSize: "24px" }}>{item.icon}</span>
              <div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "13px",
                    color: "white",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
