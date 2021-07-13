import React, { useEffect, useState } from 'react';

import Moment from 'react-moment';
import 'moment-timezone';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useHistory,
	useLocation,
	useRouteMatch,
} from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import SwiperArrows from './SwiperArrows';
import axios from 'axios';
import TopViews from './TopViews';

const tableData = [
	{
		commodity: 'Crude Oil (WTI)',
		units: 'USD/bbl',
		price: 64.48,
		change: -0.68,
	},
	{
		commodity: 'Crude Oil (Brent)',
		units: 'USD/bbl',
		price: 67.89,
		change: -0.63,
	},
	{
		commodity: 'NYMEX Natural',
		units: 'GasUSD/MMBtu',
		price: 2.91,
		change: -0.75,
	},
	{
		commodity: 'OPEC Basket Price',
		units: 'USD/bbl',
		price: 66.57,
		change: -2.39,
	},
];
SwiperCore.use([Navigation]);

function SideBar(props) {
	const [news, setNews] = useState([]);
	const [tags, setTags] = useState([]);
	const [tableDataState, setTableDataState] = useState(tableData);
	const [lastMod, setLastMod] = useState('Last Modified May 11, 2021');
	useEffect(async () => {
		await axios
			.get('https://egyptoil-gas.com/wp-json/wp/v2/news?per_page=5')
			.then((res) => {
				setNews(res.data);
			});
	}, []);

	const featSidebarPrev = React.useRef(null);
	const featSidebarNext = React.useRef(null);

	return (
		<div className="sidebar">
			<div className="widget social-widget">
				<div className="title-section">
					{console.log(tags)}
					<h1>
						<span>Stay Connected</span>
					</h1>
				</div>
				<ul className="social-icons d-flex justify-content-between p-1">
					<li>
						<a href="https://www.linkedin.com/company/egypt-oil-&-gas/" target="_blank" className="facebook">
							<i className="fa fa-2x fa-linkedin" />
						</a>
					</li>
					<li>
						<a href="https://www.facebook.com/EgyptOilandGas" target="_blank" className="facebook">
							<i className="fa fa-2x fa-facebook" />
						</a>
					</li>
					<li>
						<a href="https://twitter.com/EgyptOilandGas" target="_blank" className="twitter">
							<i className="fa fa-2x fa-twitter" />
						</a>
					</li>
					<li>
						<a href="https://youtube.com/user/EgyptOilandGas" target="_blank" className="google">
							<i className="fa fa-2x fa-youtube" />
						</a>
					</li>
					<li>
						<a href="https://www.instagram.com/egyptoilandgas/" target="_blank" className="google">
							<i className="fa fa-2x fa-instagram" />
						</a>
					</li>
				</ul>
			</div>

			{/* <aside id="text-15" className="widget widget_text">
				<div className="textwidget">
					{
						props.cats.map((id) => (
							<h4><Link to={`/features/#${id.id}`}>{id.name}</Link></h4>
						))
					}
				</div>
			</aside> */}
			
			<div className="sidebar-table">
				<div className="sidebar-table-header">
					<h5>Commodity</h5>
					<h5>Units</h5>
					<h5>Price</h5>
					<h5>Change</h5>
				</div>
				<div className="sidebar-table-body">
					{tableDataState.map((row) => (
						<div key={row.commodity} className="sidebar-table-row">
							<h5>{row.commodity}</h5>
							<h5>{row.units}</h5>
							<h5>{row.price}</h5>
							<h5>{row.change}%</h5>
						</div>
					))}
					<h5 className="sidebar-table-date">{lastMod}</h5>
				</div>
			</div>

			<img
				src="https://ads.egyptoil-gas.com/www/images/4687b97be36525ee64f45a30e99a1289.jpg"
				width="100%"
				className="my-5"
			/>
			<TopViews />
			<aside id="text-15" className="widget widget_text">
				<div className="textwidget">
					<form className="mc4wp-form mc4wp-form-231">
						<h2>Subscribe to Newsletter</h2>
						<input type="email" name="sumbscribe" id="subscribe" placeholder="Email" />
						<button id="submit-subscribe"> <i className="fa fa-arrow-circle-right"></i> </button>
						<p>Subscribe to get the latest news right to your inbox</p>
					</form>
				</div>
			</aside>
			
			{/* <aside id="tag_cloud-2" class="widget widget_tag_cloud">
				
			</aside> */}
		</div>
	);
}

export default SideBar;
