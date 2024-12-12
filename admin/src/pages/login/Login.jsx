import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/userRedux";
import { loginUser } from "../../api2/apiCalls";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const backgroundStyle = {
    backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/030/465/671/non_2x/contemporary-clothing-boutique-showcases-modern-clothes-on-hangers-in-stylish-arrangement-vertical-mobile-wallpaper-ai-generated-free-photo.jpg')`,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  };

  const handleClick = (e) => {
    e.preventDefault();
    login({ username, password });
  };
  const login = async (user) => {
    // const res = await publicRequest.post("/auth/login", user);
    const res = await loginUser(user)
    if (res?.status == 200) {
      dispatch(loginSuccess(res.data));
      toast.success('Login Successfully.')
      navigate("/")

    }


  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      height: "100vh",
      width: "100%"

    }}>

      <div style={backgroundStyle}>
        <h1 style={{ backdropFilter: 'blur(10px)' }}>DILKASH.</h1>
      </div>
      <div
        style={{
          height:"100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          padding:"0 10px",
          background: "linear-gradient(to bottom, rgba(4,9,3,1) 0%, rgba(32,44,44,1) 35%, rgba(143,103,54,1) 100%)",
        }}
      >
        <input
          style={{ padding: "0.5rem", marginBottom: "1rem" }}
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={{ padding: "0.5rem", marginBottom: "1rem" }}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} style={{ padding: 10, width: 100 }} className="btn btn-dark">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
