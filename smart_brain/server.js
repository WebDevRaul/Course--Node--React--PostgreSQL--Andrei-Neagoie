const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: 1,
      name: 'Jhon',
      email: 'Jhon@test.com',
      password: 'password',
      entries: 0,
      joined: new Date()
    },
    {
      id: 2,
      name: 'Sally',
      email: 'Sally@test.com',
      password: 'password',
      entries: 0,
      joined: new Date()
    }
  ]
}

// ROUTES
// Sign in
app.post('/sign-in', (req, res) => {
  const { email, password } = req.body;
  if(email === database.users[0].email && password === database.users[0].password) {
    res.json('success')
  } else {
    res.status(400).json('error loggin in')
  }
})

// Register
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: 3,
    name,
    email,
    password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length-1])
})

// Run server
const PORT = 5678;
app.listen(`${PORT}`, () => {
  console.log(`Server is running on port ${PORT}`)
})