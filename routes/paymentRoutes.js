import express from "express";

import {
createPayment,
confirmPayment,
markPaymentReceived,
getPayments,
myPayments

} from "../controllers/paymentController.js";


import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";


const router = express.Router();




router.post(
"/create",
auth,
createPayment
);


router.put(
"/confirm/:id",
auth,
confirmPayment
);


router.get(
"/my",
auth,
myPayments
);





router.post(
"/manual",
auth,
role("admin"),
markPaymentReceived
);


router.get(
"/",
auth,
role("admin"),
getPayments
);



export default router;