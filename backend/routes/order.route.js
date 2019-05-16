const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

router.get('/', async(req,res) => {
    const orders = await Order.find();
    res.json(orders);
});

router.post('/:json', async (req, res) => {
    res.json({mensaje: 'Post order'});
})

router.delete('/:id', async (req, res)=> {
    await Order.findByIdAndDelete(req.param.id);
    res.json({mensaje: "orden eliminada"})
});

router.put('/', (req, res) => {
    res.json({
        response: 'PUT Usuario'
    });//Provisional
});

module.exports = router;