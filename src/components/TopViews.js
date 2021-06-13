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
import Loading from './Loading';

function TopViews() {
	const [topReviews, setTopReviews] = useState([]);
	const [news, setNews] = useState([]);
	useEffect(async () => {
		await axios
			.get(
				'https://egyptoil-gas.com/wp-json/wordpress-popular-posts/v1/popular-posts?post_type=news&per_page=5'
			)
			.then((res) => {
				setTopReviews(res.data.slice(0, 5));
			});
		await axios
			.get('https://egyptoil-gas.com/wp-json/wp/v2/news?per_page=5')
			.then((res) => {
				setNews(res.data.slice(0, 5));
			});
	}, []);

	return (

		<div className="widget tab-posts-widget">
			<Tabs defaultActiveKey="Popular" id="myTab" transition={false}>
				<Tab eventKey="Popular" title="Popular">
					<ul className="list-posts">
						{topReviews ? (
							topReviews.map((post) => (
								<li key={post.id}>
									<img src={post.featured_media_src_url} alt="" />
									<div className="post-content">
										<h2>
											<Link to={`/single/news/${post.id}`}>
												{post.title.rendered.substring(0, 50)}
											</Link>
										</h2>
										<ul className="post-tags">
											<li>
												<i className="fa fa-clock-o" />
												<Moment format="YYYY/MM/DD">{post.title.date}</Moment>
											</li>
										</ul>
									</div>
								</li>
							))
						) : (
							<Loading />
						)}
					</ul>
				</Tab>
				<Tab eventKey="News" title="News">
					<ul className="list-posts">
						{news ? (
							news.map((post) => (
								<li key={post.id}>
									<img src={post.featured_media_src_url} alt="" />
									<div className="post-content">
										<h2>
											<Link to={`/single/news/${post.id}`}>
												{post.title.rendered.substring(0, 50)}
											</Link>
										</h2>
										<ul className="post-tags">
											<li>
												<i className="fa fa-clock-o" />
												<Moment format="YYYY/MM/DD">{post.title.date}</Moment>
											</li>
										</ul>
									</div>
								</li>
							))
						) : (
							<Loading />
						)}
					</ul>
				</Tab>
			</Tabs>
		</div>

	);
}

export default TopViews;
