import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import PageMeta from '../common/PageMeta';

const Campaigns = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const activeCampaigns = [
    {
      title: "Summer Blood Drive",
      date: "March 3rd, 2025",
      location: "City Convention Center",
      type: "Blood Drive",
      details: `Our annual Summer Blood Drive is back! With rising hospital needs, we’re calling on all donors to step forward.
• Free health screening and refreshments.
• Gift kits for all participants.
• Walk-ins welcome between 9 AM to 5 PM.`
    },
    {
      title: "Emergency O-Need",
      date: "Ongoing",
      location: "All Donation Centers",
      type: "Urgent Request",
      details: `Due to a recent emergency, our O-negative supply is critically low. If you're O- and eligible, please donate now.
• No prior appointment needed.
• Open late till 8 PM this week.
• Your donation can save trauma and surgery patients today.`
    },
    {
      title: "College Camp Blood Connect",
      date: "July 10th, 2025",
      location: "XYZ University",
      type: "Blood Drive",
      details: `Join students from across the state to donate and raise awareness.
• Guest speaker: Dr. Mehta on youth health.
• Awareness booths and poster displays.
• Participation certificates available.`
    },
    {
      title: "Community Awareness Week",
      date: "Aug 15–20, 2025",
      location: "Multiple locations",
      type: "Awareness Event",
      details: `A city-wide movement to educate citizens on the importance of regular blood donation.
• Includes talks from doctors, live donor stories, and Q&A sessions.
• Locations include malls, schools, and colleges.`
    },
    {
      title: "Corporate Blood Drive Marathon",
      date: "September 5th, 2025",
      location: "TechHub Tower, Sector 45",
      type: "Corporate Drive",
      details: `A joint initiative with 30+ companies to donate blood for city hospitals.
• Open to all employees and their families.
• Free coffee and snack counters.
• Live donor health tracking dashboard.`
    },
    {
      title: "Red Ribbon Walkathon & Camp",
      date: "October 2nd, 2025",
      location: "Greenfield Park",
      type: "Fundraiser & Camp",
      details: `Walk for awareness followed by a blood donation camp.
• 5K Walkathon registration starts at 6:30 AM.
• Live music and breakfast post-walk.
• Blood collection begins at 9 AM.`
    },
    {
      title: "Festival of Life - Diwali Drive",
      date: "October 28th, 2025",
      location: "All Partner Clinics",
      type: "Seasonal Campaign",
      details: `Celebrate Diwali by giving the gift of life.
• Decorated festive stations with Diwali sweets.
• Surprise gifts for first 100 donors.
• Clinics open extended hours till 9 PM.`
    },
    {
      title: "Women for Life – Blood Drive",
      date: "November 14th, 2025",
      location: "Women's Health Pavilion",
      type: "Special Campaign",
      details: `An all-women donor drive promoting female health & empowerment.
• Gynaecologist consultation booths.
• Health gift packs for women donors.
• Men are welcome too — donate in support!`
    }
  ];

  return (
    <>
      <PageMeta title="Campaigns | RaktConnect" />

      {/* Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded border border-gray-300 max-w-lg w-full p-6 relative">
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl font-bold"
              onClick={() => setSelectedCampaign(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-red-600 mb-2">{selectedCampaign.title}</h2>
            <p className="text-xs text-gray-600 mb-1 flex items-center gap-1.5">
              <FaCalendarAlt className="text-red-600" /> {selectedCampaign.date}
            </p>
            <p className="text-xs text-gray-600 mb-4 flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-red-600" /> {selectedCampaign.location}
            </p>
            <div className="whitespace-pre-line text-sm text-gray-700 leading-relaxed border-t border-gray-100 pt-3">
              {selectedCampaign.details}
            </div>
            <button
              onClick={() => setSelectedCampaign(null)}
              className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-1.5 rounded font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Page */}
      <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="border-b border-gray-200 pb-4 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Blood Donation Campaigns
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Active drives, emergency donation calls, and community events
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeCampaigns.map((campaign, index) => (
              <div
                key={index}
                className="bg-white rounded border border-gray-200 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      campaign.type === "Urgent Request"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {campaign.type}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {campaign.title}
                  </h3>

                  <div className="text-xs text-gray-600 mb-1 flex items-center gap-1.5">
                    <FaCalendarAlt className="text-gray-400" />
                    <span>{campaign.date}</span>
                  </div>

                  <div className="text-xs text-gray-600 flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{campaign.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCampaign(campaign)}
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-2 rounded"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Upcoming Notice */}
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Want to organize a blood drive?
            </h2>
            <p className="text-xs text-gray-600 mb-4">
              Partner with local hospitals and community volunteers through RaktConnect.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-medium px-4 py-2 rounded"
            >
              Contact Coordinators
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Campaigns;
