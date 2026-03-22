import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { BookingForm } from "../components/BookingForm";

export function Contact() {
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
            Contact <span className="text-brand-yellow">Us</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Get in touch for bookings, inquiries, or any assistance.
          </p>
        </motion.div>
      </section>

      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-brand-dark mb-8">
                Reach Us Anytime
              </h2>
              <div className="space-y-6">
                <a
                  href="tel:9442696124"
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-card hover-lift"
                  data-ocid="contact.link"
                >
                  <div className="w-12 h-12 bg-brand-yellow rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-brand-dark" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5 font-medium uppercase tracking-wide">
                      Phone
                    </p>
                    <p className="font-bold text-brand-dark text-lg">
                      9442696124
                    </p>
                    <p className="text-gray-500 text-sm">
                      Available 24/7 for bookings
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919442696124"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-card hover-lift"
                  data-ocid="contact.link"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5 font-medium uppercase tracking-wide">
                      WhatsApp
                    </p>
                    <p className="font-bold text-brand-dark text-lg">
                      +91 9442696124
                    </p>
                    <p className="text-gray-500 text-sm">
                      Send us a message anytime
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-card">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5 font-medium uppercase tracking-wide">
                      Email
                    </p>
                    <p className="font-bold text-brand-dark">
                      ambaltravels@gmail.com
                    </p>
                    <p className="text-gray-500 text-sm">
                      For detailed inquiries
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-card">
                  <div className="w-12 h-12 bg-brand-darker rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-brand-yellow" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5 font-medium uppercase tracking-wide">
                      Business Hours
                    </p>
                    <p className="font-bold text-brand-dark">24/7 — All Days</p>
                    <p className="text-gray-500 text-sm">Including holidays</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-card">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5 font-medium uppercase tracking-wide">
                      Location
                    </p>
                    <p className="font-bold text-brand-dark">
                      Tamil Nadu, India
                    </p>
                    <p className="text-gray-500 text-sm">
                      Serving all major cities
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-card">
                <h2 className="text-2xl font-bold text-brand-dark mb-2">
                  Book a Ride
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Fill in the form and we'll confirm your booking within
                  minutes.
                </p>
                <BookingForm dark={false} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
