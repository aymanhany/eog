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
import News from './components/News';
import Reports from './components/Reports';
import Issues from './components/Issues';
import Events_coverage from './components/Events_coverage';
import SinglePage from './components/SinglePage';
import Tv from './components/Tv';
// import Features from './components/Features';

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/single/:type/:id" component={Single} />
					<Route path="/page/:id" component={SinglePage} />
					<Route exact path="/news" component={News} />
					<Route exact path="/tv" component={Tv} />
					<Route exact path="/reports" component={Reports} />
					{/* <Route exact path="/features" component={Features} /> */}
					<Route exact path="/events" component={Events_coverage} />
					<Route exact path="/publications" component={Issues} />
					<Route exact path="/archive/:type" component={Archive} />
					<Route exact path="/archive/:type/:category_type/:category" component={Archive} />
					<Route path="/search" component={Search} />
				</Switch>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
