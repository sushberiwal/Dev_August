const stripe = require("stripe");
const planModel = require("../Model/plansModel");
const userModel = require("../Model/usersModel");
const stripeObj = stripe('sk_test_51I56IeA6p9e5BZD1XAbAnR51ehJPjMFOl0s06pUSfdCUoNWW9nMURKFOqyKamlIVNBgqAg3uZjTWvR3k6RoNlmz100x7EaYnPE');

async function createPaymentSession(req , res){
    try{
        const userId = req.id;
        const {planId} = req.body;
        const plan = await planModel.findById(planId);
        const user = await userModel.findById(userId);
        // session object
        const session = await stripeObj.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email:user.email,
            line_items: [
              {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: plan.name,
                  },
                  unit_amount: plan.price*100,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/',
            cancel_url: 'http://localhost:3000/',
        })
        res.json({
            session
        })
    }
    catch(error){
        res.json({
            message:"Failed to create payment session",
            error
        })
    }
}


module.exports.createPaymentSession = createPaymentSession;