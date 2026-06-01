import { useState } from "react";
import { Mail, Lock, User as UserIcon } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!isLogin && !name) {
      toast.error("Please enter your name.");
      return;
    }

    setLoading(true);
    try {
      const url = isLogin ? "http://localhost:5000/api/login" : "http://localhost:5000/api/register";
      const payload = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(isLogin ? "Logged in!" : "Account created!");
        // Redirect – you can use navigate("/profile") if you have useNavigate
        window.location.href = "/profile";
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="login-card">
        <div className="login-tabs">
          <div
            className={`login-tab ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </div>
          <div
            className={`login-tab ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="login-input-group">
              <UserIcon className="login-icon" size={18} />
              <input
                type="text"
                className="login-input"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="login-input-group">
            <Mail className="login-icon" size={18} />
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group">
            <Lock className="login-icon" size={18} />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="login-input-group">
              <Lock className="login-icon" size={18} />
              <input
                type="password"
                className="login-input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        {isLogin && (
          <div className="login-divider">
            <button
              onClick={() => toast.info("Password reset link sent (demo)")}
              style={{
                background: "none",
                border: "none",
                color: "#ff3859",
                cursor: "pointer",
                marginTop: "12px",
                fontSize: "13px",
              }}
            >
              Forgot password?
            </button>
          </div>
        )}

        <div className="guest-btn" style={{ textAlign: "center", marginTop: "16px" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: "none",
              border: "none",
              color: "#ff3859",
              cursor: "pointer",
              marginLeft: "6px",
              fontWeight: "600",
            }}
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;