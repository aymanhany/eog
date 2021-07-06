import React, { useState, useEffect, useRef, useCallback } from 'react';
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

import renderHTML from "react-render-html";

import SideBar from './SideBar';
import axios from 'axios';

import Moment from 'react-moment';
import 'moment-timezone';
import TopViews from './TopViews';
import Loading from './Loading';
import { param } from 'jquery';

function Archive({ match }) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const routerLocation = useLocation();
	const lastEl = useRef();

	const type = match.params.type;
	// const firstRender = useRef(false)
	const isLastElVisible = useCallback(
		(node) => {
			if (loading) return;
			if (lastEl.current) lastEl.current.disconnect();
			lastEl.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prev) => prev + 1);
				}
			});
			if (node) lastEl.current.observe(node);
			if (!hasMore) setLoading(false);
		},
		[loading, hasMore]
	);

	useEffect(() => {
		setPageNumber(1);
		setData([]);
		fetchData(1);
		setLoading(true);
		setHasMore(true);
	}, [match.params]);

	useEffect(() => {
		if (pageNumber === 1) return;
		fetchData(pageNumber);
	}, [pageNumber]);

	const fetchData = async (page) => {
		setLoading(true);
		await axios
			.get(`https://egyptoil-gas.com/wp-json/wp/v2/${match.params.type}?filter[${match.params.category_type}]=${match.params.category}&page=${page}`)
			.then((res) => {
				if (res.status === 400) {
					setLoading(false);
					setHasMore(false);
					return;
				}
				// let catData = [...res.data];
				// if (match?.params?.category) {
				// 	catData = [];
				// 	switch (match.params.type) {
				// 		case 'news':
				// 			catData = res.data.filter((item) =>
				// 				item.news_region.includes(parseInt(match?.params?.category))
				// 			);
				// 			break;
				// 		case 'publications':
				// 			catData = res.data.filter((item) =>
				// 				item.publications_category.includes(
				// 					parseInt(match?.params?.category)
				// 				)
				// 			);
				// 			break;
				// 		case 'events_coverage':
				// 			catData = res.data.filter((item) =>
				// 				item.events_category.includes(parseInt(match?.params?.category))
				// 			);
				// 			break;
				// 		default:
				// 			break;
				// 	}
				// }
				setData((prev) => [...prev, ...res.data]);
				console.log(data);
				if (res.data.length === 0) {
					console.log('false');
					setHasMore(false);
				} else {
					console.log('true');
					setHasMore(res.data.length > 0);
				}

				setLoading(false);
			})
			.catch((err) => {
				if (err.response.status === 400) {
					setLoading(false);
					setHasMore(false);
				}
			});
	};
	return (
		<section className="block-wrapper">
			<div className="container">
				{data.length > 0 && (
					<div className="row">
						<div className="col-sm-8">
							{/* block content */}
							<div className="block-content">
								<div class="title-section">
									<h1>
										<span>
											{match.params.category ? match.params.category.replaceAll('-', ' ') : match.params.type}
										</span>
									</h1>
								</div>
								<div className="row">

									{data.map((post, index) => {
										if (data.length === index + 1) {
											return (
												<div
													className={`news-post standard-post2 ${type === 'publications' ? 'col-sm-4' : 'col-sm-6'} `}
													key={`${post.id}-${post.slug}`}
													ref={isLastElVisible}
												>
													<div className={`${type == 'tv' ? 'tv' : ''} post-gallery`}>
														{
															type === 'publications' ?
																<Link
																	to={`/single/${match.params.type}/${post.slug}`}
																><img
																		src={post.featured_media_src_url.replace("750x370", "210x295")}
																		alt={renderHTML(post.title.rendered)}
																	/>
																</Link>
																:
																<Link
																	to={`/single/${match.params.type}/${post.slug}`}
																>
																	<img
																		src={
																			post.featured_media_src_url
																				? post.featured_media_src_url
																				: post.acf.svg_map
																		}
																		alt={renderHTML(post.title.rendered)}
																	/>
																	{type == 'tv' ?
																		<div className="tv-holder">
																			<Link
																				to={`/single/tv/${post.slug}`}
																			><img src="https://egyptoil-gas.com/wp-content/uploads/2021/07/ybtn.png" /></Link>
																		</div>
																		: ''}
																</Link>
														}
													</div>
													<div className="post-title">
														<h2>
															<Link
																to={`/single/${match.params.type}/${post.slug}`}
															>
																{renderHTML(post.title.rendered)}
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
												</div>
											);
										} else {
											return (
												<div
													className={`news-post standard-post2 ${type === 'publications' ? 'col-sm-4' : 'col-sm-6'} `}
													key={post.id}
												>
													<div className={`${type == 'tv' ? 'tv' : ''} post-gallery`}>
														{
															type === 'publications' ?
																<Link
																	to={`/single/${match.params.type}/${post.slug}`}
																><img
																		src={post.featured_media_src_url.replace("750x370", "210x295")}
																		alt={renderHTML(post.title.rendered)}
																	/>
																</Link>
																:
																<Link
																	to={`/single/${match.params.type}/${post.slug}`}
																>
																	<img
																		src={
																			post.featured_media_src_url
																				? post.featured_media_src_url
																				: post.acf.svg_map
																		}
																		alt={renderHTML(post.title.rendered)}
																	/>
																	{type == 'tv' ?
																		<div className="tv-holder">
																			<Link
																				to={`/single/tv/${post.slug}`}
																			><img src="https://egyptoil-gas.com/wp-content/uploads/2021/07/ybtn.png" /></Link>
																		</div>
																		: ''}
																</Link>
														}
													</div>
													<div className="post-title">
														<h2>
															<Link
																to={`/single/${match.params.type}/${post.slug}`}
															>
																{renderHTML(post.title.rendered)}
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
												</div>
											);
										}
									})}
								</div>
							</div>
							{/* End block content */}
						</div>
						<div className="col-sm-4">
							{/* sidebar */}
							<SideBar />
							{/* End sidebar */}
						</div>
					</div>
				)}
				{!loading && data.length === 0 && (
					<h4 className="my-5 text-center">No Data found</h4>
				)}
				{loading && <Loading />}
			</div>
		</section>
	);
}

export default Archive;
