import '../../../server/models/database'
import nc from 'next-connect'
import * as userController from '../../../server/controllers/userController'

const handler = nc()


handler.get(userController.getAllUsers)
handler.post(userController.addUser)

export default handler
