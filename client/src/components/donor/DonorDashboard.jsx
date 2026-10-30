import { useEffect, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import BASE_URL from "../../apiConfig";
import PageMeta from "../common/PageMeta";

const checkDonorInfo = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) return { error: "No auth token found" };

  const response = await fetch(`${BASE_URL}/donor/checkInfo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  return response.json();
};

const updateDonorInfo = async (donorData) => {
  const token = localStorage.getItem("authToken");
  if (!token) return { error: "No auth token found" };

  const response = await fetch(`${BASE_URL}/donor/updateInfo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, ...donorData }),
  });

  return response.json();
};

const statesList = [
  { value: "35", label: "Andaman and Nicobar Islands" },
  { value: "28", label: "Andhra Pradesh" },
  { value: "12", label: "Arunachal Pradesh" },
  { value: "18", label: "Assam" },
  { value: "10", label: "Bihar" },
  { value: "94", label: "Chandigarh" },
  { value: "22", label: "Chhattisgarh" },
  { value: "25", label: "Dadra And Nagar Haveli And Daman And Diu" },
  { value: "97", label: "Delhi" },
  { value: "30", label: "Goa" },
  { value: "24", label: "Gujarat" },
  { value: "96", label: "Haryana" },
  { value: "92", label: "Himachal Pradesh" },
  { value: "91", label: "Jammu and Kashmir" },
  { value: "20", label: "Jharkhand" },
  { value: "29", label: "Karnataka" },
  { value: "32", label: "Kerala" },
  { value: "37", label: "Ladakh" },
  { value: "31", label: "Lakshadweep" },
  { value: "23", label: "Madhya Pradesh" },
  { value: "27", label: "Maharashtra" },
  { value: "14", label: "Manipur" },
  { value: "17", label: "Meghalaya" },
  { value: "15", label: "Mizoram" },
  { value: "13", label: "Nagaland" },
  { value: "21", label: "Odisha" },
  { value: "34", label: "Puducherry" },
  { value: "93", label: "Punjab" },
  { value: "98", label: "Rajasthan" },
  { value: "11", label: "Sikkim" },
  { value: "33", label: "Tamil Nadu" },
  { value: "36", label: "Telangana" },
  { value: "16", label: "Tripura" },
  { value: "95", label: "Uttarakhand" },
  { value: "99", label: "Uttar Pradesh" },
  { value: "19", label: "West Bengal" },
];

