const { Schema, model } = require('mongoose');

const shipping = new Schema({
    date: {
        type: Date,
        required: true,
    },
    requests: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true, default: 1 },
            isOrdered: { type: Boolean, required: false, default: false },
            target: { type: String, required: false },
            expDelivery: { type: Date, required: false }
        }
    ]
});

module.exports = model('ShippingRequest', shipping);