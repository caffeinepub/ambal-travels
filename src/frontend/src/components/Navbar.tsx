import { Link, useLocation } from "@tanstack/react-router";
import { Car, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/" as const, label: "Home" },
    { to: "/services" as const, label: "Services" },
    { to: "/about" as const, label: "About" },
    { to: "/contact" as const, label: "Contact" },
  ];

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-brand-dark"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 bg-brand-yellow rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-brand-dark" />
            </div>
            <span>
              Ambal <span className="text-brand-yellow">Travels</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className={`text-sm font-medium transition-colors hover:text-brand-yellow ${
                  isActive(link.to) ? "text-brand-yellow" : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:9442696124"
              className="flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:text-brand-yellow transition-colors"
              data-ocid="nav.link"
            >
              <Phone className="w-4 h-4" />
              9442696124
            </a>
            <Link
              to="/admin"
              data-ocid="admin.link"
              className="px-4 py-2 bg-brand-dark text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100 py-4 space-y-1"
            >
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid="nav.link"
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? "bg-brand-yellow text-brand-dark"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href="tel:9442696124"
                  className="block px-3 py-2 text-sm font-semibold text-brand-dark"
                >
                  📞 9442696124
                </a>
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="admin.link"
                  className="mx-3 py-2 bg-brand-dark text-white text-sm font-semibold rounded-lg text-center block"
                >
                  Admin Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