const DonorDashboard = () => {
  const [donor, setDonor] = useState(null);
  const [missingInfo, setMissingInfo] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState({
    bloodType: "",
    lastDonationDate: "",
    state: "",
    district: "",
    medicalCondition: "",
  });
  const [bloodBanks, setBloodBanks] = useState([]);

  useEffect(() => {
    const fetchDonorInfo = async () => {
      const result = await checkDonorInfo();
      if (result.error) {
        console.error(result.error);
        return;
      }

      if (result.missing) {
        setMissingInfo(true);
      } else {
        setDonor(result.user);
        setFormData({
          bloodType: result.user.bloodType || "",
          lastDonationDate: result.user.lastDonationDate || "",
          state: result.user.state || "",
          district: result.user.district || "",
          medicalCondition: result.user.medicalCondition || "",
        });

        if (result.user.state) {
          getDistricts(result.user.state);
        }
      }
    };

    fetchDonorInfo();
  }, []);

  useEffect(() => {
    if (formData.district) {
      getBloodBanks();
    }
  }, [districts, formData.district]);

  const getDistricts = async (selectedState) => {
    if (!selectedState) return;

    const state = statesList.find((s) => s.label === selectedState);
    if (!state) return;

    const url = `https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETDISTRICTLIST&abfhttf=%5Cu0057%5Cu0031%5Cu0030%5Cu003d&selectedStateCode=${state.value}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.records && Array.isArray(data.records)) {
        setDistricts(
          data.records.map((record) => ({
            district: record.id,
            value: record.value,
          }))
        );
      } else {
        setDistricts([]);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
      setDistricts([]);
    }
  };

  const getBloodBanks = async () => {
    const state = statesList.find((s) => s.label === formData.state);
    const selectedDistrict = districts.find(
      (district) => district.district === formData.district
    );

    if (!state || !selectedDistrict) return;

    const url = `https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYBLOODBANK&stateCode=${state.value}&districtCode=${selectedDistrict.value}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.data && Array.isArray(data.data)) {
        const bloodBankList = data.data.map((entry) => ({
          id: entry[0],
          name: entry[1],
          address: entry[2],
          contact: entry[3],
          email: entry[4],
          type: entry[5],
          links: entry[6],
        }));
        setBloodBanks(bloodBankList);
      } else {
        setBloodBanks([]);
      }
    } catch (error) {
      console.error("Error fetching blood banks:", error.message);
      setBloodBanks([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "state") {
      getDistricts(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateDonorInfo(formData);
    if (result.success) {
      setMissingInfo(false);
      setDonor(formData);
    } else {
      console.error("Failed to update donor info");
    }
  };

  return (
    <>
      <PageMeta title="Donor Dashboard | RaktConnect" />

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {missingInfo ? (
            <div className="max-w-md mx-auto bg-white p-6 rounded border border-gray-300 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-1 text-center">
                Complete Donor Information
              </h2>
              <p className="text-xs text-gray-500 mb-4 text-center">
                Please update your blood group and location details
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Blood Type *
                  </label>
                  <select
                    name="bloodType"
                    className="w-full p-2 border border-gray-300 rounded text-sm bg-white"
                    value={formData.bloodType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A_positive">A+</option>
                    <option value="A_negative">A-</option>
                    <option value="B_positive">B+</option>
                    <option value="B_negative">B-</option>
                    <option value="AB_positive">AB+</option>
                    <option value="AB_negative">AB-</option>
                    <option value="O_positive">O+</option>
                    <option value="O_negative">O-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Last Donation Date *
                  </label>
                  <input
                    type="date"
                    name="lastDonationDate"
                    value={formData.lastDonationDate}
                    onChange={handleChange}
                    max={new Date().toISOString().split("T")[0]}
                    required
                    className="w-full p-2 border border-gray-300 rounded text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded text-sm bg-white"
                  >
                    <option value="">Select State</option>
                    {statesList.map((state) => (
                      <option key={state.value} value={state.label}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    District *
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded text-sm bg-white"
                  >
                    <option value="">Select District</option>
                    {districts.map((districtObj, index) => (
                      <option key={index} value={districtObj.district}>
                        {districtObj.district}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Medical Notes (Optional)
                  </label>
                  <input
                    type="text"
                    name="medicalCondition"
                    value={formData.medicalCondition}
                    onChange={handleChange}
                    placeholder="None"
                    className="w-full p-2 border border-gray-300 rounded text-sm bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded text-sm mt-3"
                >
                  Save & Continue
                </button>
              </form>
            </div>
          ) : (
            <div>
              <div className="border-b border-gray-200 pb-4 mb-6 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Nearby Blood Banks
                  </h1>
                  <p className="text-xs text-gray-600">
                    Showing authorized collection centers in your district ({formData.district || "Default"})
                  </p>
                </div>
                {donor && (
                  <div className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded">
                    <span className="text-gray-500">Registered Blood Group: </span>
                    <strong className="text-red-600">{donor.bloodType?.replace("_", " ") || "Not set"}</strong>
                  </div>
                )}
              </div>

              {bloodBanks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bloodBanks.map((bank, index) => (
                    (bank.contact || bank.email || bank.address) ? (
                      <div
                        key={index}
                        className="bg-white rounded border border-gray-200 p-4 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {bank.name || "Blood Bank Center"}
                            </h3>
                            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">
                              Open
                            </span>
                          </div>

                          <div className="space-y-1.5 text-xs text-gray-600 mb-3">
                            <p className="flex items-start gap-1">
                              <MapPin size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                              <span>{bank.address || "Address not provided"}</span>
                            </p>
                            {bank.email && (
                              <p className="flex items-center gap-1">
                                <Mail size={14} className="text-red-500 flex-shrink-0" />
                                <a href={`mailto:${bank.email}`} className="text-blue-600 hover:underline">
                                  {bank.email}
                                </a>
                              </p>
                            )}
                            {bank.contact && (
                              <p className="flex items-center gap-1">
                                <Phone size={14} className="text-red-500 flex-shrink-0" />
                                <span>{bank.contact}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        <button className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-1.5 rounded">
                          Book Appointment
                        </button>
                      </div>
                    ) : null
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded border border-gray-200">
                  <p className="text-sm text-gray-600">
                    No blood banks found in the selected district. Please check district settings.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DonorDashboard;
