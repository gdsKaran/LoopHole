import { Lobster } from "next/font/google";
import Link from "next/link";

const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
  size: "60",
});

export default function AboutPage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className={`${lobster.className} text-3xl text-indigo-700`}>
            About Us
          </h2>
          <p className={`${lobster.className} text-4xl text-black`}>
            Welcome to LoopHole
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            LoopHole is a vibrant community where you can share your thoughts,
            discover new ideas, and connect with fellow bloggers.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxvZ2luZ3xlbnwwfHwwfHx8MA%3D%3D"
                alt="Blogging"
                width={500}
                height={300}
                className="rounded-lg shadow-lg object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                Share Your Story
              </h3>
              <p className="text-gray-600 mt-2">
                Express yourself and share your unique perspective with our
                community. Your voice matters.
              </p>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGlkZWFzfGVufDB8fDB8fHww"
                alt="Reading Blogs"
                width={500}
                height={300}
                className="rounded-lg shadow-lg object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                Discover New Ideas
              </h3>
              <p className="text-gray-600 mt-2">
                Dive into a diverse range of topics and explore the thoughts and
                experiences of others.
              </p>
            </div>

            <div className="relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1661719880750-4c0de579cd09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvbW11bml0eXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Community"
                width={500}
                height={300}
                className="rounded-lg shadow-lg object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                Join Our Community
              </h3>
              <p className="text-gray-600 mt-2">
                Connect with like-minded individuals, follow your favorite
                bloggers, and engage in meaningful discussions.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-xl text-gray-500 text-center">
            Whether you're here to write, read, or connect, LoopHole is your
            space to thrive. Join us and be part of something special.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="Authenticate">
            <button
              className={`${lobster.className} bg-indigo-700 hover:bg-indigo-700 text-white-500 text-lg font-semibold py-3 px-6 rounded-lg`}
            >
              Start Your Journey
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
