import { type Order, useAdminStore } from "@/stores/adminStore";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Lock,
  LogOut,
  Package,
  RefreshCw,
  Settings,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function ToggleSwitch({
  checked,
  onChange,
  label,
  onColor = "#25D366",
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  onColor?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
      }}
    >
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: "rgba(255,255,255,0.75)",
        }}
      >
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        style={{
          width: "48px",
          height: "26px",
          borderRadius: "13px",
          border: "none",
          background: checked ? onColor : "rgba(255,255,255,0.12)",
          cursor: "pointer",
          position: "relative",
          transition: "background 0.25s ease",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "3px",
            left: checked ? "25px" : "3px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "white",
            transition: "left 0.25s ease",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        />
      </button>
    </div>
  );
}

function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = d.getDate();
  const month = months[d.getMonth()];
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${day} ${month}, ${hours}:${minutes} ${ampm}`;
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const configs = {
    pending: {
      bg: "rgba(255,193,7,0.15)",
      border: "rgba(255,193,7,0.4)",
      color: "#FFC107",
      icon: <Clock size={12} />,
      label: "Pending",
    },
    accepted: {
      bg: "rgba(37,211,102,0.15)",
      border: "rgba(37,211,102,0.4)",
      color: "#25D366",
      icon: <CheckCircle2 size={12} />,
      label: "Accepted",
    },
    rejected: {
      bg: "rgba(204,0,0,0.15)",
      border: "rgba(204,0,0,0.4)",
      color: "#FF6666",
      icon: <XCircle size={12} />,
      label: "Stock Nahi",
    },
  };
  const cfg = configs[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: "20px",
        padding: "3px 10px",
        fontSize: "11px",
        fontWeight: 600,
        color: cfg.color,
        fontFamily: "'Inter', sans-serif",
        letterSpacing: "0.02em",
      }}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function OrderCard({ order }: { order: Order }) {
  const { updateOrderStatus } = useAdminStore();

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "14px",
        padding: "16px",
        marginBottom: "12px",
      }}
    >
      {/* Order header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "10px",
          gap: "8px",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              color: "white",
              margin: "0 0 2px",
            }}
          >
            {order.customerName}
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.55)",
              margin: 0,
            }}
          >
            📞 {order.phone}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "4px",
          }}
        >
          <StatusBadge status={order.status} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {order.orderId}
          </span>
        </div>
      </div>

      {/* Address */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "12px",
          color: "rgba(255,255,255,0.5)",
          margin: "0 0 10px",
          display: "flex",
          alignItems: "flex-start",
          gap: "4px",
        }}
      >
        <span style={{ flexShrink: 0 }}>📍</span>
        {order.address}
      </p>

      {/* Items */}
      <div
        style={{
          background: "rgba(0,0,0,0.25)",
          borderRadius: "8px",
          padding: "10px 12px",
          marginBottom: "10px",
        }}
      >
        {order.items.map((item, idx) => (
          <div
            key={`${item.id}-${item.weightGrams}-${idx}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: idx < order.items.length - 1 ? "6px" : "0",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {item.name} ({item.weightGrams}g)
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "white",
              }}
            >
              ₹{item.totalPrice.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Footer row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: order.status === "pending" ? "12px" : "0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            {formatTimestamp(order.timestamp)}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
              background:
                order.paymentMethod === "upi"
                  ? "rgba(255,153,0,0.15)"
                  : "rgba(37,211,102,0.12)",
              border: `1px solid ${order.paymentMethod === "upi" ? "rgba(255,153,0,0.4)" : "rgba(37,211,102,0.3)"}`,
              borderRadius: "12px",
              padding: "2px 8px",
              fontSize: "10px",
              fontWeight: 600,
              color: order.paymentMethod === "upi" ? "#FF9900" : "#25D366",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {order.paymentMethod === "upi" ? "📲 UPI" : "💵 COD"}
          </span>
        </div>
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 900,
            fontSize: "20px",
            color: "#FFD700",
          }}
        >
          ₹{order.total.toFixed(2)}
        </span>
      </div>

      {/* Action Buttons - only for pending */}
      {order.status === "pending" && (
        <div style={{ display: "flex", gap: "8px" }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => updateOrderStatus(order.orderId, "accepted")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid rgba(37,211,102,0.4)",
              background: "rgba(37,211,102,0.15)",
              color: "#25D366",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              minHeight: "42px",
            }}
          >
            <CheckCircle2 size={15} />
            Accept
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => updateOrderStatus(order.orderId, "rejected")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid rgba(204,0,0,0.4)",
              background: "rgba(204,0,0,0.15)",
              color: "#FF6666",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              minHeight: "42px",
            }}
          >
            <XCircle size={15} />
            Stock Nahi
          </motion.button>
        </div>
      )}
    </div>
  );
}

