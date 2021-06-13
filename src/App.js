import {
	BrowserRouter as Router,
	Switch,
	Route,
	BrowserRouter,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Single from './components/Single';
import Archive from './components/Archive';
import Search from './components/Search';

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/single/:type/:id" component={Single} />
					<Route exact path="/archive/:type" component={Archive} />
					<Route exact path="/archive/:type/:category" component={Archive} />
					<Route path="/search" component={Search} />
				</Switch>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
