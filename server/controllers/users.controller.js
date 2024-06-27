const usersModelDb = require('../db.model/users.model');

const userData = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if required fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const newUsers = new usersModelDb({
      name: name,
      email: email,
      password: password
    });

    await newUsers.save();
    
    res.status(200).send('Registered successfully');
    console.log('User registered successfully');
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user', details: error.message });
    console.error('Failed to register user:', error);
  }
};

const loginData = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userLogin = await usersModelDb.findOne({ email: email, password: password });

    if (userLogin) {
      res.status(200).send(userLogin);
      console.log(`login api: ${userLogin}`);
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in', details: error.message });
    // console.error('Failed to log in:', error);
    console.log(`login api err: ${error}`);
  }
};

const getAllUsers = async(req, res)=>{

  try {
    const users = await usersModelDb.find()
    res.status(200).json(users)
    console.log('users get success api');
  } catch (error) {
    console.log(error);
    console.log('user get failed api');
  }
}

module.exports = { userData, loginData, getAllUsers };
