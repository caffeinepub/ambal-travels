import { Link } from "@tanstack/react-router";
import {
  Car,
  Clock,
  DollarSign,
  Headphones,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  Shield,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { BookingForm } from "../components/BookingForm";

const services = [
  {
    icon: MapPin,
    title: "Local Trips",
    desc: "Comfortable rides within the city for any occasion — office, shopping, events, or personal errands.",
  },
  {
    icon: Car,
    title: "Outstation Trips",
    desc: "Long-distance travel made easy. We cover major routes across Tamil Nadu and beyond.",
  },
  {
    icon: Plane,
    title: "Airport Pickup & Drop",
    desc: "Timely airport transfers so you never miss a flight. Available 24/7 for all major airports.",
  },
  {
    icon: Clock,
    title: "Hourly Rental",
    desc: "Flexible cab rental by the hour. Perfect for business meetings, tours, or day-long errands.",
  },
];

const whyUs = [
  {
    icon: Shield,
    title: "Safe & Reliable",
    desc: "All vehicles regularly sanitized and maintained for your safety.",
  },
  {
    icon: Star,
    title: "Expert Drivers",
    desc: "Experienced, licensed, and background-verified professional drivers.",
  },
  {
    icon: DollarSign,
    title: "Affordable Fares",
    desc: "Transparent pricing with no hidden charges. Best rates guaranteed.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Round-the-clock customer support for all your travel needs.",
  },
];

export function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center hero-gradient hero-pattern">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-full opacity-10"
            style={{
              background:
                "repeating-linear-gradient(to bottom, #F2B705 0px, #F2B705 40px, transparent 40px, transparent 80px)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Headline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow/20 border border-brand-yellow/40 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              <span className="text-brand-yellow text-sm font-semibold">
                Available 24/7
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Your Safe & <span className="text-brand-yellow">Comfortable</span>{" "}
              Journey
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
              Ambal Travels — your trusted travel partner with experienced
              drivers, affordable pricing, and a commitment to getting you there
              safely.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:9442696124"
                className="flex items-center gap-2 px-6 py-3 bg-brand-yellow text-brand-dark font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                data-ocid="hero.primary_button"
              >
                <Phone className="w-5 h-5" /> Call Now: 9442696124
              </a>
              <a
                href="https://wa.me/919442696124"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg"
                data-ocid="hero.secondary_button"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>
            <div className="flex items-center gap-6 mt-8">
              {[
                "1000+ Happy Customers",
                "10+ Years Experience",
                "24/7 Service",
              ].map((stat) => (
                <div key={stat} className="text-center">
                  <p className="text-brand-yellow text-xs font-semibold uppercase tracking-wide">
                    {stat}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Booking Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-[#1A1A1A] rounded-2xl p-6 shadow-2xl border border-white/10">
              <h2 className="text-white text-xl font-bold mb-1">
                Instant Booking
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Fill in your details and we'll confirm shortly
              </p>
              <BookingForm dark={true} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
              Our Services
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From city rides to long-distance travel, we cover all your
              transportation needs.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card hover-lift text-center"
                data-ocid={`services.item.${i + 1}`}
              >
                <div className="w-14 h-14 bg-brand-yellow/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-7 h-7 text-brand-yellow" />
                </div>
                <h3 className="font-bold text-brand-dark text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-dark text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
              data-ocid="services.secondary_button"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We go above and beyond to ensure your journey is safe,
              comfortable, and memorable.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
                data-ocid={`why.item.${i + 1}`}
              >
                <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <item.icon className="w-8 h-8 text-brand-dark" />
                </div>
                <h3 className="font-bold text-brand-dark text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Book Your Ride?
          </h2>
          <p className="text-gray-400 mb-8">
            Call us now or send a WhatsApp message for instant confirmation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:9442696124"
              className="flex items-center gap-2 px-8 py-4 bg-brand-yellow text-brand-dark font-bold rounded-xl hover:opacity-90 transition-opacity"
              data-ocid="cta.primary_button"
            >
              <Phone className="w-5 h-5" /> 📞 Call Now: 9442696124
            </a>
            <a
              href="https://wa.me/919442696124"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
              data-ocid="cta.secondary_button"
            >
              <MessageCircle className="w-5 h-5" /> 💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
