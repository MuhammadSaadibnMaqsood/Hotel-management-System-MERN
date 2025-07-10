import React from 'react';
const About = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 py-28 px-4 sm:px-8 lg:px-24 ">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">About QuickStay</h1>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
          QuickStay is your trusted partner in hassle-free hotel bookings. We provide a seamless experience for hotel owners and guests alike,
          ensuring that every stay is convenient, comfortable, and memorable. With a user-friendly interface, real-time availability,
          and secure transactions, QuickStay empowers you to manage listings, monitor bookings, and grow your hospitality business efficiently.
        </p>

        {/* Mission & Vision */}
        <div className="grid sm:grid-cols-2 gap-8 mb-10">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Our Mission</h2>
            <p className="text-gray-600">
              To simplify the hotel booking process by connecting guests and hosts through a smart, secure, and scalable platform.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Our Vision</h2>
            <p className="text-gray-600">
              To become the go-to platform for hotel bookings and hospitality management across the globe.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Why Choose QuickStay?</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Real-time room availability and updates</li>
            <li>Simple and intuitive room management dashboard</li>
            <li>Secure and fast booking experience</li>
            <li>Responsive support team for quick issue resolution</li>
            <li>Beautiful and mobile-friendly interface</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
