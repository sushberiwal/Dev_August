let buyPlansButtons = document.querySelectorAll(".signup-button a");
let allLis = document.querySelectorAll(".showcase-ul li");
const stripe = Stripe('pk_test_51I56IeA6p9e5BZD1ZcRgr3tGKIE51u3f6lDY1ygtN1cEf9VwT9AYUbIfP0VJBVQFjKHIPXZtZPeoD7Ujy45FLEMP00rGcnCwuW');


for(let i=0 ; i<buyPlansButtons.length ; i++){
    buyPlansButtons[i].addEventListener("click" , async function(){
        try{
            if(allLis.length < 6){
                window.location.href = "/login";
            }
            else{
                let planId = buyPlansButtons[i].getAttribute("planid");
                let session =  await axios.post("http://localhost:3000/api/booking/createPaymentSession" , {planId : planId });
                let sessId = session.data.session.id;
                let result = await stripe.redirectToCheckout({ sessionId: sessId });
                console.log(result);
            }
        }
        catch(error){
            alert(error.message);
        }
    })
}

