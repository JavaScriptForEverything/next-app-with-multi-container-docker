import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
	name: String,
	profession: String,
	skill: String
}, {
	timestamps: true
})

export default models.User || model('User', userSchema)
