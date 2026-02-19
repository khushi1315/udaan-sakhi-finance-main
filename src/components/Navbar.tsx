import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

interface NavbarProps {
  session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", label: t("Home", "होम") },
    { to: "/learn", label: t("Learn", "सीखें") },
    { to: "/schemes", label: t("Schemes", "योजनाएं") },
    { to: "/budget", label: t("Budget Tool", "बजट टूल") },
    { to: "/stories", label: t("Success Stories", "सफलता की कहानियां") },
    { to: "/community", label: t("Community", "समुदाय") },
    { to: "/chatbot", label: t("Chatbot", "चैटबॉट") }, // 👈 ADD THIS LINE
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="bg-nav text-nav-foreground sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🕊️</span>
            <div className="leading-tight">
              <span className="text-xl font-bold text-primary">UDAAN</span>
              <span className="block text-xs text-saffron-light">
                Finance Sakhi
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-nav-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-border/30 text-sm hover:bg-primary/10 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang === "en" ? "हिंदी" : "English"}
            </button>

            {!session ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1.5 text-sm rounded-md border border-nav-foreground/30 hover:bg-nav-foreground/10 transition-colors"
                >
                  {t("Login", "लॉगिन")}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {t("Sign Up", "साइन अप")}
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm text-primary font-medium">
                  {session.user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1.5 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block py-2 px-3 rounded-md text-sm hover:bg-primary/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-2 pt-2 px-3">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-border/30 text-sm"
              >
                <Globe className="w-4 h-4" />
                {lang === "en" ? "हिंदी" : "English"}
              </button>

              {!session ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-1.5 text-sm rounded-md border border-nav-foreground/30"
                  >
                    {t("Login", "लॉगिन")}
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-1.5 text-sm rounded-md bg-primary text-primary-foreground"
                  >
                    {t("Sign Up", "साइन अप")}
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-sm text-primary font-medium">
                    {session.user.email}
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="px-4 py-1.5 text-sm rounded-md bg-red-500 text-white"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
