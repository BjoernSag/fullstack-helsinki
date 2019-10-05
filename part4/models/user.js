const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


//Todo: Ensure password strength, username and password only made by accepted chars, max/minlength
const userSchema = mongoose.Schema({
	username: {
		type: String,
        unique: true,
	},
	name: String,
	passwordHash: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		}
	],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		// the passwordHash should not be revealed
		delete returnedObject.passwordHash
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User