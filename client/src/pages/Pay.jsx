import React, { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  // const history = useHistory()
  const onToken = (token) => {
    // console.log(token);
    setStripeToken(token);

  }
  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await axios.post("http://localhost:5000/api/checkout/payment",{
  //         tokenId:stripeToken,
  //         amount:100
  //       })
  //       console.log(res.data)
  //       history.push("/success")

  //     }
  //     catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   stripeToken && makeRequest()
  // }, [stripeToken,history])
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {stripeToken
      ? (<span>Processing. Please wait .....</span>)
      : (<StripeCheckout
        name='EcommerceWebsite'
        image='test'
        description='You total is 100$'
        amount={100}
        billingAddress
        shippingAddress
        token={onToken}
        stripeKey={process.env.REACT_APP_STRIPE}
      >
        <button style={{
          border: "none",
          width: 120,
          borderRadius: 5,
          padding: "20px",
          backgroundColor: "black",
          color: "white",
          fontWeight: "600",
          cursor: "pointer"
        }}>
          Pay Now
        </button>
      </StripeCheckout>)

      }
      
    </div>
  )
}

export default Pay
