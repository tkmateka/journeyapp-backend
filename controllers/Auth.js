require('dotenv').config();

const bcrypt = require('bcrypt')

const Employee = require('../models/Employee');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION).then(console.log('connected to DB')).catch((err) => console.log(err));

module.exports = {
    register: async (req, res) => {
        try {
              // The second parameter is the default salt
              const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
              let emp = { ...req.body };
              emp.password = hashedPassword;
  
              const newEmployee = new Employee({ ...emp });
              const result = await newEmployee.save();
              
              res.status(201).send({ message: "User registered successfully." });
          } catch (e) {
              res.status(500).send(e);
          }
    },
    login: async (req, res) => {
        const user = await Employee.find({ email: req.body.email });

        console.log("user", user);

        if (!user[0]) return res.status(400).send('User not found');

        // Authenticate User
        try {
            // Use Bcrypt compare the found User password with the incoming Request User password
            bcrypt.compare(req.body.password, user[0].password).then(doesMatch => {
                if (doesMatch) {
                    res.send({ user: user[0] });
                } else {
                    res.send({ error: 'Incorrect Password' });
                }
            });
        } catch (e) {
            res.status(500).send(e);
        }
    }
}