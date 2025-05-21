"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { ContainerTextFlip } from "./ui/container-text-flip";
import { TextGenerateEffect } from "./ui/text-generate-effect";
const words = `Discover effective, luxurious, and results-driven skincare and makeup designed to elevate your natural beauty. 
`;
export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 opacity-70" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center py-12 md:py-16 lg:py-20">
          {/* Content */}
          <motion.div
            className="w-full lg:w-1/2 lg:pr-12 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              <span className="block">Discover Unique Finds</span>
              <ContainerTextFlip
                words={["smooth", "beauty", "revitalizing", "glowing"]}
              />
              <span className="block text-indigo-600">
                with premium skincare & makeup.
              </span>
            </h1>
            <TextGenerateEffect duration={2} filter={false} words={words} />

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-xl text-lg group"
              >
                <ShoppingBag className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Start Shopping
              </Button>
            </motion.div>
            <motion.div
              className="mt-6 flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <p className="text-sm text-gray-600">
                <span className="font-medium text-indigo-600">10,000+</span>{" "}
                happy customers
              </p>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="w-full lg:w-1/2 mt-12 lg:mt-0 z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="relative">
                <motion.div
                  className="absolute -inset-4"
                  animate={{
                    boxShadow: [
                      "0px 0px 0px rgba(79, 70, 229, 0.2)",
                      "0px 0px 30px rgba(79, 70, 229, 0.4)",
                      "0px 0px 0px rgba(79, 70, 229, 0.2)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="mx-auto h-full w-full max-w-lg rounded-3xl bg-gradient-to-r from-indigo-400 to-purple-400 opacity-30 blur-xl lg:max-w-none"></div>
                </motion.div>
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <div className="aspect-[4/3] lg:aspect-[16/9]">
                    <Image
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                      alt="Stylish woman shopping with bags"
                      width={800}
                      height={600}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product cards overlaid on the image */}
                  <motion.div
                    className="absolute -right-16 -bottom-10 hidden md:block"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    <div className="bg-white rounded-xl shadow-lg p-4 w-48 transform rotate-6">
                      <div className="h-24 rounded-lg bg-gray-100 mb-3"></div>
                      <div className="h-3 w-3/4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -left-10 top-10 hidden md:block"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    <div className="bg-white rounded-xl shadow-lg p-4 w-40 transform -rotate-3">
                      <div className="h-20 rounded-lg bg-gray-100 mb-3"></div>
                      <div className="h-3 w-3/4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 left-0 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 20, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-0 w-60 h-60 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, -20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
