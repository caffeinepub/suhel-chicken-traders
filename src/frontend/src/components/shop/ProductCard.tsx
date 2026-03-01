import { useCartStore } from "@/stores/cartStore";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { CuttingChickenSvg, ZindaChickenSvg } from "./SvgAssets";

interface ProductCardProps {
  id: "cutting" | "zinda";
  name: string;
  pricePerKg: number;
  inStock: boolean;
  freshToday: boolean;
}

const CUTTING_WEIGHT_PRESETS = [
  { label: "250g", value: 250 },
  { label: "500g", value: 500 },
  { label: "750g", value: 750 },
  { label: "1 kg", value: 1000 },
];

const ZINDA_WEIGHT_PRESETS = [
  { label: "1 kg", value: 1000 },
  { label: "1.5 kg", value: 1500 },
  { label: "1.6 kg", value: 1600 },
  { label: "1.7 kg", value: 1700 },
  { label: "1.8 kg", value: 1800 },
  { label: "2 kg", value: 2000 },
  { label: "2.5 kg", value: 2500 },
];

function calcPrice(weightGrams: number, pricePerKg: number): number {
  return Math.round((weightGrams / 1000) * pricePerKg * 100) / 100;
}

export function ProductCard({
  id,
  name,
  pricePerKg,
  inStock,
  freshToday,
}: ProductCardProps) {
  const [weight, setWeight] = useState(id === "zinda" ? 1000 : 500);
  const [customInput, setCustomInput] = useState("");
  const [addedAnim, setAddedAnim] = useState(false);
  const { addItem, openCart } = useCartStore();

  const totalPrice = calcPrice(weight, pricePerKg);
  const isCutting = id === "cutting";
  const WEIGHT_PRESETS = isCutting
    ? CUTTING_WEIGHT_PRESETS
    : ZINDA_WEIGHT_PRESETS;

  const handleWeightPreset = useCallback((val: number) => {
    setWeight(val);
    setCustomInput("");
  }, []);

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value));
    setCustomInput("");
  }, []);

  const handleCustomInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setCustomInput(val);
      const num = Number(val);
      if (num >= 100 && num <= 5000) {
        setWeight(num);
      }
    },
    [],
  );

  const maxWeight = isCutting ? 2000 : 2500;
  const minWeight = isCutting ? 100 : 1000;

  const handleIncrement = useCallback(() => {
    setWeight((prev) => Math.min(prev + 50, maxWeight));
    setCustomInput("");
  }, [maxWeight]);

  const handleDecrement = useCallback(() => {
    setWeight((prev) => Math.max(prev - 50, minWeight));
    setCustomInput("");
  }, [minWeight]);

  const handleAddToCart = useCallback(() => {
    if (!inStock) return;
    addItem({
      id,
      name,
      weightGrams: weight,
      pricePerKg,
      totalPrice,
    });
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 600);
    openCart();
  }, [id, name, weight, pricePerKg, totalPrice, inStock, addItem, openCart]);

  const accentColor = isCutting ? "#CC0000" : "#B5631A";
  const accentColorLight = isCutting ? "#FF4444" : "#D4883A";

  return (
    <motion.div
      whileHover={
        inStock
          ? {
              y: -10,
              boxShadow: isCutting
                ? "0 24px 56px rgba(204,0,0,0.45), 0 4px 16px rgba(0,0,0,0.6)"
                : "0 24px 56px rgba(181,99,26,0.45), 0 4px 16px rgba(0,0,0,0.6)",
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="card-glass"
      style={{
        borderRadius: "22px",
        overflow: "hidden",
        border: `1px solid ${accentColor}28`,
        position: "relative",
        width: "100%",
        maxWidth: "420px",
        flex: "1 1 340px",
      }}
    >
      {/* Card Header */}
      <div
        style={{
          background: isCutting
            ? "linear-gradient(160deg, #D10000 0%, #AA0000 45%, #7A0000 100%)"
            : "linear-gradient(160deg, #C06020 0%, #96420E 45%, #6B2800 100%)",
          padding: "22px 24px 18px",
          position: "relative",
          overflow: "hidden",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.12) inset, 0 -1px 0 rgba(0,0,0,0.35) inset",
        }}
      >
        {/* Header sheen — diagonal highlight */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-40%",
            width: "60%",
            height: "100%",
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 55%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Top edge light catch */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 5%, rgba(255,160,160,0.4) 50%, transparent 95%)",
            pointerEvents: "none",
          }}
        />
        {/* Radial orb top-right */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 900,
                fontSize: "26px",
                color: "white",
                margin: 0,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              }}
            >
              {name}
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.75)",
                margin: "5px 0 0",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              ₹{pricePerKg}{" "}
              <span style={{ fontWeight: 400, opacity: 0.65 }}>/ kg</span>
            </p>
          </div>

          {freshToday && (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              className="pulse-gold"
              style={{
                background: "#FFD700",
                color: "#1A1A1A",
                borderRadius: "20px",
                padding: "5px 12px",
                fontSize: "11px",
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                whiteSpace: "nowrap",
              }}
            >
              <Star size={10} fill="#1A1A1A" />
              Today Fresh
            </motion.div>
          )}
        </div>
      </div>

      {/* Illustration */}
      <div
        style={{
          padding: "20px 24px 12px",
          display: "flex",
          justifyContent: "center",
          background: `linear-gradient(180deg, ${accentColor}12 0%, transparent 100%)`,
        }}
      >
        {isCutting ? <CuttingChickenSvg /> : <ZindaChickenSvg />}
      </div>

      {/* Controls */}
      <div style={{ padding: "0 24px 24px" }}>
        {/* Weight Presets */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          {WEIGHT_PRESETS.map((preset) => (
            <motion.button
              key={preset.value}
              whileTap={{ scale: 0.94 }}
              onClick={() => handleWeightPreset(preset.value)}
              disabled={!inStock}
              style={{
                padding: "8px 14px",
                borderRadius: "20px",
                border: `1.5px solid ${weight === preset.value ? accentColor : "rgba(255,255,255,0.15)"}`,
                background:
                  weight === preset.value ? `${accentColor}22` : "transparent",
                color:
                  weight === preset.value
                    ? accentColorLight
                    : "rgba(255,255,255,0.7)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: weight === preset.value ? 600 : 400,
                cursor: inStock ? "pointer" : "not-allowed",
                transition: "all 0.2s ease",
                minHeight: "36px",
              }}
            >
              {preset.label}
            </motion.button>
          ))}
        </div>

        {/* Slider + Controls */}
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Weight
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleDecrement}
                disabled={!inStock || weight <= minWeight}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "6px",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor:
                    inStock && weight > minWeight ? "pointer" : "not-allowed",
                  color: "white",
                }}
              >
                <Minus size={12} />
              </motion.button>
              <input
                type="number"
                value={customInput || weight}
                onChange={handleCustomInput}
                disabled={!inStock}
                min={100}
                max={5000}
                step={50}
                aria-label="Weight in grams"
                style={{
                  width: "72px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  color: "white",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  padding: "4px 8px",
                  textAlign: "center",
                  outline: "none",
                  minHeight: "36px",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                g
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleIncrement}
                disabled={!inStock || weight >= maxWeight}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "6px",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor:
                    inStock && weight < maxWeight ? "pointer" : "not-allowed",
                  color: "white",
                }}
              >
                <Plus size={12} />
              </motion.button>
            </div>
          </div>
          <input
            type="range"
            min={minWeight}
            max={maxWeight}
            step={isCutting ? 50 : 100}
            value={weight}
            onChange={handleSlider}
            disabled={!inStock}
            aria-label={`Weight slider, current: ${weight}g`}
            style={{
              width: "100%",
              height: "6px",
              borderRadius: "3px",
              background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${((weight - minWeight) / (maxWeight - minWeight)) * 100}%, rgba(255,255,255,0.12) ${((weight - minWeight) / (maxWeight - minWeight)) * 100}%, rgba(255,255,255,0.12) 100%)`,
              outline: "none",
              cursor: inStock ? "pointer" : "not-allowed",
              accentColor: accentColor,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "4px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.3)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {isCutting ? "100g" : "1 kg"}
            </span>
            <span
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.3)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {isCutting ? "2 kg" : "2.5 kg"}
            </span>
          </div>
        </div>

        {/* Price Display */}
        <div
          className="price-jewel"
          style={{
            textAlign: "center",
            padding: "18px 16px 16px",
            borderRadius: "14px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "'Inter', sans-serif",
              marginBottom: "2px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Total for {weight}g
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${totalPrice}-${weight}`}
              initial={{ scale: 1.3, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.28 }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 900,
                fontSize: "48px",
                lineHeight: 1,
                display: "inline-block",
                background:
                  "linear-gradient(180deg, #FFE57F 0%, #FFD700 50%, #FFA500 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 2px 8px rgba(255,180,0,0.35))",
              }}
            >
              ₹{totalPrice.toFixed(2)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={inStock ? { scale: 1.02, y: -2 } : {}}
          whileTap={inStock ? { scale: 0.97 } : {}}
          onClick={handleAddToCart}
          disabled={!inStock}
          animate={addedAnim ? { scale: [1, 1.06, 1] } : {}}
          className={inStock ? (isCutting ? "btn-cta-red" : "") : ""}
          style={{
            width: "100%",
            padding: "17px",
            borderRadius: "14px",
            border:
              inStock && !isCutting
                ? "1px solid rgba(181,99,26,0.3)"
                : inStock
                  ? undefined
                  : "1px solid rgba(255,255,255,0.06)",
            background: inStock
              ? isCutting
                ? undefined /* handled by btn-cta-red */
                : "linear-gradient(180deg, #C87030 0%, #965018 60%, #6B3000 100%)"
              : "rgba(255,255,255,0.06)",
            color: inStock ? "white" : "rgba(255,255,255,0.25)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            cursor: inStock ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            boxShadow:
              inStock && !isCutting
                ? "0 1px 0 rgba(255,180,80,0.2) inset, 0 -1px 0 rgba(0,0,0,0.4) inset, 0 8px 28px rgba(181,99,26,0.45)"
                : !inStock
                  ? "none"
                  : undefined,
            minHeight: "54px",
            letterSpacing: "0.01em",
          }}
        >
          <ShoppingCart size={20} />
          <span>{inStock ? "Add to Cart" : "Out of Stock"}</span>
        </motion.button>
      </div>

      {/* Out of Stock Overlay */}
      <AnimatePresence>
        {!inStock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.72)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "20px",
              zIndex: 5,
              backdropFilter: "blur(2px)",
            }}
          >
            <div
              style={{
                background: "rgba(139,0,0,0.9)",
                border: "2px solid #CC0000",
                borderRadius: "12px",
                padding: "16px 32px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "white",
                  margin: 0,
                }}
              >
                Out of Stock
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.7)",
                  margin: "6px 0 0",
                }}
              >
                Check back soon!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
