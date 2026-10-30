import React from 'react';
import { FaTint, FaHandHoldingHeart, FaShieldAlt, FaMapMarkerAlt, FaUsers, FaHeartbeat } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PageMeta from '../common/PageMeta';

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageMeta title="About | RaktConnect" />

      <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded">
              About RaktConnect
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3 mb-3">
              Connecting Donors with Patients in Need
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              A student lab project built to bridge the gap between voluntary blood donors, 
              healthcare centers, and patients requiring urgent transfusions.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <div className="text-2xl font-bold text-red-600">50K+</div>
              <div className="text-xs text-gray-600 mt-1">Lives Saved</div>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <div className="text-2xl font-bold text-red-600">120K+</div>
              <div className="text-xs text-gray-600 mt-1">Donors</div>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <div className="text-2xl font-bold text-red-600">500+</div>
              <div className="text-xs text-gray-600 mt-1">Hospitals</div>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <div className="text-2xl font-bold text-red-600">98%</div>
              <div className="text-xs text-gray-600 mt-1">Match Rate</div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-gray-50 border border-gray-200 p-6 rounded">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Our Mission</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              To create a reliable, efficient, and transparent platform that connects blood donors with 
              hospitals and patients in need, ensuring timely access to safe blood supplies while 
              promoting regular blood donation across communities.
            </p>
          </div>

          {/* Features Grid */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Platform Highlights
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded bg-white">
                <FaTint className="text-red-600 text-xl mb-2" />
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Simplified Donation</h3>
                <p className="text-xs text-gray-600">
                  Connect quickly with verified blood banks and hospitals near you.
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded bg-white">
                <FaHandHoldingHeart className="text-red-600 text-xl mb-2" />
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Community Driven</h3>
                <p className="text-xs text-gray-600">
                  Powered by compassionate donors committed to saving lives.
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded bg-white">
                <FaShieldAlt className="text-red-600 text-xl mb-2" />
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Safe & Verified</h3>
                <p className="text-xs text-gray-600">
                  Ensuring adherence to donor screening and eligibility requirements.
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded bg-white">
                <FaMapMarkerAlt className="text-red-600 text-xl mb-2" />
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Location Tracking</h3>
                <p className="text-xs text-gray-600">
                  Find nearest donation camps and centers with availability info.
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded bg-white">
                <FaUsers className="text-red-600 text-xl mb-2" />
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Donor Network</h3>
                <p className="text-xs text-gray-600">
                  Join fellow volunteers and participate in regional donation drives.
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded bg-white">
                <FaHeartbeat className="text-red-600 text-xl mb-2" />
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Health Records</h3>
                <p className="text-xs text-gray-600">
                  Track donation history and receive eligibility reminders.
                </p>
              </div>
            </div>
          </div>

          {/* Stories / Testimonials */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Community Experiences
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded bg-gray-50 text-sm">
                <p className="text-gray-700 italic mb-3">
                  "This platform made it easy to find where my blood type was needed most. I've donated regularly."
                </p>
                <div className="font-semibold text-gray-900 text-xs">Sarah Johnson</div>
                <div className="text-xs text-gray-500">Regular Donor</div>
              </div>

              <div className="p-4 border border-gray-200 rounded bg-gray-50 text-sm">
                <p className="text-gray-700 italic mb-3">
                  "In an emergency situation, we found a matching donor quickly through the portal."
                </p>
                <div className="font-semibold text-gray-900 text-xs">Michael Chen</div>
                <div className="text-xs text-gray-500">Patient Family</div>
              </div>

              <div className="p-4 border border-gray-200 rounded bg-gray-50 text-sm">
                <p className="text-gray-700 italic mb-3">
                  "Real-time requests and stock management improved our response times for critical blood needs."
                </p>
                <div className="font-semibold text-gray-900 text-xs">Dr. Anika Patel</div>
                <div className="text-xs text-gray-500">Hospital Coordinator</div>
              </div>
            </div>
          </div>

          {/* Simple CTA */}
          <div className="p-6 bg-red-600 text-white rounded text-center">
            <h3 className="text-lg font-bold mb-2">Ready to Make an Impact?</h3>
            <p className="text-xs sm:text-sm text-red-100 mb-4 max-w-xl mx-auto">
              Join thousands of donors and help hospitals keep life-saving blood supplies available.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-red-700 hover:bg-gray-100 text-xs sm:text-sm font-medium px-4 py-2 rounded"
              >
                Become a Donor
              </button>
              <button
                onClick={() => navigate("/banks")}
                className="border border-white text-white hover:bg-red-700 text-xs sm:text-sm font-medium px-4 py-2 rounded"
              >
                Find Blood Bank
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
