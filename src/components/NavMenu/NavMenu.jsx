import React, { useState } from 'react'
// import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import LogOutButton from '../LogOutButton/LogOutButton';
import MenuIcon from '@mui/icons-material/Menu';
// import { useDispatch, useSelector } from 'react-redux';
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
			text: 'Info Page',
			path: '/info'
		},
		{
			text: 'Daily Log',
			path: '/daily'
		},
		{
			text: 'About',
			path: '/about'
		},
		{
			text: 'Add Habits',
			path: '/habits'
		},
		{
			text: 'Log Out',
			path: '/logout',
			component: <LogOutButton className="navLink" />
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
				<List>
					{navItems.map((item, index) => {
						return (
							<ListItemButton
								key={index}
								component="a"
								onClick={() => {
									setOpen(false);
									history.push(item.path)
								}}
							>
								<ListItemText primary={item.text} />
							</ListItemButton>
						)
					})}
				</List >
			</Drawer>
		</div >
	)
}
