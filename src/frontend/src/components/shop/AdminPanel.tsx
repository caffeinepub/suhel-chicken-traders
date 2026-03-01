import { useAdminStore } from "@/stores/adminStore";
import { AlertCircle, Lock, LogOut, RefreshCw, X } from "lucide-react";
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

export function AdminPanel() {
  const {
    isAdminOpen,
    isAdminLoggedIn,
    closeAdmin,
    login,
    logout,
    cuttingPrice,
    zindaPrice,
    cuttingInStock,
    zindaInStock,
    cuttingFreshToday,
    zindaFreshToday,
    updateCuttingPrice,
    updateZindaPrice,
    toggleCuttingStock,
    toggleZindaStock,
    toggleCuttingFresh,
    toggleZindaFresh,
  } = useAdminStore();

  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [cuttingPriceInput, setCuttingPriceInput] = useState(
    String(cuttingPrice),
  );
  const [zindaPriceInput, setZindaPriceInput] = useState(String(zindaPrice));

  const handleLogin = () => {
    const success = login(passwordInput);
    if (success) {
      setLoginError(false);
      setPasswordInput("");
      setCuttingPriceInput(String(cuttingPrice));
      setZindaPriceInput(String(zindaPrice));
    } else {
      setLoginError(true);
    }
  };

  const handleCuttingPriceUpdate = () => {
    const val = Number(cuttingPriceInput);
    if (val > 0) updateCuttingPrice(val);
  };

  const handleZindaPriceUpdate = () => {
    const val = Number(zindaPriceInput);
    if (val > 0) updateZindaPrice(val);
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
              width: "min(400px, 100vw)",
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
                padding: "20px 24px",
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
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px",
                overscrollBehavior: "contain",
              }}
            >
              {!isAdminLoggedIn ? (
                /* Login Form */
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
              ) : (
                /* Admin Controls */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(37,211,102,0.1)",
                      border: "1px solid rgba(37,211,102,0.25)",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      marginBottom: "24px",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>✅</span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        color: "#25D366",
                        fontWeight: 600,
                      }}
                    >
                      Admin access granted
                    </span>
                  </div>

                  {/* Cutting Chicken Section */}
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

                    {/* Price Input */}
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
                            e.currentTarget.style.borderColor =
                              "rgba(255,255,255,0.12)";
                          }}
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCuttingPriceUpdate}
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

                    <ToggleSwitch
                      checked={cuttingInStock}
                      onChange={toggleCuttingStock}
                      label="In Stock"
                      onColor="#25D366"
                    />
                    <ToggleSwitch
                      checked={cuttingFreshToday}
                      onChange={toggleCuttingFresh}
                      label='Show "Today Fresh" Badge'
                      onColor="#FFD700"
                    />
                  </div>

                  {/* Zinda Chicken Section */}
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

                    {/* Price Input */}
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
                            e.currentTarget.style.borderColor =
                              "rgba(255,255,255,0.12)";
                          }}
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleZindaPriceUpdate}
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

                    <ToggleSwitch
                      checked={zindaInStock}
                      onChange={toggleZindaStock}
                      label="In Stock"
                      onColor="#25D366"
                    />
                    <ToggleSwitch
                      checked={zindaFreshToday}
                      onChange={toggleZindaFresh}
                      label='Show "Today Fresh" Badge'
                      onColor="#FFD700"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
