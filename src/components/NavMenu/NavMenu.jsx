import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LogOutButton from '../LogOutButton/LogOutButton';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useHistory } from 'react-router-dom';


export default function NavMenu() {
	const history = useHistory();

	// const user = useSelector((store) => store.user);

	const navItems = [
		{
			text: 'Home',
			path: '/home'
		},
		{
			text: 'Welcome',
			path: '/welcome'
		},
		{
			text: 'Destinations',
			path: '/destinations'
		},
		{
			text: 'Add Habits',
			path: '/habits'
		},
		{
			text: 'Daily Log',
			path: '/daily'
		},
		{
			text: 'Progress',
			path: '/progress'
		},
		{
			text: 'About',
			path: '/about'
		},
		{
			text: 'Info Page',
			path: '/info'
		},
		{
			text: 'Log Out',
			path: '/logout',
		}
	]; // End navItems

	const [open, setOpen] = useState(false);

	return (
		<div>
			<Button
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={() => setOpen(true)}
			>
				<MenuIcon sx={{ color: "white" }} />
			</Button>
			<Drawer
				open={open}
				anchor="right"
				onClose={() => setOpen(false)}
			>
				<List >
					{navItems.map((item, index) => {

						if (item.path === '/logout') {
							return (
								<div key={index}>
									<Divider sx={{ marginBottom: "10px" }} />
									<LogOutButton
										style={{
											margin: "0",
											fontWeight: '400',
											fontSize: '1rem',
											lineHeight: '1.5',
											fontFamily: 'fantasy',
											paddingLeft: '16px',
											textAlign: "left"
										}}
									/>
								</div>
							)
						}

						return (
							<ListItemButton
								key={index}
								component="a"
								onClick={() => {
									setOpen(false);
									history.push(item.path)
								}}
							>
								<ListItemText>
									<Typography sx={{ fontFamily: 'fantasy', textAlign: "left" }}>
										{item.text}
									</Typography>
								</ListItemText>
							</ListItemButton>
						)
					})}
				</List >
			</Drawer>
		</div >
	)
}
