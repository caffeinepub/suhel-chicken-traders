import { useAppStore } from "@/stores/appStore";
import { CheckCircle, MessageCircle, RefreshCw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function OrderConfirmation() {
  const { showConfirmation, lastOrder, resetOrder } = useAppStore();

  return (
    <AnimatePresence>
      {showConfirmation && lastOrder && (
        <>
          {/* Backdrop */}
          <motion.div
            key="confirm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.9)",
              zIndex: 400,
            }}
          />

          {/* Content */}
          <motion.div
            key="confirm-content"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(480px, calc(100vw - 32px))",
              maxHeight: "calc(100vh - 48px)",
              background: "linear-gradient(145deg, #1A1A1A 0%, #111111 100%)",
              borderRadius: "24px",
              zIndex: 401,
              overflow: "hidden",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Success Header */}
            <div
              style={{
                padding: "36px 24px 24px",
                background:
                  "linear-gradient(135deg, rgba(37,211,102,0.2), rgba(18,140,126,0.15))",
                borderBottom: "1px solid rgba(37,211,102,0.15)",
                textAlign: "center",
              }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 200,
                  damping: 16,
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "rgba(37,211,102,0.15)",
                  border: "2px solid rgba(37,211,102,0.4)",
                  marginBottom: "16px",
                }}
              >
                <CheckCircle size={44} color="#25D366" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 900,
                  fontSize: "28px",
                  color: "white",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Thank You, {lastOrder.name}!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.65)",
                  margin: "10px 0 0",
                  lineHeight: 1.5,
                }}
              >
                Your order has been sent via WhatsApp.
                <br />
                We'll confirm shortly!
              </motion.p>
            </div>

            {/* Order Details */}
            <div
              style={{
                overflowY: "auto",
                flex: 1,
                padding: "24px",
                overscrollBehavior: "contain",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {/* WhatsApp notice */}
                <div
                  style={{
                    background: "rgba(37,211,102,0.08)",
                    border: "1px solid rgba(37,211,102,0.2)",
                    borderRadius: "12px",
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <MessageCircle
                    size={18}
                    color="#25D366"
                    style={{ flexShrink: 0, marginTop: "1px" }}
                  />
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.7)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    WhatsApp opened with your order details. If it didn't open,{" "}
                    <span style={{ color: "#25D366" }}>
                      please message us at 9301567327
                    </span>
                  </p>
                </div>

                {/* Summary */}
                <div
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    borderRadius: "12px",
                    padding: "16px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    marginBottom: "20px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      margin: "0 0 12px",
                    }}
                  >
                    Order Summary
                  </h3>

                  {lastOrder.items.map((item) => (
                    <div
                      key={`${item.id}-${item.weightGrams}`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.75)",
                        }}
                      >
                        {item.name} ({item.weightGrams}g)
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "white",
                        }}
                      >
                        ₹{item.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                      paddingTop: "12px",
                      marginTop: "4px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "white",
                      }}
                    >
                      Total Paid
                    </span>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 900,
                        fontSize: "26px",
                        color: "#FFD700",
                      }}
                    >
                      ₹{lastOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Delivery details */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                    marginBottom: "24px",
                  }}
                >
                  {[
                    { label: "Name", value: lastOrder.name },
                    { label: "Phone", value: lastOrder.phone },
                    { label: "Payment", value: "Cash on Delivery" },
                    { label: "Delivery", value: "Kotma Area" },
                  ].map((d) => (
                    <div
                      key={d.label}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: "8px",
                        padding: "10px 12px",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "11px",
                          color: "rgba(255,255,255,0.35)",
                          marginBottom: "2px",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {d.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "white",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {d.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* New Order Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetOrder}
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "2px solid rgba(204,0,0,0.5)",
                    background: "rgba(204,0,0,0.1)",
                    color: "white",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    minHeight: "52px",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(204,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(204,0,0,0.1)";
                  }}
                >
                  <RefreshCw size={18} />
                  Place New Order
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
