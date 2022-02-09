import { useState } from 'react'
// import axios from 'axios'
// import absoluteUrl from 'next-absolute-url'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import ViewHandler from './viewUser'
import AddHandler from './addUser'



// Client-Side Rendering
const Index = () => {
	const [ view, setView ] = useState(0)
	const [ users, setUsers ] = useState([])

	return (
		<>
			<Typography variant='h6' color='textSecondary' paragraph align='center'>
				Next.JS with docker & docker-compose !!
			</Typography>

			<Box sx={{display: 'flex', justifyContent: 'space-between'}}>
				<Button variant={view === 0 ? 'contained' : 'outlined'} onClick={() => setView(0)}>View users</Button>
				<Button variant={view === 1 ? 'contained' : 'outlined'} onClick={() => setView(1)}>Add User</Button>
			</Box>

			<Typography color='textSecondary' component='section' sx={{ my: 2 }}>
				{ view === 1 ? <AddHandler setUsers={setUsers} setView={setView} /> : <ViewHandler view={view} />}
			</Typography>
		</>
	)
}
export default Index



// Server-Side Rendering
// export const getServerSideProps = async(ctx) => {
// 	const { origin } = absoluteUrl(ctx.req)
// 	// const { data: { users } } = await axios.get(`${origin}/api/users`)

// 	const users = ['user data']
// 	console.log({ users })

// 	return { props: { users }}
// }



