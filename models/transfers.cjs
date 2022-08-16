const { Schema, model } = require('mongoose');

const day = new Schema({
    date: {
        type: Date,
        required: true,
    },
    workshops: [
        {
            name: { type: String, required: true },
            transfers: [
                {
                    created: { type: Date, required: true },
                    from: { type: String, required: true },
                    to: { type: String, required: true },
                    isSent: { type: Boolean },
                    isReceived: { type: Boolean },
                    itemsAdded: [
                        {
                            name: { type: String, required: true },
                            quantity: { type: Number, required: true }
                        }
                    ],
                    itemsMissing: [
                        {
                            name: { type: String, required: true },
                            quantity: { type: Number, required: true }
                        }
                    ]
                }
            ]
        }
    ]
});

module.exports = model('TransferDay', day);