function SettingsTab() {
  const {
    cuttingPrice,
    zindaPrice,
    cuttingStock,
    zindaStock,
    cuttingFreshToday,
    zindaFreshToday,
    updateCuttingPrice,
    updateZindaPrice,
    updateCuttingStock,
    updateZindaStock,
    toggleCuttingFresh,
    toggleZindaFresh,
  } = useAdminStore();

  const [cuttingPriceInput, setCuttingPriceInput] = useState(
    String(cuttingPrice),
  );
  const [zindaPriceInput, setZindaPriceInput] = useState(String(zindaPrice));
  const [cuttingStockInput, setCuttingStockInput] = useState(
    String(cuttingStock),
  );
  const [zindaStockInput, setZindaStockInput] = useState(String(zindaStock));

  return (
    <div style={{ padding: "20px 20px 40px" }}>
      {/* Cutting Chicken */}
      <div
        style={{
          background: "rgba(204,0,0,0.08)",
          border: "1px solid rgba(204,0,0,0.2)",
          borderRadius: "14px",
          padding: "18px",
          marginBottom: "16px",
        }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "17px",
            color: "white",
            margin: "0 0 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          🍗 Cutting Chicken
        </h3>

        {/* Price */}
        <div style={{ marginBottom: "12px" }}>
          <label
            htmlFor="cutting-price"
            style={{
              display: "block",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Price per kg (₹)
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              id="cutting-price"
              type="number"
              value={cuttingPriceInput}
              onChange={(e) => setCuttingPriceInput(e.target.value)}
              min="1"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                color: "white",
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                padding: "10px 12px",
                outline: "none",
                minHeight: "44px",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#CC0000";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const val = Number(cuttingPriceInput);
                if (val > 0) updateCuttingPrice(val);
              }}
              title="Update price"
              style={{
                background: "rgba(204,0,0,0.25)",
                border: "1px solid rgba(204,0,0,0.4)",
                borderRadius: "8px",
                padding: "10px 14px",
                cursor: "pointer",
                color: "#FF6666",
                display: "flex",
                alignItems: "center",
                minHeight: "44px",
              }}
            >
              <RefreshCw size={16} />
            </motion.button>
          </div>
        </div>

        {/* Stock Quantity */}
        <div style={{ marginBottom: "12px" }}>
          <label
            htmlFor="cutting-stock"
            style={{
              display: "block",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Stock (kg) — 0 = Out of Stock
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              id="cutting-stock"
              type="number"
              value={cuttingStockInput}
              onChange={(e) => setCuttingStockInput(e.target.value)}
              min="0"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                color: "white",
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                padding: "10px 12px",
                outline: "none",
                minHeight: "44px",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#CC0000";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const val = Number(cuttingStockInput);
                updateCuttingStock(Number.isNaN(val) ? 0 : val);
              }}
              title="Update stock"
              style={{
                background: "rgba(204,0,0,0.25)",
                border: "1px solid rgba(204,0,0,0.4)",
                borderRadius: "8px",
                padding: "10px 14px",
                cursor: "pointer",
                color: "#FF6666",
                display: "flex",
                alignItems: "center",
                minHeight: "44px",
              }}
            >
              <Package size={16} />
            </motion.button>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color:
                cuttingStock > 0
                  ? "rgba(37,211,102,0.8)"
                  : "rgba(255,102,102,0.8)",
              margin: "5px 0 0",
            }}
          >
            {cuttingStock > 0
              ? `✅ In Stock: ${cuttingStock} kg available`
              : "❌ Out of Stock"}
          </p>
        </div>

        <ToggleSwitch
          checked={cuttingFreshToday}
          onChange={toggleCuttingFresh}
          label='Show "Today Fresh" Badge'
          onColor="#FFD700"
        />
      </div>

      {/* Zinda Chicken */}
      <div
        style={{
          background: "rgba(181,99,26,0.08)",
          border: "1px solid rgba(181,99,26,0.2)",
          borderRadius: "14px",
          padding: "18px",
        }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "17px",
            color: "white",
            margin: "0 0 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          🐓 Zinda Chicken
        </h3>

        {/* Price */}
        <div style={{ marginBottom: "12px" }}>
          <label
            htmlFor="zinda-price"
            style={{
              display: "block",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Price per kg (₹)
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              id="zinda-price"
              type="number"
              value={zindaPriceInput}
              onChange={(e) => setZindaPriceInput(e.target.value)}
              min="1"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                color: "white",
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                padding: "10px 12px",
                outline: "none",
                minHeight: "44px",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#B5631A";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const val = Number(zindaPriceInput);
                if (val > 0) updateZindaPrice(val);
              }}
              title="Update price"
              style={{
                background: "rgba(181,99,26,0.25)",
                border: "1px solid rgba(181,99,26,0.4)",
                borderRadius: "8px",
                padding: "10px 14px",
                cursor: "pointer",
                color: "#D4883A",
                display: "flex",
                alignItems: "center",
                minHeight: "44px",
              }}
            >
              <RefreshCw size={16} />
            </motion.button>
          </div>
        </div>

        {/* Stock Quantity */}
        <div style={{ marginBottom: "12px" }}>
          <label
            htmlFor="zinda-stock"
            style={{
              display: "block",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Stock (kg) — 0 = Out of Stock
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              id="zinda-stock"
              type="number"
              value={zindaStockInput}
              onChange={(e) => setZindaStockInput(e.target.value)}
              min="0"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                color: "white",
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                padding: "10px 12px",
                outline: "none",
                minHeight: "44px",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#B5631A";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const val = Number(zindaStockInput);
                updateZindaStock(Number.isNaN(val) ? 0 : val);
              }}
              title="Update stock"
              style={{
                background: "rgba(181,99,26,0.25)",
                border: "1px solid rgba(181,99,26,0.4)",
                borderRadius: "8px",
                padding: "10px 14px",
                cursor: "pointer",
                color: "#D4883A",
                display: "flex",
                alignItems: "center",
                minHeight: "44px",
              }}
            >
              <Package size={16} />
            </motion.button>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color:
                zindaStock > 0
                  ? "rgba(37,211,102,0.8)"
                  : "rgba(255,102,102,0.8)",
              margin: "5px 0 0",
            }}
          >
            {zindaStock > 0
              ? `✅ In Stock: ${zindaStock} kg available`
              : "❌ Out of Stock"}
          </p>
        </div>

        <ToggleSwitch
          checked={zindaFreshToday}
          onChange={toggleZindaFresh}
          label='Show "Today Fresh" Badge'
          onColor="#FFD700"
        />
      </div>
    </div>
  );
}

