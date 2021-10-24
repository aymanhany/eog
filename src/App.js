// import { loadable, Suspense } from 'react';

import {
	Switch,
	Route,
	BrowserRouter,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Loading from './components/Loading';
import loadable from '@loadable/component'


const HomePage = loadable(() => import('./components/HomePage'));
const Header = loadable(() => import('./components/Header'));
const Single = loadable(() => import('./components/Single'));
const Footer = loadable(() => import('./components/Footer'));
const SinglePage = loadable(() => import('./components/SinglePage'));
const Search = loadable(() => import('./components/Search'));
const Features = loadable(() => import('./components/Features'));
const Tv = loadable(() => import('./components/Tv'));
const Events_coverage = loadable(() => import('./components/Events_coverage'));
const Events_calendar = loadable(() => import('./components/Events_calendar'));
const Issues = loadable(() => import('./components/Issues'));
const Reports = loadable(() => import('./components/Reports'));
const News = loadable(() => import('./components/News'));
const Archive = loadable(() => import('./components/Archive'));

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/news" component={News} />
					<Route exact path="/tv" component={Tv} />
					<Route exact path="/reports" component={Reports} />
					<Route exact path="/features" component={Features} />
					<Route exact path="/events_coverage" component={Events_coverage} />
					<Route exact path="/events_calendar" component={Events_calendar} />
					<Route exact path="/publications" component={Issues} />
					<Route path="/single/:type/:slug" component={Single} />
					<Route path="/page/:id" component={SinglePage} />
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
