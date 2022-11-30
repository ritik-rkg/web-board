const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connectDB");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const userRouter = require("./routes/userRouter");
const { isUserAuth } = require("./middleware/isUserAuth");
// ! middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH']
}));
// ! session middleware and how to connect to mongodb
// ! session to db
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
});
app.use(session({
    secret: "key kitty",
    resave: false,
    saveUninitialized: false,
    store: store,
}))
app.use("/api/v1/user", userRouter);

app.get("/", function (req, res) {
    console.log(req.session.id);
    res.send("hello world");
});
app.get("/protected", isUserAuth, (req, res) => {
    res.send("protected");
})
const https = require("https");

const PORT = process.env.PORT || 5000;
const startServer = () => {
    app.listen(PORT, () => {
        connectDB();
        console.log(`Server is running on port ${PORT}`);
    });
}
startServer();

