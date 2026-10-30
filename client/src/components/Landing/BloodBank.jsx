import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { FaClock, FaPhone, FaMapMarkerAlt, FaSearch, FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';
import PageMeta from '../common/PageMeta';

const INDIA_CENTER = [20.5937, 78.9629];
const DEFAULT_ZOOM = 5;
const SEARCH_ZOOM = 13;

const MapController = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (
      Array.isArray(center) &&
      typeof center[0] === 'number' &&
      typeof center[1] === 'number' &&
      typeof zoom === 'number'
    ) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
};

MapController.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
};

const bloodBanksDatabase = [
  {
    name: "AIIMS Main Blood Bank",
    city: "Delhi",
    state: "Delhi",
    lat: 28.5672,
    lng: 77.2100,
    address: "Ansari Nagar, New Delhi",
    hours: "24/7 Service",
    contact: "+91-11-26588500",
  },
  {
    name: "Red Cross Blood Center",
    city: "Delhi",
    state: "Delhi",
    lat: 28.6219,
    lng: 77.2144,
    address: "1 Red Cross Road, New Delhi",
    hours: "9:00 AM - 6:00 PM",
    contact: "+91-11-23716441",
  },
  {
    name: "KEM Hospital Blood Bank",
    city: "Mumbai",
    state: "Maharashtra",
    lat: 19.0024,
    lng: 72.8427,
    address: "Parel, Mumbai",
    hours: "24/7 Service",
    contact: "+91-22-24107000",
  },
  {
    name: "Tata Memorial Blood Bank",
    city: "Mumbai",
    state: "Maharashtra",
    lat: 19.0048,
    lng: 72.8436,
    address: "Dr. E Borges Road, Parel, Mumbai",
    hours: "24/7 Service",
    contact: "+91-22-24177000",
  },
  {
    name: "Bangalore Medical College Blood Center",
    city: "Bangalore",
    state: "Karnataka",
    lat: 12.9602,
    lng: 77.5744,
    address: "Fort Road, KR Market, Bangalore",
    hours: "24/7 Service",
    contact: "+91-80-26701150",
  },
  {
    name: "Apollo Hospital Blood Bank",
    city: "Chennai",
    state: "Tamil Nadu",
    lat: 13.0594,
    lng: 80.2505,
    address: "Greams Lane, Thousand Lights, Chennai",
    hours: "24/7 Service",
    contact: "+91-44-28290200",
  },
  {
    name: "Calcutta Medical College Blood Bank",
    city: "Kolkata",
    state: "West Bengal",
    lat: 22.5735,
    lng: 88.3639,
    address: "College Street, Kolkata",
    hours: "24/7 Service",
    contact: "+91-33-22551635",
  },
  {
    name: "Osmania General Hospital Blood Bank",
    city: "Hyderabad",
    state: "Telangana",
    lat: 17.3770,
    lng: 78.4739,
    address: "Afzal Gunj, Hyderabad",
    hours: "24/7 Service",
    contact: "+91-40-24600121",
  },
  {
    name: "Civil Hospital Blood Center",
    city: "Ahmedabad",
    state: "Gujarat",
    lat: 23.0525,
    lng: 72.6026,
    address: "Asarwa, Ahmedabad",
    hours: "24/7 Service",
    contact: "+91-79-22683721",
  },
  {
    name: "Sassoon General Hospital Blood Bank",
    city: "Pune",
    state: "Maharashtra",
    lat: 18.5284,
    lng: 73.8743,
    address: "Near Pune Station, Pune",
    hours: "24/7 Service",
    contact: "+91-20-26128000",
  },
  {
    name: "SMS Hospital Blood Bank",
    city: "Jaipur",
    state: "Rajasthan",
    lat: 26.8962,
    lng: 75.8167,
    address: "JLN Marg, Jaipur",
    hours: "24/7 Service",
    contact: "+91-141-2560291",
  },
  {
    name: "KGMU Blood Bank",
    city: "Lucknow",
    state: "Uttar Pradesh",
    lat: 26.8693,
    lng: 80.9161,
    address: "Chowk, Lucknow",
    hours: "24/7 Service",
    contact: "+91-522-2257450",
  },
  {
    name: "PMCH Blood Bank",
    city: "Patna",
    state: "Bihar",
    lat: 25.6207,
    lng: 85.1589,
    address: "Ashok Rajpath, Patna",
    hours: "24/7 Service",
    contact: "+91-612-2300080",
  }
];

