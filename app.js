const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const postRoute = require("./routes/posts");
const userRoute = require("./routes/user");
const imageRoute = require("./routes/image");
const associationRoute = require("./routes/test");
const addressRoute = require('./routes/address');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/address', addressRoute);

app.use('/posts', postRoute);
app.use("/user", userRoute);
app.use("/images", imageRoute);
app.use("/test", associationRoute);

module.exports = app;