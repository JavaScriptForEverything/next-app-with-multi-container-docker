import { useState, useEffect } from 'react'
import axios from 'axios'

import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import DeleteIcon from '@mui/icons-material/Delete'


const ViewHandler = ({ view }) => {
	const [ users, setUsers ] = useState([])
	const [ clicked, setClicked ] = useState(0)

	// console.log({ clicked })

	useEffect( async () => {
		const { data } = await axios.get('/api/users')
		setUsers( data.users )
	}, [view, clicked])


	const deleteHandler = (id) => async (evt) => {
		evt.preventDefault()

		await axios.delete(`/api/users/${id}`)
		setClicked(clicked + 1)
	}

	return (
		<>
			{users.map((user, key) => (
			<List key={key}>
				<ListItem
					selected
					secondaryAction={<IconButton onClick={deleteHandler(user._id)}><DeleteIcon /></IconButton>}
				>
					<ListItemIcon><Avatar>R</Avatar></ListItemIcon>
					<ListItemText>{user.name} | {user.profession} | {user.skill} </ListItemText>
				</ListItem>
			</List>
				))}
		</>
	)
}

export default ViewHandler
