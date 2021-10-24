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

import Loading from './Loading';
import logo from '../eog.png';

function Archive({ match }) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);




	useEffect(() => {
		fetchData();
		setLoading(true);
		// setHasMore(true);
	}, [match.params]);

	const fetchData = async () => {
		setLoading(true);
		await axios
			.get(`https://egyptoil-gas.com/wp-json/wp/v2/events_calendar?per_page=1`)
			.then((res) => {
				if (res.status === 400) {
					setLoading(false);
					// setHasMore(false);
					return;
				}

				setData(res.data);
				console.log(data);

				setLoading(false);
			})
			.catch((err) => {
				if (err.response.status === 400) {
					setLoading(false);
					// setHasMore(false);
				}
			});
	};
	return (
		<section className="block-wrapper">
			<div className="container">
				{/* {data.length > 0 && ( */}
				<div className="row">
					<div className="col-sm-8">
						{/* block content */}
						<div className="block-content">
							<div class="title-section">
								<h1>
									<span>
										Events Calendar
									</span>
								</h1>
							</div>
							<div className="row">

								{data.map((post, index) => (
									<div
										className="news-post standard-post2 col-sm-12"
										key={`${post.id}-${post.slug}`}
									>
										<div className="post-gallery">
											<Link
												to={`/single/events_calendar/${post.slug}`}
											><img loading="lazy"
													src={post.featured_media_src_url ? post.featured_media_src_url : logo}
													alt={renderHTML(post.title.rendered)}
												/>
											</Link>
										</div>
										<div className="post-title">
											<h2>
												<Link
													to={`/single/events_calendar/${post.slug}`}
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
								))}
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
				{/* )} */}
				{!loading && data.length === 0 && (
					<h4 className="my-5 text-center">No Data found</h4>
				)}
				{loading && <Loading />}
			</div>
		</section>
	);
}

export default Archive;
