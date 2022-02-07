import User from '../models/userModel'


// GET /api/users
export const getAllUsers = async(req, res, next) => {
	const users = await User.find()

	res.status(200).json({
		status: 'success',
		total: users.length,
		users
	})
}


// POST /api/users
export const addUser = async(req, res, next) => {
	const user = await User.create(req.body)

	res.status(201).json({
		status: 'success',
		user
	})
}


// Delete /api/users/:id
export const deleteUser = async(req, res, next) => {
	const user = await User.findByIdAndDelete(req.query.id)

	res.status(204).send()
}