const BloodBankLocator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState(INDIA_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const [hasSearched, setHasSearched] = useState(false);

  const bloodIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  const handleSearch = async (query = searchQuery) => {
    const term = query.trim();
    if (!term) return;
    setLoading(true);
    setHasSearched(true);

    const filtered = bloodBanksDatabase.filter(bank =>
      bank.city.toLowerCase().includes(term.toLowerCase()) ||
      bank.state.toLowerCase().includes(term.toLowerCase()) ||
      bank.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filtered);
    if (filtered.length > 0) {
      setMapCenter([filtered[0].lat, filtered[0].lng]);
      setMapZoom(SEARCH_ZOOM);
    } else {
      setMapCenter(INDIA_CENTER);
      setMapZoom(DEFAULT_ZOOM);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>
      <PageMeta title="Blood Bank Locator | RaktConnect" />

      <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Blood Bank Locator
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Find authorized blood banks and collection centers across cities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel */}
            <div className="lg:col-span-5 space-y-4">
              {/* Search Box */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Search Location / Hospital
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g. Delhi, Bangalore, AIIMS..."
                    className="flex-1 p-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-red-600"
                  />
                  <button
                    onClick={() => handleSearch()}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-1.5"
                  >
                    <FaSearch size={12} />
                    <span>Search</span>
                  </button>
                </div>
              </div>

              {/* Quick Search */}
              {!hasSearched ? (
                <div className="p-4 border border-gray-200 rounded">
                  <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Quick City Filter
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow', 'Patna', 'AIIMS'].map((city, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(city);
                          handleSearch(city);
                        }}
                        className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-red-50 hover:text-red-700 border border-gray-200 rounded"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setHasSearched(false);
                    setSearchResults([]);
                    setSearchQuery('');
                    setMapCenter(INDIA_CENTER);
                    setMapZoom(DEFAULT_ZOOM);
                  }}
                  className="flex items-center gap-1.5 text-xs text-red-600 font-medium hover:underline"
                >
                  <FaArrowLeft size={10} /> Back to all quick filters
                </button>
              )}

              {/* Results List */}
              {hasSearched && (
                <div className="border border-gray-200 rounded p-4">
                  <div className="text-xs font-semibold text-gray-700 mb-3">
                    Found {searchResults.length} blood bank{searchResults.length !== 1 ? 's' : ''}
                  </div>

                  {searchResults.length === 0 ? (
                    <p className="text-xs text-gray-500 py-4 text-center">
                      No blood banks found matching "{searchQuery}". Try another city.
                    </p>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                      {searchResults.map((bank, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setMapCenter([bank.lat, bank.lng]);
                            setMapZoom(15);
                          }}
                          className="p-3 border border-gray-200 rounded hover:border-red-500 cursor-pointer bg-white"
                        >
                          <h4 className="text-sm font-semibold text-gray-900 mb-1">
                            {bank.name}
                          </h4>
                          <p className="text-xs text-gray-600 flex items-start gap-1 mb-1">
                            <FaMapMarkerAlt className="text-red-600 mt-0.5 flex-shrink-0" />
                            <span>{bank.address}, {bank.city}</span>
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
                            <span className="flex items-center gap-1">
                              <FaClock className="text-gray-400" /> {bank.hours}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaPhone className="text-gray-400" /> {bank.contact}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Panel - Map */}
            <div className="lg:col-span-7">
              <div className="border border-gray-200 rounded overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Map View
                </div>
                <div className="h-[450px] w-full">
                  <MapContainer
                    center={INDIA_CENTER}
                    zoom={DEFAULT_ZOOM}
                    className="h-full w-full"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; OpenStreetMap contributors'
                    />
                    <MapController center={mapCenter} zoom={mapZoom} />
                    {searchResults.map((bank, index) => (
                      <Marker
                        key={index}
                        position={[bank.lat, bank.lng]}
                        icon={bloodIcon}
                      >
                        <Popup>
                          <div className="text-xs">
                            <strong className="text-red-700 block mb-1">{bank.name}</strong>
                            <p>{bank.address}</p>
                            <p className="text-gray-500 mt-1">{bank.contact}</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BloodBankLocator;
