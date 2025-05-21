"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Fashion",
    description: "Unique clothing and accessories",
    image: "/placeholder.svg?height=400&width=400&text=👕",
    href: "/category/fashion",
  },
  {
    id: 2,
    name: "Home Decor",
    description: "Handcrafted items for your space",
    image: "/placeholder.svg?height=400&width=400&text=🏠",
    href: "/category/home-decor",
  },
  {
    id: 3,
    name: "Jewelry",
    description: "One-of-a-kind pieces",
    image: "/placeholder.svg?height=400&width=400&text=💍",
    href: "/category/jewelry",
  },
  {
    id: 4,
    name: "Art & Collectibles",
    description: "Unique artwork and collectibles",
    image: "/placeholder.svg?height=400&width=400&text=🎨",
    href: "/category/art",
  },
];

export default function ProductCategories() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-base font-semibold leading-7 text-indigo-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Browse Categories
          </motion.h2>
          <motion.p
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore our curated collections
          </motion.p>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover products across our most popular categories, each featuring
            unique items from independent creators.
          </motion.p>
        </div>

        <motion.div
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="group relative overflow-hidden rounded-xl bg-gray-800"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-xl">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">
                  {category.name}
                </h3>
                <p className="mt-2 text-gray-400">{category.description}</p>
                <Link
                  href={category.href}
                  className="mt-4 inline-flex items-center text-indigo-400 hover:text-indigo-300"
                >
                  <span>Explore category</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
