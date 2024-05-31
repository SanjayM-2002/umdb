const z = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
const signupSchema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});
const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const saltRounds = parseInt(process.env.SALTROUNDS);
const jwtSecret = process.env.JWT_SECRET;

const signup = async (req, res) => {
  const inputData = req.body;
  try {
    const zodResponse = signupSchema.safeParse(inputData);
    const dataResponse = zodResponse.data;
    if (!zodResponse.success) {
      res.status(401).json({ error: zodResponse.error });
      return;
    }
    const userExists = await User.findOne({
      email: dataResponse.email,
    });
    if (userExists) {
      res.status(400).json({ error: 'User already exists with this email' });
      return;
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(dataResponse.password, salt);
    const newUser = new User({
      email: dataResponse.email,
      fullname: dataResponse.fullname,
      password: hashedPassword,
    });
    await newUser.save();

    // console.log('user id is: ', newUser._id);
    const token = jwt.sign({ userId: newUser._id }, jwtSecret);
    const { password, ...messageWithoutPassword } = newUser.toObject();
    res.status(201).json({ details: messageWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    return;
  }
};

const signin = async (req, res) => {
  const inputData = req.body;
  try {
    const zodResponse = signinSchema.safeParse(inputData);
    if (!zodResponse.success) {
      res.status(401).json({ error: zodResponse.error });
      return;
    }
    const dataResponse = zodResponse.data;
    const userExists = await User.findOne({ email: dataResponse.email });
    if (!userExists) {
      return res.status(404).json({ error: 'Invalid email' });
    }

    const isPasswordMatch = await bcrypt.compare(
      dataResponse.password,
      userExists.password
    );
    if (!isPasswordMatch) {
      return res.status(404).json({ error: 'Wrong password' });
    }
    const token = jwt.sign({ userId: userExists._id }, jwtSecret);
    const { password, ...messageWithoutPassword } = userExists.toObject();
    res.status(200).json({
      details: messageWithoutPassword,
      token,
      message: 'Logged in successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    return;
  }
};

module.exports = { signup, signin };
