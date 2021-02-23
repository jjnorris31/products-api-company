import mongoose from 'mongoose';
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).then(db => {
	console.log('Connected');
}).catch(e => {
	console.log({e})
});