import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 opacity-70" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center py-12 md:py-16 lg:py-20">
          {/* Content */}
          <div className="w-full lg:w-1/2 lg:pr-12 z-10 ">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Discover Unique Finds from Independent Sellers
            </h1>

            <p className="mt-6 text-base md:text-lg text-gray-700 max-w-2xl">
              Shop handmade, vintage, and one-of-a-kind products directly from
              small businesses around the world.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-xl text-lg"
              >
                Start Shopping
              </Button>
              {/* <Button
                variant="outline"
                size="lg"
                className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-6 rounded-xl text-lg"
              >
                Become a Seller
              </Button> */}
            </div>

            <div className="mt-10 flex items-center gap-6">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-indigo-600">10,000+</span>{" "}
                happy customers
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0 z-10">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="relative">
                <div className="absolute -inset-4">
                  <div className="mx-auto h-full w-full max-w-lg rounded-3xl bg-gradient-to-r from-indigo-400 to-purple-400 opacity-30 blur-xl lg:max-w-none"></div>
                </div>
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
                  <div className="absolute -right-16 -bottom-10 hidden md:block">
                    <div className="bg-white rounded-xl shadow-lg p-4 w-48 transform rotate-6">
                      <div className="h-24 rounded-lg bg-gray-100 mb-3"></div>
                      <div className="h-3 w-3/4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                    </div>
                  </div>

                  <div className="absolute -left-10 top-10 hidden md:block">
                    <div className="bg-white rounded-xl shadow-lg p-4 w-40 transform -rotate-3">
                      <div className="h-20 rounded-lg bg-gray-100 mb-3"></div>
                      <div className="h-3 w-3/4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-1/3 right-0 w-60 h-60 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
    </div>
  );
}
