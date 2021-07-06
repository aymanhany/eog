import React, { useState } from 'react';

import { Navbar, Nav, NavDropdown, FormControl, Button } from 'react-bootstrap';

import logo from '../eog.png';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useHistory,
} from 'react-router-dom';
import TickerNews from './TickerNews';
import { Dropdown } from 'bootstrap';

function Header() {
	const [searchQuery, setSearchQuery] = useState('');
	const history = useHistory();
	const searchHandler = (e) => {
		e.preventDefault();
		history.push(`/search?search=${searchQuery}`, {
			search: `?query=${searchQuery}`,
		});
		setSearchQuery('');
	};

	return (
		<div>
			{/* Header
		    ================================================== */}
			<header
				className="clearfix"
				style={{
					backgroundImage: `url(${process.env.PUBLIC_URL + '/header-banner.jpg'
						})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}}
			>
				{/* Bootstrap navbar */}
				<Navbar
					className="logo-advertisement"
					expand="lg"
				>
					<Navbar.Brand>
						<Link className="navbar-brand" to="/">
							<img src={logo} alt="Logo" className="border-none" />
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto top-bar">
							<li>
								<Link to="/page/1344">About Us</Link>
							</li>
							<li>
								<Link to="/page/1247">Contact Us</Link>
							</li>
							<li>
								<Link to="/page/1348">Privacy Policy</Link>
							</li>
						</Nav>
						<Nav className="ml-auto">
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/news">News</Link>
							</li>
							<li>
								<Link to="/publications">Publications</Link>
							</li>
							<li>
								<Link to="/archive/features">Features</Link>
							</li>
							<li>
								<Link to="/events">Events</Link>
							</li>
							<li>
								<Link to="/reports">Reports</Link>
							</li>
							<li>
								<Link to="/tv">TV</Link>
							</li>
							<li>
								<Link to="/archive/maps">Concession Maps</Link>
							</li>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				{/* End Bootstrap navbar */}
				<div className="container-fluid">
					<form
						onSubmit={searchHandler}
						className="d-flex ml-auto mb-3"
					>
						<input
							type="text"
							className="form-control"
							placeholder="Search Here"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<button type="submit" className="btn btn-primary">
							<i className="fa fa-search"></i>
						</button>
					</form>
				</div>
			</header>
			{/* End Header */}
			<TickerNews />
		</div>
	);
}

export default Header;
