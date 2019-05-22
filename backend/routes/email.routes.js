const express = require('express');
const router = express.Router();
const Email = require('../email');
const User = require('../models/user.model');



router.post('/:json', async (req,res) => {
    const oEmail = new Email({
        service: "gmail",
        auth: {
            user: "equipolibrarytec@gmail.com",
            pass: "l1br4r1t3c"
        }
    });  
    const parametros = JSON.parse(req.params.json);
    const user = await User.findById(parametros.id);
    const email = {
        from: "equipolibrarytec@gmail.com",
        to: user.correoElectronico,
        subject: "Confirmación de envio",
        html: `
            <div>
            <p>Se le informa que su pedido ha sido enviado y llegará a usted muy pronto<p>
            <div>
        `
    };
    oEmail.sendEmail(email);
    res.json({mensaje: "Correo enviado"});

});


module.exports = router;