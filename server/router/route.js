import { Router } from 'express'
const router = Router();

/**Importing all controllers */
import * as controller from '../controllers/appControllers.js'
import Auth, { localVariables } from '../middleware/auth.js';
import { registerMail } from '../controllers/mailer.js'

/**POST METHODS */
router.route('/register').post(controller.register)//register user
router.route('/registerMail').post(registerMail);//send email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end());//authenticate user
router.route('/login').post(controller.verifyUser, controller.login);//login app
router.route('/createStory').post(controller.createStory); //Create Ai Story


/**GET METHODS */
router.route('/user/:email').get(controller.getUser)//user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP)//generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP)//verify OTP
router.route('/createResetSession').get(controller.createResetSession)//reset all the variables

router.route('/getStories/:email').get(controller.getStories)//get all stories of a user
router.route('/getSpecificStoryOfAUser/:id').get(controller.getSpecificStoryOfAUser)//get all stories of a user





/**PUT METHOD */
router.route('/updateUser').put(Auth, controller.updateUser)//update user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword) //user to reset password

export default router