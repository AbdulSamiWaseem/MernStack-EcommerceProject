import { useState } from "react";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { loginFailure, loginStart, loginSuccess } from "../redux/userRedux";
import apiRequest from "../api";
import { toast } from "react-toastify";
import { useFormik } from 'formik';
import { loginUserSchema } from "../schema";
import { capitalizeFirstLetter } from "../utils";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:0 100px;
  ${tablet({ flexDirection: "column", padding: "5px", justifyContent: "center" })}
  

`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  height:300px;
  margin-top:10px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Logo = styled.h1`
  font-size: 5rem;
  ${tablet({ fontSize: "4rem" })}
  ${mobile({ fontSize: "2.5rem" })}

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  background-color: darkgreen; 
  cursor: pointer;
  margin: 10px 0;
  border-radius:5px;

  &:disabled {
    cursor: not-allowed;
  }
  &:hover {
    background-color: green; 
  }
`;

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 12px;
//   text-decoration: underline;
//   cursor: pointer;
// `;

const Error = styled.span`
  color: red;
  font-size:12px;
`;

const Login = () => {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [fetching, setFetching] = useState(false)
  const [err, setErr] = useState(error)
  const navigate = useNavigate();
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: loginUserSchema,
    onSubmit: (values, actions) => {
      setFetching(true)
      login(values);
      actions.resetForm()
    }

  })


  const login = async (user) => {
    dispatch(loginStart());
    try {
      const res = await apiRequest("POST", "auth/login", user)
      if (res?.status == 200) {
        dispatch(loginSuccess(res.data));
        toast.success("Login Successfully")
      }
    } catch (err) {
      dispatch(loginFailure());
      toast.error("Login Failed")

    }
    setFetching(false);
  };
  return (
    <>
      <Container>
        <Logo>DILKASH.</Logo>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.username && touched.username
              ? <Error className="formErrors">{capitalizeFirstLetter(errors.username)}</Error>
              : null
            }
            <Input
              placeholder="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password
              ? <Error className="formErrors">{capitalizeFirstLetter(errors.password)}</Error>
              : null
            }
            <Button type="submit" disabled={fetching}>
              LOGIN
            </Button>
            {err && <Error>Something went wrong...</Error>}
            {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}
            <Link to='/register' style={{color:"black",fontSize:"14px",textDecoration:"underline"}}>CREATE A NEW ACCOUNT</Link>
          </Form>
        </Wrapper>
      </Container>
    </>

  );
};

export default Login;
