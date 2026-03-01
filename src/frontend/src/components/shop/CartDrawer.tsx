import { useAppStore } from "@/stores/appStore";
import { useCartStore } from "@/stores/cartStore";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, getTotalPrice } =
    useCartStore();
  const { openCheckout } = useAppStore();

  const total = getTotalPrice();

  const handleCheckout = () => {
    closeCart();
    openCheckout();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              zIndex: 200,
              cursor: "pointer",
            }}
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(420px, 100vw)",
              background:
                "linear-gradient(160deg, rgba(28,8,8,0.98) 0%, rgba(18,18,18,0.99) 50%, rgba(12,12,12,1) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              zIndex: 201,
              display: "flex",
              flexDirection: "column",
              boxShadow:
                "-1px 0 0 rgba(204,0,0,0.12), -12px 0 60px rgba(0,0,0,0.8), -40px 0 80px rgba(0,0,0,0.4)",
              overscrollBehavior: "contain",
              borderLeft: "1px solid rgba(204,0,0,0.1)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background:
                  "linear-gradient(135deg, rgba(139,0,0,0.3), rgba(0,0,0,0.3))",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <ShoppingCart size={22} color="#CC0000" />
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "22px",
                    color: "white",
                    margin: 0,
                  }}
                >
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span
                    style={{
                      background: "#CC0000",
                      color: "white",
                      borderRadius: "20px",
                      padding: "2px 10px",
                      fontSize: "13px",
                      fontWeight: 600,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {items.length}
                  </span>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeCart}
                aria-label="Close cart"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px",
                  cursor: "pointer",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "44px",
                  minWidth: "44px",
                  transition: "background 0.2s",
                }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 24px",
                overscrollBehavior: "contain",
              }}
            >
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "60px 0",
                      gap: "16px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "64px" }}>🐔</div>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "white",
                        margin: 0,
                      }}
                    >
                      Your cart is empty
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.4)",
                        margin: 0,
                        maxWidth: "220px",
                        lineHeight: 1.5,
                      }}
                    >
                      Add some fresh chicken to get started!
                    </p>
                  </motion.div>
                ) : (
                  items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.weightGrams}-${index}`}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(36,10,10,0.9) 0%, rgba(28,28,28,0.95) 100%)",
                        borderRadius: "14px",
                        padding: "14px 16px",
                        marginBottom: "10px",
                        border: "1px solid rgba(255,255,255,0.07)",
                        boxShadow:
                          "0 1px 0 rgba(255,255,255,0.05) inset, 0 4px 16px rgba(0,0,0,0.35)",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      {/* Chicken emoji */}
                      <div
                        style={{
                          width: "46px",
                          height: "46px",
                          background:
                            item.id === "cutting"
                              ? "linear-gradient(135deg, rgba(204,0,0,0.25), rgba(139,0,0,0.15))"
                              : "linear-gradient(135deg, rgba(181,99,26,0.25), rgba(107,56,0,0.15))",
                          borderRadius: "12px",
                          border:
                            item.id === "cutting"
                              ? "1px solid rgba(204,0,0,0.2)"
                              : "1px solid rgba(181,99,26,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "22px",
                          flexShrink: 0,
                        }}
                      >
                        {item.id === "cutting" ? "🍗" : "🐓"}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "white",
                            margin: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.name}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.5)",
                            margin: "2px 0 0",
                          }}
                        >
                          {item.weightGrams}g — ₹{item.pricePerKg}/kg
                        </p>
                      </div>

                      {/* Price + Remove */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: "6px",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontWeight: 700,
                            fontSize: "18px",
                            color: "white",
                          }}
                        >
                          ₹{item.totalPrice.toFixed(2)}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1, color: "#FF4444" }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeItem(item.id, item.weightGrams)}
                          aria-label={`Remove ${item.name}`}
                          style={{
                            background: "rgba(204,0,0,0.1)",
                            border: "1px solid rgba(204,0,0,0.2)",
                            borderRadius: "6px",
                            padding: "4px 8px",
                            cursor: "pointer",
                            color: "#CC0000",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "11px",
                            minHeight: "30px",
                          }}
                        >
                          <Trash2 size={12} />
                          Remove
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                style={{
                  padding: "20px 24px",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(0,0,0,0.3)",
                }}
              >
                {/* Subtotal */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                    padding: "12px 14px",
                    background: "rgba(255,215,0,0.04)",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,215,0,0.1)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.55)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Subtotal
                  </span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 900,
                      fontSize: "26px",
                      background:
                        "linear-gradient(180deg, #FFE57F 0%, #FFD700 60%, #FFA500 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="btn-cta-wa"
                  style={{
                    width: "100%",
                    padding: "17px",
                    borderRadius: "14px",
                    color: "white",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    cursor: "pointer",
                    minHeight: "54px",
                    letterSpacing: "0.01em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  Proceed to Checkout →
                </motion.button>

                <p
                  style={{
                    textAlign: "center",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.35)",
                    margin: "10px 0 0",
                  }}
                >
                  Order will be sent via WhatsApp
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
