import React from 'react';

const Experience = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-blue-100 py-28 px-4 text-center shadow-sm">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 mb-4">The QuickStay Experience</h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-700">
          Discover comfort, convenience, and premium hospitality at every step of your stay.
        </p>
      </div>

      {/* Highlights / Features Section */}
      <div className="max-w-6xl mx-auto py-12 px-4 grid md:grid-cols-3 gap-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-blue-800 text-xl font-semibold mb-3">Elegant Rooms</h3>
          <p className="text-gray-700">
            Relax in beautifully designed rooms with premium amenities tailored for ultimate comfort.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-blue-800 text-xl font-semibold mb-3">World-Class Service</h3>
          <p className="text-gray-700">
            Enjoy 24/7 room service, concierge assistance, and staff committed to exceeding expectations.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-blue-800 text-xl font-semibold mb-3">Prime Locations</h3>
          <p className="text-gray-700">
            Convenient access to city landmarks, transport, and local attractions for a seamless visit.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-blue-50 py-12 px-4">
        <h2 className="text-3xl text-center text-blue-800 font-bold mb-8">What Our Guests Say</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition">
            <p className="text-gray-700 italic">
              "QuickStay made our trip unforgettable. Beautiful rooms and amazing service!"
            </p>
            <p className="text-blue-800 font-semibold mt-4">– Sarah M.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition">
            <p className="text-gray-700 italic">
              "Fantastic location and staff who truly care about their guests."
            </p>
            <p className="text-blue-800 font-semibold mt-4">– James R.</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 py-16 px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4">Ready for Your Stay?</h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Book your room today and experience hospitality redefined with QuickStay.
        </p>
        <a
          href="/rooms"
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition transform hover:scale-105"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};

export default Experience;
