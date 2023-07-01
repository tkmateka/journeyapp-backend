require('dotenv').config();

const bcrypt = require('bcrypt')

const Employee = require('../models/Employee');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION).then(console.log('connected to DB')).catch((err) => console.log(111111111, err));

module.exports = {
    register: async (req, res) => {
        try {
            // The second parameter is the default salt
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            let emp = { ...req.body };
            emp.password = hashedPassword;

            const newEmployee = new Employee({ ...emp });
            const result = await newEmployee.save();

            res.status(201).send({ message: "You have registered successfully." });
        } catch (e) {
            res.status(500).send(e);
        }
    },
    login: async (req, res) => {
        const user = await Employee.find({ email: req.body.email });

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
    },
    update_user: async (req, res) => {
        try {
            const filter = { email: req.body.email };
            const update = req.body;

            const employee = await Employee.findOneAndUpdate(filter, update);
            res.json(employee);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    get_users: async (req, res) => {
        const users = await Employee.find()
        res.json(users);
    },
    get_user_by_email: async (req, res) => {
        const user = await Employee.find({ email: req.params.email })
        res.json(user);
    },
    delete_user: async (req, res) => {
        const user = await Employee.findOneAndRemove({ email: req.params.email })
        res.json(user);
    }
}