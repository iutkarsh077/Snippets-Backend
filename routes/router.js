import { Router } from "express";
import { Signup } from "../controllers/Signup.js";
import { VerifyUserAtSignup } from "../controllers/VerifyUserAtSignup.js";
import { sendEmailAtLogin } from "../controllers/SendEmailAtLogin.js";
import { VerifyForgotPassword } from "../controllers/VerifyForgotPassword.js";
import { VerifyEmailAtForgotPassword } from "../controllers/VerifyEmailAtForgotPassword.js";
import { ChangePasswordAtLogin } from "../controllers/ChangePassword.js";
import { LoginUser } from "../controllers/LoginUser.js";
import { UserDetails } from "../controllers/IsUserLoggedIn.js";
import { SaveSnippets } from "../controllers/SaveSnippets.js";
import { GetAllSnippets } from "../controllers/GetAllSnippets.js";
import { GetSinglePost } from "../controllers/GetSinglePost.js";
import { SaveComments } from "../controllers/saveComments.js";

const router = Router();

router.post("/sign-up", Signup);
router.post("/verifyUserAtSignup", VerifyUserAtSignup);
router.post("/sendEmailAtLogin", sendEmailAtLogin);
router.put("/verifyForgotPassword", VerifyForgotPassword);
router.put("/verifyEmailAtForgotPassword", VerifyEmailAtForgotPassword);
router.put("/ChangePasswordAtLogin", ChangePasswordAtLogin);
router.post("/LoginUser", LoginUser);
router.get("/userInfo", UserDetails);
router.post("/saveSnippet", SaveSnippets);
router.get("/getAllSnippets", GetAllSnippets);
router.get("/getSinglePost", GetSinglePost);
router.post("/saveComment", SaveComments)
export default router;
