import { useState } from 'react'
import axios from 'axios'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const userInputs = [
	{ label: 'Username', name: 'name', type: 'text' },
	{ label: 'Profession', name: 'profession', type: 'text' },
	{ label: 'Skill', name: 'skill', type: 'text' },
]

const AddHandler = ({ setUsers, setView }) => {
	const [ fields, setFields ] = useState({name: '', profession: '', skill: ''})
	const [ fieldsError, setFieldsError ] = useState({name: '', profession: '', skill: ''})

	const changeHandler = (name) => (evt) => {
		setFields({ ...fields, [name]: evt.target.value })
	}

	const submitHandler = async (evt) => {
		evt.preventDefault()

		// console.log(fields)
		const { data: users } = await axios.post('/api/users', fields)
		setUsers(users)
		setView(0)
	}


	return (
		<Container maxWidth='sx'>
			<form noValidate onSubmit={submitHandler}>
				<Typography> add handler </Typography>

				{userInputs.map(({label, name, type}, key) => <TextField key={key}
					label={label}
					placeholder={label}
					margin='dense'
					autoFocus={key === 0}
					required
					fullWidth

					value={fields[name]}
					onChange={changeHandler(name)}

					error={!fields[name] || !!fieldsError[name]}
					helperText={fieldsError[name]}
				/>
				)}

				<Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
					<Button variant='contained' type='submit'>Add User</Button>
				</Box>
			</form>
		</Container>
	)
}

export default AddHandler
