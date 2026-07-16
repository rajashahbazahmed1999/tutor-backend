import Stripe from "stripe";
import Payment from "../models/Payment.js";



const createPayment = async (req, res) => {

  try {

    const { amount } = req.body;

   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


    const paymentIntent =
      await stripe.paymentIntents.create({

        amount: Number(amount) * 100,

        currency: "usd",

        automatic_payment_methods: {
          enabled: true
        }

      });

     console.log("Payment Intent Created:", paymentIntent);

    const payment = await Payment.create({

      userId: req.user.userId,

      amount: Number(amount),

      status: "pending",

      method: "stripe",

      transactionId: paymentIntent.id

    });



    res.json({

      clientSecret: paymentIntent.client_secret,

      paymentId: payment._id

    });


  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg:error.message
    });

  }

};







const confirmPayment = async (req,res)=>{

try{


const payment =
await Payment.findById(req.params.id);



if(!payment){

return res.status(404).json({
msg:"Payment not found"
});

}



payment.status = "paid";


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







const markPaymentReceived = async(req,res)=>{

try{


const payment =
await Payment.create({

userId:req.body.userId,

amount:req.body.amount,

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







const getPayments = async(req,res)=>{

try{


const payments =
await Payment.find()
.populate("userId");


res.json(payments);


}
catch(error){

res.status(500).json({
msg:error.message
});

}

};



const myPayments = async (req, res) => {

  try {

    const payments = await Payment.find({
      userId: req.user.userId
    })
    .sort({
      createdAt: -1
    });


    res.json(payments);


  } catch(error) {

    res.status(500).json({
      msg: error.message
    });

  }

};



export {
 createPayment,
 confirmPayment,
 markPaymentReceived,
 getPayments,
 myPayments,
};