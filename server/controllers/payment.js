

const stripe = require("stripe")('sk_test_51LXPfFDbZrNxvWipQaXolJMscCKXOWe67U7rJLOn4bq6m5h50GuiK1XyqTEluBrY0Ghpq1n9yMxP2HHvuzlmOZ7y00aJbka2Bs');
exports.payment_charge = async (req,res) => {
    let {amount,id} = req.body;
    console.log("amountid",amount,id);
    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency:"EUR",
            description : "company description",
            payment_method:id,
            confirm:true    
        });
        res.json({
            message:"paiement reussi",
            success:true,
        });

    }
    catch(error) {
        console.log("erreur:",error);
        
        res.json({
            message:"paiement echoue",
            success:false,
        })
    }
};
