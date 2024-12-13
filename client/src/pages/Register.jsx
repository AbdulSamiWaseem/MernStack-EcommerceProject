import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from 'react-router-dom';
import apiRequest from "../api";
import { useFormik } from 'formik'
import { registerUserSchema } from "../schema";
import { capitalizeFirstLetter } from "../utils";
import { toast } from "react-toastify";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 45%;
  margin: 20px 20px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Error = styled.p`
 color:red;
 font-size:12px;
`
const Entity = styled.div`
 display:flex;
 flex-direction:column;
`
const createUser = async (values) => {
  const res = await apiRequest("POST", "auth/register", values);
  if(res?.status==201){
    toast.success("User created successfuly.")
  }
  else
  toast.error("User not created");


}



const Register = () => {
  const { values, errors, handleSubmit, handleChange, handleBlur, touched } = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',

    },
    validationSchema: registerUserSchema,
    onSubmit: (values,actions) => {
      console.log("values", values);
      createUser(values);
      actions.resetForm();


    }
  })

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Entity>
            <Input placeholder="name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
            {errors.name && touched.name
              ? <Error className="formErrors">{capitalizeFirstLetter(errors.name)}</Error>
              : null
            }
          </Entity>
          <Entity>
            <Input placeholder="last name" name="lastname" value={values.lastname} onChange={handleChange} onBlur={handleBlur} />
            {errors.lastname && touched.lastname
              ? <Error className="formErrors">{capitalizeFirstLetter(errors.lastname)}</Error>
              : null
            }
          </Entity>
          <Entity>
            <Input placeholder="username" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
            {errors.username && touched.username
              ? <Error className="formErrors">{capitalizeFirstLetter(errors.username)}</Error>
              : null
            }
          </Entity>
          <Entity>
            <Input placeholder="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
            {errors.email && touched.email
              ? <Error className="formErrors">{capitalizeFirstLetter(errors.email)}</Error>
              : null
            }
          </Entity>
          <Entity>
            <Input placeholder="password" name="password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
            {errors.password && touched.password
              ? <Error className="formErrors">{capitalizeFirstLetter(errors.password)}</Error>
              : null
            }
          </Entity>
          <Entity>
            <Input placeholder="confirm password" name="confirmPassword" type="password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
            {errors.confirmPassword && touched.confirmPassword
              ? <Error className="formErrors">{capitalizeFirstLetter(errors.confirmPassword)}</Error>
              : null
            }
          </Entity>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>

  );
};

export default Register;
