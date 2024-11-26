import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userRedux";
import { loginUser } from "../../api2/apiCalls";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate =useNavigate()

  const handleClick = (e) => {
    e.preventDefault();
    login({ username, password });
  };
  const login = async ( user) => {
    dispatch(loginStart());
    try {
      // const res = await publicRequest.post("/auth/login", user);
      const res = await loginUser(user)
      if(res?.status == 200){
      dispatch(loginSuccess(res.data));
      navigate("/")
      
      }
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width:100 }}>
        Login
      </button>
    </div>
  );
};

export default Login;
