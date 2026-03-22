import { Link } from "@tanstack/react-router";
import { Car, CheckCircle2, Clock, MapPin, Plane } from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: MapPin,
    title: "Local Trips",
    description:
      "Comfortable city rides for all your local travel needs. Whether it's a quick errand or an all-day city tour, we've got you covered.",
    features: [
      "City rides at affordable rates",
      "AC & non-AC vehicles available",
      "Experienced local drivers",
      "Door-to-door pickup & drop",
    ],
    color: "from-yellow-50 to-amber-50",
  },
  {
    icon: Car,
    title: "Outstation Trips",
    description:
      "Long-distance travel across Tamil Nadu and beyond. We ensure a comfortable, safe journey to any destination with well-maintained vehicles.",
    features: [
      "Coverage across Tamil Nadu",
      "Round trip & one-way available",
      "GPS-tracked vehicles",
      "Comfortable multi-city routes",
    ],
    color: "from-blue-50 to-sky-50",
  },
  {
    icon: Plane,
    title: "Airport Pickup & Drop",
    description:
      "Never miss a flight with our reliable airport transfer service. Available 24/7 for all major airports with real-time flight tracking.",
    features: [
      "Available 24/7 all days",
      "Real-time flight tracking",
      "Meet & greet service",
      "Chennai & Coimbatore airports",
    ],
    color: "from-green-50 to-emerald-50",
  },
  {
    icon: Clock,
    title: "Hourly Rental",
    description:
      "Flexible cab rental by the hour. Perfect for business meetings, city tours, shopping trips, or when you need a vehicle for the whole day.",
    features: [
      "Minimum 2-hour rental",
      "Flexible duration",
      "Driver included",
      "City-wide coverage",
    ],
    color: "from-purple-50 to-violet-50",
  },
];

export function Services() {
  return (
    <main>
      {/* Header */}
      <section className="bg-brand-dark py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Our <span className="text-brand-yellow">Services</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Tailored travel solutions for every need — local, outstation,
            airport, or hourly.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card hover-lift"
                data-ocid={`services.item.${i + 1}`}
              >
                <div className={`bg-gradient-to-r ${service.color} p-6`}>
                  <div className="w-14 h-14 bg-brand-yellow rounded-2xl flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-brand-dark" />
                  </div>
                  <h2 className="text-2xl font-bold text-brand-dark mb-2">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <CheckCircle2 className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-yellow text-brand-dark text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
                    data-ocid={`services.primary_button.${i + 1}`}
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
