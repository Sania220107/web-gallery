import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Logo from "../../assets/Logo.jpg"

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [success, setSuccess] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email and password are required");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setIsSuccess(false);

    try {
      const adminAccounts = [
        { email: "Ristasaniaputri@gmail.com", password: "admin123"}
      ];

      const adminLogin = adminAccounts.find(
        (admin) => admin.email === email && admin.password === password
      );

      if(adminLogin) {
        setSuccess("Admin login successfully");
        setErrorMessage('');
        navigate("/dashboard");
        return;
      }


      const response = await axios.post("http://localhost:5000/auth/login", {
        Email: email,
        Password: password,
      });

      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.data.AccessToken);
        setIsSuccess(true);
        setTimeout(() => navigate("/"), 2000);
      }

      if(response.status === 200) {
        const data = response.data;
        setSuccess("login sucessfully");
        setErrorMessage('');

        if(data.Role === "admin") {
          navigate("/dashboard");

        }else{
          navigate("/")
        }
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed, please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-2xl transform transition-all duration-500 hover:shadow-3xl">
        <img
                  src={Logo}
                  alt="Logo"
                  className="w-24 h-24 mx-auto shadow-lg rounded-full transition-transform duration-300 hover:scale-105"
                />
          <h2 className="text-xl font-bold text-center text-black mb-4">
            Sign In
          </h2>
          {errorMessage && (
            <div className="text-red-500 text-center text-sm mb-3">
              {errorMessage}
            </div>
          )}
          {isSuccess && (
            <div className="flex flex-col items-center mb-3">
              <CheckCircle className="text-green-500 w-8 h-8" />
              <p className="text-green-500 text-center text-sm mt-2">
                Login successful! Redirecting...
              </p>
            </div>
          )}
          {!isSuccess && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="email" className="block text-black text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 bg-white border border-black text-black rounded-md text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-black text-sm">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 bg-white border border-black text-black rounded-md text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className={`w-full py-2 text-sm text-white rounded-md ${
                  loading
                    ? "bg-black cursor-not-allowed"
                    : "bg-black hover:opacity-80"
                }`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
            </form>
          )}
          <div className="text-center mt-3">
            <p className="text-black text-sm">
              Don't have an account?{" "}
              <button
                className="text-black font-bold underline"
                onClick={() => navigate("/signup")}
              >
                Register here
              </button>
            </p>
          </div>
      </div>
    </div>
  );
};

export default SignIn;
