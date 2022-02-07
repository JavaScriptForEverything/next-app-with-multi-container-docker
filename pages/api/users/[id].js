import '../../../server/models/database'
import nc from 'next-connect'
import * as userController from '../../../server/controllers/userController'

const handler = nc()

handler.delete(userController.deleteUser)

export default handler
