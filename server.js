import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import('./config/mongoose.js'); 
import router from './routes/index.js'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the file name
const __dirname = path.dirname(__filename); // get directory name from file name
const app = express();
dotenv.config({ path: __dirname + '/.env' });


// DB connection starts 
let MONGODB_URL = '';
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production')
    MONGODB_URL = process.env.MONGODB_URL;
else
    MONGODB_URL = 'mongodb://localhost:27017/codingtest';
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to %s", MONGODB_URL);
}).catch(err => {
    console.error("App starting error:", err.message);
    process.exit(1);
});

// append the req.body in req object
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

   
// import routes index file 
app.use('', router);
const PORT = process.env.PORT || 3000;

app.post('/', (req, res) => {
    console.log(req.body)
    console.log("Hello World")
});

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});
