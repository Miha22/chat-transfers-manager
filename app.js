import express, { json, urlencoded } from 'express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import compression from 'compression';
import fs from 'fs/promises';
import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion, AuthMechanism } from 'mongodb';
import config from './keys/config.js';
import errorMiddleware from './middleware/error.js';
import { launchBot } from './bot/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || config.PORT;
const credentials = './keys/X509-cert-6372183001170531522.pem';
const app = express();

app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(errorMiddleware);

start().then(server => {

});

async function start(){
    try {    
        await mongoose.connect(config.MONGODB_URL, {
            dbName: 'promarket-transfers',
            autoCreate: true,
            autoIndex: false,
            sslKey: credentials,
            sslCert: credentials,
            serverApi: ServerApiVersion.v1
        });

        const server = app.listen(PORT, () => {
            console.log("Server is running on port:", PORT);
        });

        return server;
    }
    catch (e) {
        console.log(e);
    }
}