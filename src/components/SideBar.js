import React, { useEffect, useState } from 'react';

import Moment from 'react-moment';
import 'moment-timezone';

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

function SideBar() {
	const [news, setNews] = useState([]);
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
					<h1>
						<span>Stay Connected</span>
					</h1>
				</div>
				<ul className="social-share">
					<li>
						<a href="https://www.linkedin.com/company/egypt-oil-&-gas/" className="facebook">
							<i className="fa fa-linkedin" />
						</a>
					</li>
					<li>
						<a href="https://www.facebook.com/EgyptOilandGas" className="facebook">
							<i className="fa fa-facebook" />
						</a>
					</li>
					<li>
						<a href="https://twitter.com/EgyptOilandGas" className="twitter">
							<i className="fa fa-twitter" />
						</a>
					</li>
					<li>
						<a href="https://youtube.com/user/EgyptOilandGas" className="google">
							<i className="fa fa-youtube" />
						</a>
					</li>
					<li>
						<a href="https://www.instagram.com/egyptoilandgas/" className="google">
							<i className="fa fa-instagram" />
						</a>
					</li>
				</ul>
			</div>
			<div className="widget features-slide-widget">
				<div className="title-section">
					<h1>
						<span>Featured Posts</span>
					</h1>
					<SwiperArrows
						color="#000"
						prev={featSidebarPrev}
						next={featSidebarNext}
					/>
				</div>
				<div className="image-post-slider">
					<Swiper
						slidesPerView={1}
						onInit={(swiper) => {
							swiper.params.navigation.prevEl = featSidebarPrev.current;
							swiper.params.navigation.nextEl = featSidebarNext.current;
							swiper.navigation.init();
							swiper.navigation.update();
						}}
					>
						{news.map((post) => (
							<SwiperSlide key={post.id}>
								<li>
									<div className="news-post image-post2">
										<div className="post-gallery">
											<img
												src={post.featured_media_src_url}
												alt={post.title.rendered}
											/>
											<div className="hover-box">
												<div className="inner-hover">
													<h2>
														<a href="single-post.html">{post.title.rendered}</a>
													</h2>
													<ul className="post-tags">
														<li>
															<i className="fa fa-clock-o" />
															<Moment format="YYYY/MM/DD">
																{post.title.date}
															</Moment>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</li>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
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
			<br></br>
			<TopViews />
			<aside id="text-15" className="widget widget_text">
				<div className="textwidget">
					<form className="mc4wp-form mc4wp-form-231">
						<h2>Subscribe to Newsletter</h2>
						<input type="email" name="sumbscribe" id="subscribe" placeholder="Email" />
						<button id="submit-subscribe"> <i className="fa fa-arrow-circle-right"></i> </button>
						<p>Get all latest content delivered to your email a few times a month.</p>
					</form>
				</div>
			</aside>
		</div>
	);
}

export default SideBar;
