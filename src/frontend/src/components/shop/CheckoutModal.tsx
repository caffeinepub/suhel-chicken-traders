import { useAppStore } from "@/stores/appStore";
import { useCartStore } from "@/stores/cartStore";
import { AlertCircle, MapPin, MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";

interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
}

function buildWhatsAppMessage(
  data: CheckoutFormData,
  items: ReturnType<typeof useCartStore.getState>["items"],
  total: number,
): string {
  const itemList = items
    .map(
      (item) =>
        `• ${item.name} - ${item.weightGrams}g = ₹${item.totalPrice.toFixed(2)}`,
    )
    .join("\n");

  return `🐔 *New Order - Suhel Chicken Traders*

👤 Name: ${data.name}
📞 Phone: ${data.phone}
📍 Address: ${data.address}

🛒 *Order Details:*
${itemList}

💰 *Total: ₹${total.toFixed(2)}*

💳 Payment: Cash on Delivery`;
}

export function CheckoutModal() {
  const { showCheckout, closeCheckout, showOrderConfirmation } = useAppStore();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const total = getTotalPrice();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutFormData>();

  const onSubmit = (data: CheckoutFormData) => {
    const message = buildWhatsAppMessage(data, items, total);
    const whatsappUrl = `https://wa.me/919301567327?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    showOrderConfirmation({
      name: data.name,
      phone: data.phone,
      address: data.address,
      items: [...items],
      total,
    });
    clearCart();
    reset();
  };

  const handleClose = () => {
    closeCheckout();
    reset();
  };

  return (
    <AnimatePresence>
      {showCheckout && (
        <>
          {/* Backdrop */}
          <motion.div
            key="checkout-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.8)",
              zIndex: 300,
              cursor: "pointer",
            }}
          />

          {/* Modal */}
          <motion.div
            key="checkout-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(520px, calc(100vw - 32px))",
              maxHeight: "calc(100vh - 48px)",
              background: "#1A1A1A",
              borderRadius: "20px",
              zIndex: 301,
              overflow: "hidden",
              boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "20px 24px",
                background:
                  "linear-gradient(135deg, rgba(139,0,0,0.5), rgba(0,0,0,0.2))",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  color: "white",
                  margin: 0,
                }}
              >
                Place Your Order
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                aria-label="Close checkout"
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
                }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Scrollable content */}
            <div
              style={{
                overflowY: "auto",
                flex: 1,
                overscrollBehavior: "contain",
              }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ padding: "24px" }}
                noValidate
              >
                {/* Order Summary */}
                <div
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    borderRadius: "12px",
                    padding: "16px",
                    marginBottom: "24px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.5)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      margin: "0 0 12px",
                    }}
                  >
                    Order Summary
                  </h3>
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.weightGrams}`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.8)",
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
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "white",
                      }}
                    >
                      Total
                    </span>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 900,
                        fontSize: "24px",
                        color: "#FFD700",
                      }}
                    >
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Form Fields */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      style={{
                        display: "block",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "6px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: { value: 2, message: "Name too short" },
                      })}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.06)",
                        border: `1px solid ${errors.name ? "#CC0000" : "rgba(255,255,255,0.12)"}`,
                        borderRadius: "10px",
                        color: "white",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "15px",
                        padding: "12px 14px",
                        outline: "none",
                        minHeight: "48px",
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#CC0000";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(204,0,0,0.2)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = errors.name
                          ? "#CC0000"
                          : "rgba(255,255,255,0.12)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {errors.name && (
                      <p
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "12px",
                          color: "#FF6666",
                          margin: "4px 0 0",
                        }}
                      >
                        <AlertCircle size={12} />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      style={{
                        display: "block",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "6px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="10-digit mobile number"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message:
                            "Enter a valid 10-digit Indian mobile number",
                        },
                      })}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.06)",
                        border: `1px solid ${errors.phone ? "#CC0000" : "rgba(255,255,255,0.12)"}`,
                        borderRadius: "10px",
                        color: "white",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "15px",
                        padding: "12px 14px",
                        outline: "none",
                        minHeight: "48px",
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#CC0000";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(204,0,0,0.2)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = errors.phone
                          ? "#CC0000"
                          : "rgba(255,255,255,0.12)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {errors.phone && (
                      <p
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "12px",
                          color: "#FF6666",
                          margin: "4px 0 0",
                        }}
                      >
                        <AlertCircle size={12} />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      style={{
                        display: "block",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "6px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Delivery Address *
                    </label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "6px",
                        marginBottom: "6px",
                        color: "rgba(255,215,0,0.8)",
                      }}
                    >
                      <MapPin
                        size={13}
                        style={{ marginTop: "1px", flexShrink: 0 }}
                      />
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "12px",
                        }}
                      >
                        Must include "Kotma" — we only deliver in Kotma
                      </span>
                    </div>
                    <textarea
                      id="address"
                      autoComplete="street-address"
                      placeholder="e.g., Near Main Market, Kotma, MP"
                      rows={3}
                      {...register("address", {
                        required: "Address is required",
                        validate: (val) =>
                          val.toLowerCase().includes("kotma") ||
                          "We only deliver in Kotma. Please include 'Kotma' in your address.",
                      })}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.06)",
                        border: `1px solid ${errors.address ? "#CC0000" : "rgba(255,255,255,0.12)"}`,
                        borderRadius: "10px",
                        color: "white",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "15px",
                        padding: "12px 14px",
                        outline: "none",
                        resize: "vertical",
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#CC0000";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(204,0,0,0.2)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = errors.address
                          ? "#CC0000"
                          : "rgba(255,255,255,0.12)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {errors.address && (
                      <p
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "12px",
                          color: "#FF6666",
                          margin: "4px 0 0",
                        }}
                      >
                        <AlertCircle size={12} />
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div>
                    <p
                      style={{
                        display: "block",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "8px",
                        letterSpacing: "0.04em",
                        margin: "0 0 8px",
                      }}
                    >
                      Payment Method
                    </p>
                    <div
                      style={{
                        background: "rgba(37,211,102,0.1)",
                        border: "1.5px solid rgba(37,211,102,0.4)",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>💵</span>
                      <div>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "#25D366",
                            margin: 0,
                          }}
                        >
                          Cash on Delivery
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.45)",
                            margin: "2px 0 0",
                          }}
                        >
                          Pay when your order arrives
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  type="submit"
                  disabled={isSubmitting}
                  className={!isSubmitting ? "btn-cta-wa" : ""}
                  style={{
                    width: "100%",
                    marginTop: "24px",
                    padding: "17px",
                    borderRadius: "14px",
                    color: "white",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    background: isSubmitting
                      ? "rgba(37,211,102,0.3)"
                      : undefined,
                    border: isSubmitting
                      ? "1px solid rgba(37,211,102,0.2)"
                      : undefined,
                    boxShadow: isSubmitting ? "none" : undefined,
                    minHeight: "56px",
                    letterSpacing: "0.01em",
                    opacity: isSubmitting ? 0.65 : 1,
                  }}
                >
                  <MessageCircle size={20} />
                  <span>Place Order via WhatsApp</span>
                </motion.button>

                <p
                  style={{
                    textAlign: "center",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.3)",
                    marginTop: "10px",
                  }}
                >
                  WhatsApp will open with your order details
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
