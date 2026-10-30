import React, { useState } from 'react';
import PageMeta from '../common/PageMeta';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setIsSuccess(false);
      setModalMessage('Please fill in all fields.');
      setShowModal(true);
      return;
    }

    if (!email.includes('@')) {
      setIsSuccess(false);
      setModalMessage('Please enter a valid email address.');
      setShowModal(true);
      return;
    }

    setIsSuccess(true);
    setModalMessage('Message sent successfully!');
    setShowModal(true);

    setName('');
    setEmail('');
    setMessage('');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <PageMeta title="Contact | RaktConnect" />

      <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="border-b border-gray-200 pb-4 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
            <p className="text-sm text-gray-600 mt-1">
              Reach out to our support coordinators or submit an inquiry
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Info */}
            <div className="p-6 bg-gray-50 border border-gray-200 rounded">
              <h2 className="text-base font-semibold text-gray-900 mb-4">
                Helpline & Office Details
              </h2>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <span className="font-medium text-gray-900">Helpline:</span> 1-800-555-HELP
                </p>
                <p>
                  <span className="font-medium text-gray-900">Email:</span> support@raktconnect.org
                </p>
                <p>
                  <span className="font-medium text-gray-900">Address:</span> 123 Health Lab Road, Sector 4, Bangalore
                </p>
                <p>
                  <span className="font-medium text-gray-900">Operating Hours:</span> 24/7 for emergency blood requests
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 bg-white border border-gray-200 rounded">
              <h2 className="text-base font-semibold text-gray-900 mb-4">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your query here..."
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded border border-gray-300 max-w-sm w-full text-center">
            <h3 className={`text-base font-bold mb-2 ${isSuccess ? 'text-green-700' : 'text-red-600'}`}>
              {isSuccess ? 'Success' : 'Notice'}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-medium px-4 py-1.5 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
