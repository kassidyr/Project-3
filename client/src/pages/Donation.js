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

// export default Donation;
import React from "react";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51KTGJSFQWj5xi5NvCTQjnDNEryWbFtgtP46n6mSabCKy0lHfYLaV4OnvmKVf0FI8R5mvE05Y1RAsQE9cKBMnRzhS00NmPXaUW5');

function Donation() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{mysecretsshhhhh}}',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Donation;