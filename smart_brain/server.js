const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: 1,
      name: 'test',
      email: 'test@test.com',
      password: '123456',
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
// Test
app.get('/', (req, res) => {
  res.json(database.users)
})

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

// Profile
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user)
    }
  })
  if(!found) return res.status(400).json('no such user')
})

// Entries
app.put('/image', (req, res) => {
  
})

// Run server
const PORT = 5678;
app.listen(`${PORT}`, () => {
  console.log(`Server is running on port ${PORT}`)
})