import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../common/PageMeta";

const Auth = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    const lowercaseRole = role.toLowerCase();
    localStorage.setItem("selectedUserType", lowercaseRole);
    localStorage.setItem("userType", lowercaseRole);
    localStorage.setItem("authToken", "demo_token_" + lowercaseRole);
    navigate(`/${lowercaseRole}`);
  };

  useEffect(() => {
    document.title = "Login / Sign Up - RaktConnect";
  }, []);

  const roles = [
    { label: "Patient", value: "patient", description: "Request blood units and track requirements." },
    { label: "Donor", value: "donor", description: "Register donation details and view eligibility." },
    { label: "Hospital", value: "hospital", description: "Manage blood inventories and urgent requests." },
  ];

  return (
    <>
      <PageMeta title="Login / Register | RaktConnect" />

      <div className="min-h-screen py-16 px-4 bg-gray-50 flex items-center justify-center">
        <div className="max-w-xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to RaktConnect
            </h1>
            <p className="text-sm text-gray-600">
              Select your user type to continue
            </p>
          </div>

          <div className="space-y-4">
            {roles.map((role) => (
              <div
                key={role.value}
                onClick={() => handleLogin(role.value)}
                className="bg-white border border-gray-300 hover:border-red-500 rounded p-5 cursor-pointer flex items-center justify-between transition-colors shadow-sm"
              >
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    {role.label}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {role.description}
                  </p>
                </div>
                <button
                  type="button"
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-4 py-2 rounded"
                >
                  Continue →
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            Select your role to access your dashboard
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
