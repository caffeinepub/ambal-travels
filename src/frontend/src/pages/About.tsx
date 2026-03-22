import { Award, Shield, TrendingDown, Users } from "lucide-react";
import { motion } from "motion/react";

const highlights = [
  {
    icon: Award,
    title: "10+ Years of Trusted Service",
    desc: "A decade of providing reliable, safe, and comfortable travel experiences to thousands of satisfied customers across Tamil Nadu.",
  },
  {
    icon: Users,
    title: "Expert & Verified Drivers",
    desc: "All our drivers are professionally licensed, background-verified, and trained in defensive driving and customer service.",
  },
  {
    icon: TrendingDown,
    title: "Affordable Pricing",
    desc: "We believe quality travel shouldn't be expensive. Our transparent pricing ensures you get the best rates with no hidden charges.",
  },
  {
    icon: Shield,
    title: "Safety First",
    desc: "Regular vehicle maintenance, GPS tracking, and strict safety protocols ensure every journey is secure and worry-free.",
  },
];

export function About() {
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
            About <span className="text-brand-yellow">Us</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ambal Travels — built on trust, driven by commitment, and dedicated
            to your safe journey.
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-brand-dark mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ambal Travels was founded with a simple yet powerful mission —
                to make quality travel accessible to everyone in Tamil Nadu.
                Starting with just a few vehicles and a passion for service,
                we've grown into a trusted name in the travel industry.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Over the past decade, we've served thousands of customers — from
                daily commuters and business travelers to families going on
                outstation trips. Each journey has taught us what it means to
                truly serve our customers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, Ambal Travels stands as a symbol of reliability, safety,
                and affordability. Our fleet of well-maintained vehicles and
                team of expert drivers are ready to take you wherever you need
                to go.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-brand-dark rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">
                  Our <span className="text-brand-yellow">Mission</span>
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  "To provide every passenger with a safe, comfortable, and
                  affordable travel experience — treating each customer like
                  family and every journey as a promise kept."
                </p>
                <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                  {[
                    { num: "10+", label: "Years Experience" },
                    { num: "5000+", label: "Happy Customers" },
                    { num: "50+", label: "Vehicles" },
                    { num: "24/7", label: "Support" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-3xl font-extrabold text-brand-yellow">
                        {stat.num}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-brand-dark mb-4">
              What Makes Us Different
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card hover-lift"
                data-ocid={`about.item.${i + 1}`}
              >
                <div className="w-12 h-12 bg-brand-yellow/15 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="font-bold text-brand-dark mb-2 text-sm">
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
    </main>
  );
}
