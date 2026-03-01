import { useAdminStore } from "@/stores/adminStore";
import { Settings } from "lucide-react";
import { motion } from "motion/react";

export function AdminButton() {
  const { openAdmin } = useAdminStore();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.12, rotate: 45 }}
      whileTap={{ scale: 0.9 }}
      onClick={openAdmin}
      aria-label="Open admin panel"
      title="Admin Panel"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "20px",
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        background: "rgba(30,30,30,0.9)",
        border: "1px solid rgba(255,255,255,0.12)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
        color: "rgba(255,255,255,0.5)",
      }}
    >
      <Settings size={18} />
    </motion.button>
  );
}
