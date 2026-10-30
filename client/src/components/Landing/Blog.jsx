import React from "react";
import PageMeta from "../common/PageMeta";

const blogs = [
  {
    title: "Saving Lives with Every Drop",
    date: "June 1, 2025",
    excerpt:
      "When time is critical, RaktConnect delivers. Read how a young patient received life-saving blood within 30 minutes, thanks to our smart donor-matching system that connects donors and hospitals efficiently.",
  },
  {
    title: "5 Common Myths About Blood Donation – Busted!",
    date: "May 24, 2025",
    excerpt:
      "Think donating blood makes you weak or you can't donate if you take vitamins? These myths hold back potential donors. Let's set the record straight and empower more people to save lives.",
  },
  {
    title: "Behind the Scenes: How RaktConnect Works",
    date: "May 10, 2025",
    excerpt:
      "Explore the architecture behind RaktConnect: from inventory tracking to automated notifications that connect voluntary donors to urgent hospital requirements.",
  },
  {
    title: "Why Young Donors Are the Future",
    date: "April 28, 2025",
    excerpt:
      "College students and young volunteers are stepping up to donate regularly and organize campus blood drives, fostering a long-term culture of community giving.",
  },
  {
    title: "The Journey of a Blood Bag: From Donor to Recipient",
    date: "April 14, 2025",
    excerpt:
      "Follow the journey of a single blood unit — from collection and testing to separation into plasma and platelets, followed by cold storage and hospital delivery.",
  },
  {
    title: "How to Prepare for Your First Blood Donation",
    date: "April 2, 2025",
    excerpt:
      "A quick checklist for first-time donors: drink plenty of water, have a light meal beforehand, avoid strenuous workouts right after, and rest comfortably.",
  },
  {
    title: "The Role of Technology in Modern Blood Donation",
    date: "March 20, 2025",
    excerpt:
      "Digital records, inventory alerts, and location mapping have replaced pen-and-paper donor registers, speeding up emergency blood dispatch.",
  },
  {
    title: "Emergency Response: How RaktConnect Coordinates During Need",
    date: "March 5, 2025",
    excerpt:
      "During critical shortage periods, coordinated communication between donor networks and trauma centers ensures urgent requirements are fulfilled rapidly.",
  },
];

const Blog = () => {
  return (
    <>
      <PageMeta title="Blog | RaktConnect" />

      <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="border-b border-gray-200 pb-4 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Articles & Updates
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Information on blood donation, donor health, and community initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs text-gray-500 font-medium">
                    {blog.date}
                  </span>
                  <h2 className="text-base font-semibold text-gray-900 mt-1 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
