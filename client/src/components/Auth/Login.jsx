import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../../apiConfig";
import PageMeta from "../common/PageMeta";
import LoginForm from "./LoginForm";

const roles = ["patient", "donor", "hospital"];

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
    <input
      {...props}
      className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
    />
  </div>
);

const Login = () => {
  const { userType } = useParams();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    medicalCondition: "",
    licenseNumber: "",
    state: "",
    district: "",
  });

  if (!roles.includes(userType)) return <Navigate to="/login" replace />;

  const label = userType.charAt(0).toUpperCase() + userType.slice(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const authenticate = async (path, body) => {
    try {
      const response = await fetch(`${BASE_URL}/${path}/${userType}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userType", userType);
      toast.success(isSignup ? "Account created!" : "Logged in successfully!");
      navigate(`/${userType}`);
    } catch (error) {
      toast.error(error.message === "Failed to fetch" ? "Cannot reach server" : error.message);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    authenticate("login", { emailId: email, password });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    authenticate("signup", { ...formData, emailId: email, password });
  };

  const toggle = (
    <p className="text-xs text-center text-gray-600 pb-8 bg-gray-50">
      {isSignup ? "Already have an account? " : "New to RaktConnect? "}
      <button
        type="button"
        onClick={() => setIsSignup(!isSignup)}
        className="text-red-600 font-medium hover:underline"
      >
        {isSignup ? "Sign in" : "Create an account"}
      </button>
      <span className="mx-2 text-gray-300">|</span>
      <Link to="/login" className="text-gray-600 hover:underline">
        Change role
      </Link>
    </p>
  );

  if (!isSignup) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <LoginForm
          title={`${label} Login`}
          submit={handleLogin}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        {toggle}
      </div>
    );
  }

  return (
    <>
      <PageMeta title="Sign Up | RaktConnect" />

      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center px-4 py-12">
          <form
            onSubmit={handleSignup}
            className="bg-white p-6 rounded border border-gray-300 shadow-sm max-w-sm w-full space-y-3"
          >
            <h2 className="text-xl font-bold text-center text-gray-900 border-b border-gray-100 pb-3">
              {label} Sign Up
            </h2>

            <Input
              label={userType === "hospital" ? "Hospital Name" : "Full Name"}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 8 chars, A-Z, a-z, 0-9, symbol"
              required
            />
            <Input
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="10 digit mobile number"
              required
            />

            {userType !== "hospital" && (
              <Input
                label="Age"
                name="age"
                type="number"
                min="1"
                max="100"
                value={formData.age}
                onChange={handleChange}
                required
              />
            )}

            {userType === "patient" && (
              <Input
                label="Medical Notes (Optional)"
                name="medicalCondition"
                value={formData.medicalCondition}
                onChange={handleChange}
              />
            )}

            {userType === "hospital" && (
              <>
                <Input
                  label="License Number"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="District"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded text-sm"
            >
              Create Account
            </button>
          </form>
        </div>
        {toggle}
      </div>
    </>
  );
};

export default Login;
