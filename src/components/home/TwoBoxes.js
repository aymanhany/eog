import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import Moment from 'react-moment';
import 'moment-timezone';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import SwiperArrows from '../SwiperArrows';
import axios from 'axios';
import SideBar from '../SideBar';
import Loading from '../Loading';

SwiperCore.use([Navigation]);

function TwoBoxes() {
	const [news, setNews] = useState([]);
	const [events, setEvents] = useState([]);
	const [reports, setReports] = useState([]);
	const [publications, setPublications] = useState([]);
	const [tv, setTv] = useState([]);

	useEffect(async () => {
		await axios
			.get('https://egyptoil-gas.com/wp-json/wp/v2/events_coverage?per_page=6')
			.then((res) => {
				setEvents(res.data);
			});
		await axios
			.get('https://egyptoil-gas.com/wp-json/wp/v2/news?per_page=4')
			.then((res) => {
				setNews(res.data);
			});

		await axios
			.get('https://egyptoil-gas.com/wp-json/wp/v2/reports?per_page=6')
			.then((res) => {
				setReports(res.data);
			});

		await axios
			.get('https://egyptoil-gas.com/wp-json/wp/v2/publications?per_page=5')
			.then((res) => {
				setPublications(res.data);
			});
	}, []);

	const worldPrev = React.useRef(null);
	const worldNext = React.useRef(null);

	const galleryPrev = React.useRef(null);
	const galleryNext = React.useRef(null);

	const reportsPrev = React.useRef(null);
	const reportsext = React.useRef(null);

	const lifestylePrev = React.useRef(null);
	const lifestyleNext = React.useRef(null);

	return (
		<div>
			{/* block-wrapper-section
			================================================== */}
			{events.length > 0 && reports.length > 0 && publications.length > 0 ? (
				<section className="block-wrapper">
					<div className="container">
						<div className="row">
							<div className="col-sm-8">
								{/* block content */}
								<div className="block-content">
									{/* carousel box */}
									<div className="carousel-box owl-wrapper">
										<div className="title-section">
											<h1>
												<span>
													<Link to="archive/publications">Publications</Link>
												</span>
											</h1>
											<SwiperArrows
												color="#000"
												prev={galleryPrev}
												next={galleryNext}
											/>
										</div>
										<Swiper
											spaceBetween={5}
											onInit={(swiper) => {
												swiper.params.navigation.prevEl = galleryPrev.current;
												swiper.params.navigation.nextEl = galleryNext.current;
												swiper.navigation.init();
												swiper.navigation.update();
											}}
											breakpoints={{
												// when window width is >= 320px
												320: {
													slidesPerView: 1,
													spaceBetween: 0,
												},
												// when window width is >= 480px
												480: {
													slidesPerView: 2,
													spaceBetween: 30,
												},
												// when window width is >= 780px
												780: {
													slidesPerView: 2,
													spaceBetween: 15,
												},
												1024: {
													slidesPerView: 3,
													spaceBetween: 30,
												}
											}}
										>
											{publications.map((post) => (
												<SwiperSlide key={post.id}>
													<div className="item news-post image-post3">
														<img
															src={post.featured_media_src_url.replace("750x370", "210x295")}
															alt={post.title.rendered}
														/>
														<div className="hover-box">
															<h2>
																<Link to={`/single/publications/${post.id}`}>
																	{post.title.rendered}
																</Link>
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
												</SwiperSlide>
											))}
										</Swiper>
										<h5 className="text-right my-2 mx-1">
											<span>
												<Link to="/archive/publications">More &#8594;</Link>
											</span>
										</h5>
									</div>
									{/* End carousel box */}
									{/* grid box */}
									<div className="grid-box">
										<div className="row">
											<div className="col-md-12">
												<div className="title-section">
													<h1>
														<span className="reports">
															<Link to="/archive/reports">Reports</Link>
														</span>
													</h1>
													<SwiperArrows
														color="#000"
														prev={reportsPrev}
														next={reportsext}
													/>
												</div>
												<div className="image-post-slider">
													<Swiper
														slidesPerView={3}
														spaceBetween={5}
														onInit={(swiper) => {
															swiper.params.navigation.prevEl =
																reportsPrev.current;
															swiper.params.navigation.nextEl =
																reportsext.current;
															swiper.navigation.init();
															swiper.navigation.update();
														}}
														breakpoints={{
															// when window width is >= 320px
															320: {
																slidesPerView: 1,
																spaceBetween: 0,
															},
															// when window width is >= 480px
															480: {
																slidesPerView: 2,
																spaceBetween: 30,
															},
															// when window width is >= 780px
															780: {
																slidesPerView: 3,
																spaceBetween: 15,
															},
														}}
													>
														{reports.map((post) => (
															<SwiperSlide key={post.id}>
																<li>
																	<SwiperSlide key={post.id}>
																		<div className="item news-post image-post3">
																			<img
																				src={post.featured_media_src_url}
																				alt={post.title.rendered}
																				height="200"
																			/>
																			<div className="hover-box">
																				<h2>
																					<Link
																						to={`/single/reports/${post.id}`}
																					>
																						{post.title.rendered}
																					</Link>
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
																	</SwiperSlide>
																</li>
															</SwiperSlide>
														))}
													</Swiper>
													<h5 className="text-right my-2 mx-1">
														<span>
															<Link to="/archive/reports">More &#8594;</Link>
														</span>
													</h5>
												</div>
											</div>
											<div className="col-md-12">
												<div className="title-section">
													<h1>
														<span className="world">
															<Link to="/archive/events_coverage">Events</Link>
														</span>
													</h1>
												</div>
												<div className="owl-wrapper">
													<Swiper
														slidesPerView={1}
														onInit={(swiper) => {
															swiper.params.navigation.prevEl =
																lifestylePrev.current;
															swiper.params.navigation.nextEl =
																lifestyleNext.current;
															swiper.navigation.init();
															swiper.navigation.update();
														}}
													>
														<SwiperSlide>
															<div className="item">
																<ul className="list-posts posts-grid">
																	{/* <div className="container"> */}
																	{/* <div className="row"> */}
																	{events.map((post) => (
																		<li key={post.id}>
																			<img
																				src={post.featured_media_src_url}
																				alt={post.title.rendered}
																			/>
																			<div className="post-content">
																				<h2>
																					<Link
																						to={`/single/events_coverage/${post.id}`}
																					>
																						{post.title.rendered}
																					</Link>
																				</h2>
																				<ul className="post-tags">
																					<li>
																						<i className="fa fa-clock-o" />
																						<Moment format="YYYY/MM/DD">
																							{post.date}
																						</Moment>
																					</li>
																				</ul>
																			</div>
																		</li>
																	))}
																	{/* </div> */}
																	{/* </div> */}
																</ul>
															</div>
														</SwiperSlide>
													</Swiper>
												</div>
												<h5 className="text-right my-2 mx-1">
													<span>
														<Link to="/archive/events_coverage">
															More &#8594;
														</Link>
													</span>
												</h5>
											</div>
										</div>
									</div>
									{/* End grid box */}
								</div>
								{/* End block content */}
							</div>
							<div className="col-sm-4">
								{/* sidebar */}
								<SideBar />
							</div>
						</div>
					</div>
				</section>
			) : (
				<Loading />
			)}
			{/* End block-wrapper-section */}
		</div>
	);
}

export default TwoBoxes;
