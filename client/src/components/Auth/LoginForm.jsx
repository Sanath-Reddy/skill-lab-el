import React from "react";
import PageMeta from "../common/PageMeta";

const LoginForm = ({ title, color = "red", submit, email, setEmail, password, setPassword, showPassword, setShowPassword }) => {
  return (
    <>
      <PageMeta title="Login | RaktConnect" />

      <div className="flex justify-center items-center min-h-[70vh] px-4 bg-gray-50 py-12">
        <form
          onSubmit={submit}
          className="bg-white p-6 rounded border border-gray-300 shadow-sm max-w-sm w-full space-y-4"
        >
          <h2 className="text-xl font-bold text-center text-gray-900 border-b border-gray-100 pb-3">
            {title}
          </h2>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600 pr-10"
              />
              <button
                type="button"
                className="absolute right-2.5 top-2.5 text-xs text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded text-sm"
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
