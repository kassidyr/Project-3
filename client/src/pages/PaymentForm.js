import {withRouter} from 'react-router-dom';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
//import CheckoutForm from './CheckoutForm';
import { Link } from 'react-router-dom';
//import {loadStripe} from '@stripe/stripe-js'

const PaymentForm=()=>{
    // const elements=useElements();
    // const stripe=useStripe();

    // const handleSubmit=async(e)=>{
    //     e.preventDefault();

    //     if(!stripe || !elements) {
    //         return;
    //     }

    //     Do something with the element.
    //     const cardElement=elements.getElement(CardElement);
    //     console.log('card',cardElement);
    //     console.log('stripe', stripe);
    // }

    const stripe = useStripe();
    const elements = useElements();
    // const stripePromise=loadStripe('pk_test_51KTGJSFQWj5xi5NvCTQjnDNEryWbFtgtP46n6mSabCKy0lHfYLaV4OnvmKVf0FI8R5mvE05Y1RAsQE9cKBMnRzhS00NmPXaUW5');
    
    const handleSubmit = async(stripe,elements)=>{
        const cardElement=elements.getElement(CardElement)
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
          });
      
          if (error) {
            console.log('error:', error);
          } else {
            console.log('Payment method:', paymentMethod);
            // ... POST: /api/charge/user
          }
    }
    
    return (
        
        // <Elements stripe={stripePromise}>
            
            <div>
                <h1>Payment Form</h1>
                <CardElement /> 
                <Link to="/checkout"><button onClick={()=>handleSubmit(stripe,elements)}>Donate♥</button></Link>
            </div>
        //</Elements>
        //<Link to="/donation">Donate to Us</Link>
    )
};

export default withRouter(PaymentForm);

// <form onSubmit={handleSubmit}>
        //     <CardElement />
        //     <button>Pay</button>
        // </form>