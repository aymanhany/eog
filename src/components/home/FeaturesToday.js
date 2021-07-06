import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
} from 'react-router-dom';

import renderHTML from "react-render-html";

import axios from 'axios';

import Moment from 'react-moment';
import 'moment-timezone';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import SwiperArrows from '../SwiperArrows';
import ViewMore from '../ViewMore';
import Loading from '../Loading';

import { setupCache } from 'axios-cache-adapter'

// Create `axios-cache-adapter` instance
const cache = setupCache({
	maxAge: 15 * 60 * 1000
})

const random = Math.floor(Math.random() * 99999999999);

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
	adapter: cache.adapter
})

SwiperCore.use([Navigation]);

function FeaturesToday() {
	const [features, setFeatures] = useState([]);
	useEffect(async () => {
		const resft = await api.get(
			'https://egyptoil-gas.com/wp-json/wp/v2/features?per_page=10&_embed'
		);
		setFeatures(resft.data);
	}, []);

	const featuresPrevRef = React.useRef(null);
	const featuresNextvRef = React.useRef(null);

	return (
		<div>
			{/* features-today-section
			================================================== */}
			{features.length > 0 ? (
				<section className="features-today">

					<div className="container">
						<div className="title-section">
							<h1>
								<span>
									<Link to="/archive/features">Features</Link>
								</span>
							</h1>
							<SwiperArrows
								color="#000"
								prev={featuresPrevRef}
								next={featuresNextvRef}
							/>
						</div>
						<div className="features-today-box owl-wrapper">
							<Swiper
								onInit={(swiper) => {
									swiper.params.navigation.prevEl = featuresPrevRef.current;
									swiper.params.navigation.nextEl = featuresNextvRef.current;
									swiper.navigation.init();
									swiper.navigation.update();
								}}
								breakpoints={{
									// when window width is >= 320px
									320: {
										slidesPerView: 1,
										spaceBetween: 20,
									},
									// when window width is >= 480px
									480: {
										slidesPerView: 1,
										spaceBetween: 30,
									},
									// when window width is >= 780px
									780: {
										slidesPerView: 2,
										spaceBetween: 40,
									},
									1024: {
										slidesPerView: 4,
										spaceBetween: 40,
									},
								}}
							>
								{features.map((post) => (
									<SwiperSlide key={post.id}>
										<div className="item news-post standard-post">
											<div className="post-gallery">
												<Link to={`/single/features/${post.id}`}>
													<img
														src={post.featured_media_src_url}
														alt={renderHTML(post.title.rendered)}
													/>
												</Link>
												{/* <a className="category-post world" href="world.html">Music</a> */}
											</div>
											<div className="post-content">
												<h2>
													<Link to={`/single/features/${post.id}`}>
														{renderHTML(post.title.rendered)}
													</Link>
												</h2>
												<ul className="post-tags">
													<li>
														<i className="fa fa-clock-o" />
														<Moment format="YYYY/MM/DD">{post.date}</Moment>
													</li>
												</ul>
											</div>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
						<h5 className="text-right my-2">
							<span>
								<Link to="/archive/features">More &#8594;</Link>
							</span>
						</h5>
					</div>
				</section>
			) : (
				<Loading />
			)}
			{/* End features-today-section */}
		</div>
	);
}

export default FeaturesToday;
