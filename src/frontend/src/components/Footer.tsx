import { Link } from "@tanstack/react-router";
import { Car, MapPin, MessageCircle, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-yellow rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-brand-dark" />
              </div>
              <span className="text-xl font-bold">
                Ambal <span className="text-brand-yellow">Travels</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Safe & Comfortable Journey. Your trusted travel partner for all
              local and outstation trips.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="tel:9442696124"
                className="flex items-center gap-2 px-4 py-2 bg-brand-yellow text-brand-dark text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                data-ocid="footer.link"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a
                href="https://wa.me/919442696124"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
                data-ocid="footer.link"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-4 text-brand-yellow">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/" as const, label: "Home" },
                { to: "/services" as const, label: "Services" },
                { to: "/about" as const, label: "About Us" },
                { to: "/contact" as const, label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-brand-yellow text-sm transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base mb-4 text-brand-yellow">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 mt-0.5 text-brand-yellow flex-shrink-0" />
                <a
                  href="tel:9442696124"
                  className="hover:text-brand-yellow transition-colors"
                >
                  9442696124
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MessageCircle className="w-4 h-4 mt-0.5 text-brand-yellow flex-shrink-0" />
                <a
                  href="https://wa.me/919442696124"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-yellow transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-yellow flex-shrink-0" />
                <span>Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-sm">
            © {year} Ambal Travels. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-yellow hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
