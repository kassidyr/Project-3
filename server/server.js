const express = require("express");
// import ApolloServer
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  // Start the Apollo server
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// Initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//Set up payment intent for stripe
const stripe = require("stripe")('pk_test_51KTGJSFQWj5xi5NvCTQjnDNEryWbFtgtP46n6mSabCKy0lHfYLaV4OnvmKVf0FI8R5mvE05Y1RAsQE9cKBMnRzhS00NmPXaUW5');

// const calculateOrderAmount = (items) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };

app.post("/create-payment-intent", async (req, res) => {
  const { paymentMethodType, currency } = req.body;

  // Create a PaymentIntent with the order amount and currency
  try{
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 20, //(items),
      currency: "usd",
      payment_method_types:[paymentMethodType],
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch(e) {
    res.json(400).json({error: {message: e.message}});
  }
  
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});


