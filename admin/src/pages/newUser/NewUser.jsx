import { useState } from "react";
import "./newUser.css";
import { useDispatch } from "react-redux";
import { createUser } from "../../api2/apiCalls";
import {
  createUserStart,
  createUserSuccess,
  createUserFailure,
} from '../../redux/usersRedux';

export default function NewUser() {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({
    username: "",
    email: ""
  });

  const handleChange = (e) => {
    setNewUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    //createNewUser(newUser);
  };

  const createNewUser = async (user) => {
    dispatch(createUserStart());
    try {
      const res = await createUser(user);
      if (res?.status === 200) {
        dispatch(createUserSuccess(res.data));
      }
    } catch (err) {
      dispatch(createUserFailure());
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="john"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@gmail.com"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}
