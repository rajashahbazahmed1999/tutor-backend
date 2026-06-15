import Payment from "../models/Payment.js";
import Stripe from "stripe";


const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);


// CREATE PAYMENT
export const createPayment = async (req,res)=>{

try{

const { amount } = req.body;


if(!amount){
 return res.status(400).json({
  msg:"Amount required"
 });
}


const paymentIntent =
await stripe.paymentIntents.create({

 amount:Number(amount)*100,

 currency:"usd",

 automatic_payment_methods:{
  enabled:true
 }

});


const payment =
await Payment.create({

 userId:req.user.userId,

 amount:Number(amount),

 method:"stripe",

 status:"pending",

 transactionId:paymentIntent.id

});


res.status(201).json({

 clientSecret:
 paymentIntent.client_secret,

 payment

});


}
catch(error){

console.log(error.message);

res.status(500).json({
 msg:error.message
});

}

};




// CONFIRM PAYMENT
export const confirmPayment = async(req,res)=>{

try{


const payment =
await Payment.findById(req.params.id);


if(!payment){

return res.status(404).json({
 msg:"Payment not found"
});

}



payment.status="paid";


await payment.save();



res.json({

msg:"Payment successful",

payment

});


}
catch(error){

res.status(500).json({
 msg:error.message
});

}

};




// ADMIN MANUAL PAYMENT
export const markPaymentReceived =
async(req,res)=>{


try{


const {
 userId,
 amount
}=req.body;



const payment =
await Payment.create({

 userId,

 amount:Number(amount),

 method:"manual",

 status:"paid"

});



res.json(payment);



}
catch(error){

res.status(500).json({
 msg:error.message
});

}


};




// GET ALL PAYMENTS ADMIN
export const getPayments =
async(req,res)=>{


try{


const payments =
await Payment
.find()
.populate(
"userId",
"name email"
);



res.json(payments);


}
catch(error){

res.status(500).json({
 msg:error.message
});

}

};



// USER PAYMENTS

export const myPayments =
async(req,res)=>{


try{


const payments =
await Payment.find({

userId:req.user.userId

});


res.json(payments);


}
catch(error){

res.status(500).json({
 msg:error.message
});

}

};