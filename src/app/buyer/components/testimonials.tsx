"use client";

import { motion } from "framer-motion";
import { Star, UserRound } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "I've been shopping here for years and the quality of products never disappoints. The customer service is exceptional!",
    author: "Sarah Johnson",
    role: "Loyal Customer",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Found so many unique items that I couldn't find anywhere else. Shipping was fast and everything arrived in perfect condition.",
    author: "Michael Chen",
    role: "First-time Buyer",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "The attention to detail in every product I've purchased is amazing. You can really tell these are made with care.",
    author: "Emma Rodriguez",
    role: "Regular Shopper",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-base font-semibold leading-7 text-indigo-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Testimonials
          </motion.h2>
          <motion.p
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hear from our happy customers
          </motion.p>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Don't just take our word for it — see what our community has to say
            about their shopping experience.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="flex flex-col justify-between rounded-2xl bg-gray-50 p-8 shadow-sm ring-1 ring-gray-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div>
                <div className="flex items-center gap-x-1 text-indigo-600">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "fill-indigo-500 text-indigo-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                  "{testimonial.quote}"
                </div>
              </div>
              <div className="mt-8 flex items-center gap-x-4">
                <UserRound className="h-12 w-12 rounded-full bg-gray-100 text-gray-400 p-2" />
                <div>
                  <div className="text-base font-semibold leading-6 text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm leading-6 text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
