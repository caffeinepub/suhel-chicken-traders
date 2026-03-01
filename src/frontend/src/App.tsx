import { AdminButton } from "@/components/shop/AdminButton";
import { AdminPanel } from "@/components/shop/AdminPanel";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { CheckoutModal } from "@/components/shop/CheckoutModal";
import { Footer } from "@/components/shop/Footer";
import { Header } from "@/components/shop/Header";
import { HeroSection } from "@/components/shop/HeroSection";
import { OrderConfirmation } from "@/components/shop/OrderConfirmation";
import { ProductsSection } from "@/components/shop/ProductsSection";
import { QRCodeSection } from "@/components/shop/QRCodeSection";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D0D0D",
        color: "#FFFFFF",
        overflowX: "hidden",
      }}
    >
      {/* Sticky Header */}
      <Header />

      {/* Main Content */}
      <main>
        <HeroSection />
        <ProductsSection />
        <QRCodeSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmation />

      {/* Admin */}
      <AdminPanel />
      <AdminButton />
    </div>
  );
}
