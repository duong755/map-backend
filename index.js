require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

// connect mongoDB
mongoose
	.connect(process.env.MONGO_DB, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then((res) => {
		console.log('connected to MongoDB cluster');
	})
	.catch((error) => {
		console.log(error)
	});

// express config
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// config third party moudules
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/place', require('./routers/placeRouter'));
app.use('/rate', require('./routers/rateRouter'));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With', 'Content-Type', 'Accept', 'Authorization');
	if (req.method === 'OPTIONS') {
		req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
