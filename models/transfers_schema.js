import { Schema, model } from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc-fix';

const daySchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    transfers: [
        {
            from: { type: String, required: true, default: "Centrs" },
            to: { type: String, required: true },
            sentWhen: { type: Date, required: false },
            isSent: { type: Boolean },
            items: [
                {
                    name: { type: String, required: true },
                    quantity: { type: Number, required: true }
                }
            ]
        }
    ]
});

daySchema.plugin(autoIncrement, {
    model: 'TransferDay',
    field: '_id',
    startAt: 0,
    incrementBy: 1
});

const TransferDay = model('TransferDay', daySchema);

export default TransferDay;