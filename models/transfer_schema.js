import { Schema, model } from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc-fix';

const transferSchema = new Schema({
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
});