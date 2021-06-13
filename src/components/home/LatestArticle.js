import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
} from 'react-router-dom';

import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Moment from 'react-moment';
import 'moment-timezone';
import TopViews from '../TopViews';

function LatestArticle() {
	const [news, setNews] = useState([]);

	useEffect(async () => {
		const res = await axios.get(
			'https://egyptoil-gas.com/wp-json/wp/v2/news?per_page=10'
		);
		setNews(res.data);
	}, []);

	return (
		<div>
			{/* block-wrapper-section
			================================================== */}
			<section className="block-wrapper">
				<div className="container">
					<div className="row">
						<div className="col-sm-8">
							{/* block content */}
							<div className="block-content latest-news">
								<div className="title-section">
									<h1>
										<span>
											<Link to="/archive/news">Latest News</Link>
										</span>
									</h1>
								</div>
								{/* masonry box */}
								<div className="row">
									{/* <div className="latest-articles iso-call"> */}
									{news.map((post) => (
										<div
											className="news-post standard-post2 col-sm-6"
											key={post.id}
										>
											<div className="post-gallery">
												<img
													src={post.featured_media_src_url}
													alt={post.title.rendered}
												/>
											</div>
											<div className="post-title">
												<h2>
													<Link to={`/single/news/${post.id}`}>
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
													{/* <li><i className="fa fa-user" />by <a href="#">John Doe</a></li>
                                                            <li><a href="#"><i className="fa fa-comments-o" /><span>23</span></a></li> */}
												</ul>
											</div>
										</div>
									))}

									{/* </div> */}
								</div>
								{/* End masonry box */}
							</div>
							{/* End block content */}
						</div>
						<div className="col-sm-4">
							{/* sidebar */}
							<TopViews />
							{/* End sidebar */}
						</div>
					</div>
				</div>
			</section>
			{/* End block-wrapper-section */}
		</div>
	);
}

export default LatestArticle;
