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

import SideBar from './SideBar';
import axios from 'axios';

import Moment from 'react-moment';
import 'moment-timezone';
import TopViews from './TopViews';
import Loading from './Loading';
const Search = ({ match }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const routerLocation = useLocation();
	const lastEl = useRef();
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
		// console.log();
	}, [routerLocation]);
	useEffect(() => {
		if (pageNumber === 1) return;
		fetchData(pageNumber);
	}, [pageNumber]);
	const fetchData = async (page) => {
		setLoading(true);
		console.log(match);
		await axios
			.get(
				`https://egyptoil-gas.com/wp-json/wp/v2/search?search=${routerLocation.state.search.split('=')[1]
				}`,
				{
					params: {
						per_page: 10,
						page,
					},
				}
			)
			.then((res) => {
				console.log(res.data);

				if (res.status === 400) {
					setLoading(false);
					setHasMore(false);
					return;
				}
				setData((prev) => [...prev, ...res.data]);
				setHasMore(res.data.length > 0);
				setLoading(false);
			})
			.catch((err) => {
				if (err.response && err.response.status === 400) {
					setLoading(false);
					setHasMore(false);
				}
			});
	};
	return (
		<section className="block-wrapper">
			<div className="container">
				{data.length > 0 ? (
					<div className="row">
						<div className="col-sm-8">
							{/* block content */}
							<div className="block-content">
								<div className="row">
									{data.map((post, index) => {
										if (data.length === index + 1) {
											return (
												<div
													className="news-post standard-post2 col-sm-6"
													key={`${post?.id}-${post?.subtype}`}
													ref={isLastElVisible}
												>
													<div className="post-title">
														<h2>
															<Link to={`/single/${post?.subtype}/${post?.id}`}>
																{post.title}
															</Link>
														</h2>
														<ul className="post-tags">
															<li>{post.subtype}</li>
														</ul>
													</div>
												</div>
											);
										} else {
											return (
												<div
													className="news-post standard-post2 col-sm-6"
													key={`${post?.id}-${post?.subtype}`}
												>
													<div className="post-title">
														<h2>
															<Link to={`/single/${post?.subtype}/${post?.id}`}>
																{post.title}
															</Link>
														</h2>
														<ul className="post-tags">
															<li>{post.subtype}</li>
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
				) : (
					<Loading />
				)}
				{loading && <Loading />}
			</div>
		</section>
	);
};

export default Search;
