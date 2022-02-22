import React, { useState, useEffect } from "react";
import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
  
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      if (!stripe) {
        return;
      }
  
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
  
      if (!clientSecret) {
        return;
      }
  
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
    }, [stripe]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      setIsLoading(true);
  
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000",
        },
      });
  
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occured.");
      }
  
      setIsLoading(false);
    };
  
    return (
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    );
  }


//UNUSED FIRST CHUNK
// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     // We don't want to let default form submission happen here,
//     // which would refresh the page.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     const result = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       confirmParams: {
//         return_url: "https://my-site.com/order/123/complete",
//       },
//     });

//     if (result.error) {
//       // Show error to your customer (for example, payment details incomplete)
//       console.log(result.error.message);
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <button disabled={!stripe}>Submit</button>
//     </form>
//   )
// };




//UNUSED PART 2 
// function CheckoutForm() {
//     const [isPaymentLoading, setPaymentLoading] = useState(false);
//     const stripe = useStripe();
//     const elements = useElements();
//     const payMoney = async (e) => {
//       e.preventDefault();
//       if (!stripe || !elements) {
//         return;
//       }
//       setPaymentLoading(true);
//       const clientSecret = getClientSecret();
//       const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: "Faruq Yusuff",
//           },
//         },
//       });
//       setPaymentLoading(false);
//       if (paymentResult.error) {
//         alert(paymentResult.error.message);
//       } else {
//         if (paymentResult.paymentIntent.status === "succeeded") {
//           alert("Success!");
//         }
//       }
//     };
  
//     return (
//       <div
//         style={{
//           padding: "3rem",
//         }}
//       >
//         <div
//           style={{
//             maxWidth: "500px",
//             margin: "0 auto",
//           }}
//         >
//           <form
//             style={{
//               display: "block",
//               width: "100%",
//             }}
//             onSubmit = {payMoney}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <CardElement
//                 className="card"
//                 options={{
//                   style: {
//                     base: {
//                       backgroundColor: "white"
//                     } 
//                   },
//                 }}
//               />
//               <button
//                 className="pay-button"
//                 disabled={isPaymentLoading}
//               >
//                 {isPaymentLoading ? "Loading..." : "Pay"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }



//export default CheckoutForm;