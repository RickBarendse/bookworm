const express = require('express');

// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const path = require('path');


// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
// const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// Create new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// const { Server } = require('http');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


const startApolloServer = async (typeDefs, resolvers ) => {
  await server.start();
  server.applyMiddleware({ app });


// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  })
};


// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