function OrdersTab() {
  const { orders } = useAdminStore();

  if (orders.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            marginBottom: "16px",
            opacity: 0.6,
          }}
        >
          📋
        </div>
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "18px",
            color: "rgba(255,255,255,0.6)",
            margin: "0 0 8px",
          }}
        >
          Koi order nahi
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            color: "rgba(255,255,255,0.3)",
            margin: 0,
          }}
        >
          Abhi tak koi order nahi aaya
        </p>
      </div>
    );
  }

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div style={{ padding: "16px 16px 40px" }}>
      {pendingCount > 0 && (
        <div
          style={{
            background: "rgba(255,193,7,0.1)",
            border: "1px solid rgba(255,193,7,0.3)",
            borderRadius: "10px",
            padding: "10px 14px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Clock size={14} color="#FFC107" />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#FFC107",
            }}
          >
            {pendingCount} pending order{pendingCount > 1 ? "s" : ""} — action
            required
          </span>
        </div>
      )}
      {orders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
}

export function AdminPanel() {
  const { isAdminOpen, isAdminLoggedIn, closeAdmin, login, logout, orders } =
    useAdminStore();

  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<"settings" | "orders">("orders");

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  const handleLogin = () => {
    const success = login(passwordInput);
    if (success) {
      setLoginError(false);
      setPasswordInput("");
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    logout();
    setPasswordInput("");
    setLoginError(false);
  };

  return (
    <AnimatePresence>
      {isAdminOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="admin-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAdmin}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              zIndex: 500,
            }}
          />

          {/* Panel */}
          <motion.div
            key="admin-panel"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: "min(420px, 100vw)",
              background: "#181818",
              zIndex: 501,
              boxShadow: "8px 0 48px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              overscrollBehavior: "contain",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "18px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background:
                  "linear-gradient(135deg, rgba(139,0,0,0.35), rgba(0,0,0,0.2))",
                flexShrink: 0,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Lock size={20} color="#CC0000" />
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "white",
                    margin: 0,
                  }}
                >
                  Admin Panel
                </h2>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {isAdminLoggedIn && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    aria-label="Logout"
                    style={{
                      background: "rgba(204,0,0,0.15)",
                      border: "1px solid rgba(204,0,0,0.3)",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      cursor: "pointer",
                      color: "#FF6666",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      minHeight: "40px",
                    }}
                  >
                    <LogOut size={14} />
                    Logout
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeAdmin}
                  aria-label="Close admin panel"
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
                    minHeight: "40px",
                    minWidth: "40px",
                  }}
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            {!isAdminLoggedIn ? (
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "24px",
                  overscrollBehavior: "contain",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      marginBottom: "32px",
                    }}
                  >
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        background: "rgba(204,0,0,0.15)",
                        border: "2px solid rgba(204,0,0,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px",
                      }}
                    >
                      <Lock size={28} color="#CC0000" />
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 700,
                        fontSize: "20px",
                        color: "white",
                        margin: 0,
                      }}
                    >
                      Admin Login
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.4)",
                        margin: "8px 0 0",
                      }}
                    >
                      Enter your admin password
                    </p>
                  </div>

                  <label
                    htmlFor="admin-password"
                    style={{
                      display: "block",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.6)",
                      marginBottom: "8px",
                    }}
                  >
                    Password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setLoginError(false);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    placeholder="Enter admin password"
                    autoComplete="current-password"
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.06)",
                      border: `1px solid ${loginError ? "#CC0000" : "rgba(255,255,255,0.12)"}`,
                      borderRadius: "10px",
                      color: "white",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "15px",
                      padding: "12px 14px",
                      outline: "none",
                      minHeight: "48px",
                      boxSizing: "border-box",
                      marginBottom: "8px",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#CC0000";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 2px rgba(204,0,0,0.2)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = loginError
                        ? "#CC0000"
                        : "rgba(255,255,255,0.12)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  {loginError && (
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        color: "#FF6666",
                        margin: "0 0 12px",
                      }}
                    >
                      <AlertCircle size={12} />
                      Incorrect password. Please try again.
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleLogin}
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: "10px",
                      border: "none",
                      background: "linear-gradient(135deg, #CC0000, #8B0000)",
                      color: "white",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "15px",
                      cursor: "pointer",
                      boxShadow: "0 8px 24px rgba(204,0,0,0.35)",
                      minHeight: "48px",
                      marginTop: loginError ? "0" : "8px",
                    }}
                  >
                    Login
                  </motion.button>
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  overflow: "hidden",
                }}
              >
                {/* Tab Bar */}
                <div
                  style={{
                    display: "flex",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    flexShrink: 0,
                    background: "rgba(0,0,0,0.2)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab("orders")}
                    style={{
                      flex: 1,
                      padding: "14px 16px",
                      background: "transparent",
                      border: "none",
                      borderBottom: `2px solid ${activeTab === "orders" ? "#CC0000" : "transparent"}`,
                      color:
                        activeTab === "orders"
                          ? "white"
                          : "rgba(255,255,255,0.45)",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: activeTab === "orders" ? 700 : 500,
                      fontSize: "14px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      transition: "all 0.2s",
                    }}
                  >
                    <Package size={15} />
                    Orders
                    {pendingCount > 0 && (
                      <span
                        style={{
                          background: "#CC0000",
                          color: "white",
                          borderRadius: "10px",
                          padding: "2px 7px",
                          fontSize: "11px",
                          fontWeight: 700,
                          minWidth: "20px",
                          textAlign: "center",
                        }}
                      >
                        {pendingCount}
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("settings")}
                    style={{
                      flex: 1,
                      padding: "14px 16px",
                      background: "transparent",
                      border: "none",
                      borderBottom: `2px solid ${activeTab === "settings" ? "#CC0000" : "transparent"}`,
                      color:
                        activeTab === "settings"
                          ? "white"
                          : "rgba(255,255,255,0.45)",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: activeTab === "settings" ? 700 : 500,
                      fontSize: "14px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      transition: "all 0.2s",
                    }}
                  >
                    <Settings size={15} />
                    Settings
                  </button>
                </div>

                {/* Tab Content */}
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    overscrollBehavior: "contain",
                  }}
                >
                  <AnimatePresence mode="wait">
                    {activeTab === "orders" ? (
                      <motion.div
                        key="orders-tab"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.18 }}
                      >
                        <OrdersTab />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="settings-tab"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.18 }}
                      >
                        <SettingsTab />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
