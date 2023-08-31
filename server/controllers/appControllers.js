import UserModel from "../model/User.js"
import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'
import bcrypt from 'bcrypt'
import Flutterwave  from 'flutterwave-node-v3'
import { nanoid } from 'nanoid'
import axios from 'axios';
import OpenAI from 'openai'

import { config } from 'dotenv';
import StoryModel from "../model/Story.js"
config();

const openai = new OpenAI()

//const paystackInstance = paystack(process.env.PAYSTACK_SK);
const flw = new Flutterwave(process.env.FLW_PK, process.env.FLW_SK);
const enckey = process.env.flW_EK

/**Middleware for verify user */
export async function verifyUser(req, res, next){
    try {
        const { email } = req.method == "GET" ? req.query : req.body;
        
        let exist = await UserModel.findOne({ email });
        if(!exist) return res.status(404).send({ error: "Can't Find User"})
        next();

        //check the
    } catch (error) {
        return res.status(404).send({ error: 'Authenticaton Error'})
    }
}

/**POST http://localhost:9000/api/register 
 * @param: {
 * "username": "success123",
 * "password": "admin@123",
 * "email": "success123@gmail.com",
 * "firstName": "success",
 * "lastName": "akin",
 * "mobile": "09012345678",
 * "address": "Apt. 101 Kula Street",
 * "profile": ""
 * } 
*/
export async function register(req, res){
    try {
        const {username, email, password, profile} =req.body;
        console.log(req.body);
        const user = await UserModel.create({username, email, password, profile});
        res.status(201).json(user)//.send({ msg: "User Register Successfully"});
        console.log('User Registered successfully')
    } catch (e) {
        let msg;
        if(e.code == 11000){
            msg = 'User already exist'
        }else{
            msg = e.message;
        }
        console.log(e)
         res.status(400).json(msg)
    }
}

/**POST http://localhost:9000/api/login 
 * @param" {
 * "email": "success123@gmail.com",
 * "password": "admin@123"
 * }
*/
export async function login(req, res){
    try {
        const {email, password} = req.body
        const user = await UserModel.findByCredentials(email, password);
        await user.save()
        const token = jwt.sign(
            {   id: user._id,
                email: user.email    
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        )
        res.status(200).send({
            msg: "Login successful",
            email: user.email,
            token
        })
        console.log('User Logged in')
    } catch (e) {
        res.status(400).json(e.message)
    }
}

/**GET: http://localhost:9000/api/user/success123@gmail.com */
export async function getUser(req, res){
        const { email } = req.params;
      
        try {
          const user = await UserModel.findOne({ email: email });
          if (!user) {
            return res.status(404).send({ error: "Cannot find user data" });
          }
          return res.status(200).json(user);
        } catch (error) {
          return res.status(500).send({ error: "Internal server error" });
        }
}

/**PUt: http://localhost:9000/api/updateUser
 * @param: {
 *  "header": "<token>"
 * }
 * body{
 *  firstName: "",
 *  address: "",
 *  profile: ""
 * }
 */
export async function updateUser(req, res){
    try {
        const body = req.body
        /**
         * const id = req.query.id
         * 
        */
        const { id } = req.user
        console.log('User ID>>>', id)
        console.log('User update>>>', body)
        const updatedUser = await UserModel.findByIdAndUpdate( id, body, {new: true});
        res.status(201).send(updatedUser)
        console.log('user updated')
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

/**GET: http://localhost:9000/api/generateOTP */
export async function generateOTP(req, res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(201).send({ code: req.app.locals.OTP})
}

/**GET:  http://localhost:9000/api/verifyOTP */
export async function verifyOTP(req, res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; //reset the OTP value
        req.app.locals.resetSession = true; //start session for reset password
        return res.status(201).send({ msg: "Verify Successfully!"})
    }
    return res.status(400).send({ error: "INVALID OTP"})
}

// successfully redirect user when OTP is valid
/**GET: http://localhost:9000/api/createResetSession */
export async function createResetSession(req, res){
    if(req.app.locals.resetSession){
        //req.app.locals.resetSession = false // allow access to this route only once
        return res.status(201).send({ flag: req.app.locals.resetSession })
    }
    return res.status(440).send({ error: "Session expired! "})
}

//update the password when we have a vaild session
/**PUT: http://localhost:9000/api/resetPassword */
export async function resetPassword(req, res){
    try {        

        if(!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired! "})
        
        const { email, password } = req.body

        try {
            await UserModel
                .findOneAndUpdate({email: email}, {password: password})
                .then((newPassword) => {
                    req.app.locals.resetSession = false
                    res.status(200).send({ msg: "User Updated Successfully"})
                    console.log('HASHED>>', newPassword.password)
                })

        } catch (error) {
            return res.status(500).send({ error })
        }
    } catch (error) {
        return res.status(401).send({ error })
    }
}

export async function createStory(req, res){
  const {selectedCard, plot, language, readersAge, genre, writingPattern, chapters, userEmail} = req.body
  try {
    console.log(selectedCard, plot, language, readersAge, genre, writingPattern, chapters)
    const response = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: `Write a ${selectedCard} Story in ${language} langauage for readers within the ages of ${readersAge}, the Story Should be ${genre} based. and Importantly use this: ${plot} as the idea to write the story the story should have ${chapters} number of chapters arranged by chapters`,
        temperature: 0.9,
        max_tokens: 700
    })
    //console.log(response)
    console.log('STORY>>', response.choices[0].text)
    const genertedStory = response.choices[0].text
    const newStory = new StoryModel({
        story: genertedStory,
        email: userEmail
    })

    await newStory.save()
    console.log('STORY SAVED>>',newStory)

    res.status(201).json(genertedStory)
} catch (error) {
    console.log(error)
    res.status(500).json({ error: "An error occurred while generating and saving the story." });
  }
}

export async function getStories(req, res){
    const { email } = req.params;
    try {
        const userEmail =  email
        const stories = await StoryModel.find({ email: userEmail})
        console.log(stories)
        res.status(200).json(stories)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "An error occurred while generating and saving the story." });
    }
}

 
export async function getSpecificStoryOfAUser(req, res){
    const { id } = req.params
    try {
        const storyId = id
        const storyDetails = await StoryModel.findById(storyId)
        //console.log(storyDetails)
        res.status(200).json(storyDetails)
    } catch (error) {
        res.status(500).json({ error: "An error occurred while generating and saving the story." });
    }
}
