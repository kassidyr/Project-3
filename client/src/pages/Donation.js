// import { StripeProvider } from '@stripe/stripe-react-native';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

// function Donation() {
//   return (
//     <StripeProvider
//       publishableKey="pk_test_51KTGJSFQWj5xi5NvCTQjnDNEryWbFtgtP46n6mSabCKy0lHfYLaV4OnvmKVf0FI8R5mvE05Y1RAsQE9cKBMnRzhS00NmPXaUW5"
//     //   urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
//     //   merchantIdentifier="merchant.com.{{SPACEBOOK}" // required for Apple Pay
//     >
//       // Your app code here
//     </StripeProvider>
//   );
// };


import React,{ useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
//import CheckoutForm from "./CheckoutForm";
import App from '../App';
import PaymentForm from "./PaymentForm";


async function Donation() {
    const {publishableKey}=await fetch('/config').then(r=>r.json());
    const stripePromise=loadStripe("publishableKey");

            <Elements stripe={stripePromise}>
                <h1>Donate</h1>
                <p>Donations help keep the site running, we appreciate any amount you can give. Thank you!</p>
                <App />
            </Elements>   
    
}
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

//const stripePromise=loadStripe("pk_test_51KTGJSFQWj5xi5NvCTQjnDNEryWbFtgtP46n6mSabCKy0lHfYLaV4OnvmKVf0FI8R5mvE05Y1RAsQE9cKBMnRzhS00NmPXaUW5");

// FROM STRIPEDOCS USE CHECKOUT PART 2 UNUSED
// export default function Donation() {
//     const [clientSecret, setClientSecret] = useState("");
  
//     useEffect(() => {
//       // Create PaymentIntent as soon as the page loads
//       fetch("/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
//       })
//         .then((res) => res.json())
//         .then((data) => setClientSecret(data.clientSecret));
//     }, []);
  
//     const appearance = {
//       theme: 'night',
//     };
//     const options = {
//       clientSecret,
//       appearance,
//     };
  
//     return (
//       <div className="App">
//         {clientSecret && (
//           <Elements options={options} stripe={stripePromise}>
//             <CheckoutForm />
//           </Elements>
//         )}
//       </div>
//     );
//   }

// const Donation=()=>{
//     const {publishableKey}=await fetch('/config').then(r=>r.json());
//     const stripePromise=loadStripe("publishableKey");

//     return (
//         <Elements stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       );
// };




// function Donation() {
//   const options = {
//     // passing the client secret obtained from the server
//     clientSecret: '{{mysecretsshhhhh}}',
//   };

//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <CheckoutForm />
//     </Elements>
//   );
// };



export default Donation;