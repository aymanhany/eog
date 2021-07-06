import React, { useEffect, useState } from 'react';
import styles from './featuredVideo.module.css';
import axios from 'axios';
import clsx from 'clsx';

import renderHTML from "react-render-html";

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Loading from '../Loading';

function FeaturedVideo() {
	const [videos, setVideos] = useState([]);
	const [currentVideo, setCurrentVideo] = useState(undefined);
	useEffect(async () => {
		const resft = await axios.get(
			'https://egyptoil-gas.com/wp-json/wp/v2/tv?per_page=10&_embed'
		);
		setCurrentVideo(resft.data[0]);
		setVideos(resft.data);
	}, []);

	function getId(url) {
		var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		var match = url.match(regExp);

		if (match && match[2].length == 11) {
			return match[2];
		} else {
			return 'error';
		}
	}


	// const videoPrevRef = React.useRef(null)
	// const videoNextRef = React.useRef(null)

	return (
		<div>
			{/* feature-video-section 
			================================================== */}
			{setVideos.length > 0 ? (
				<section className="feature-video">
					<div className="container">
						<div className="title-section white d-flex space-between">
							<h1>
								<span>TV</span>
							</h1>
							{/* <SwiperArrows prev={videoPrevRef} next={videoNextRef} /> */}
						</div>
						<div className="features-video-box owl-wrapper">
							<div class={styles.videoSlider}>
								<div className={styles.currentSlide}>
									{currentVideo && (
										< div
											className="item news-post video-post"
											key={currentVideo.id}
										>
											
											<iframe width="100%" height="400" src={`//www.youtube.com/embed/${getId(currentVideo.acf.video)}`} frameborder="0" allowfullscreen></iframe>
											
										</div>
									)}
								</div>
								<ul class={styles.thumbnails}>
									{videos
										? videos.map((post, i) => (
											<li key={i} onClick={() => setCurrentVideo(post)}>
												<div
													className={clsx(
														styles.thumbnail,
														post.id === currentVideo.id && styles.active,
														'item news-post video-post'
													)}
													key={post.id}
												>
													<img
														src={post.featured_media_src_url}
														alt={renderHTML(post.title.rendered)}
													/>
													<h2>{renderHTML(post.title.rendered)}</h2>
												</div>
											</li>
										))
										: 'loading..'}
								</ul>
							</div>
							{/* <Swiper
                            slidesPerView={4}
                            spaceBetween={15}
                            onInit={(swiper) => {
                                swiper.params.navigation.prevEl = videoPrevRef.current;
                                swiper.params.navigation.nextEl = videoNextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }}
                        >
                            {
                                videos ?
                                    videos.map(post => (
                                        <SwiperSlide>
                                            <div className="item news-post video-post">
                                                <img src={post.featured_media_src_url} alt={renderHTML(post.title.rendered)} />
                                                <a target="_blank" href={post.acf.video} className="video-link"><i className="fa fa-play-circle-o" /></a>
                                                <div className="hover-box">
                                                    <h2>{renderHTML(post.title.rendered)}</h2>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                    : 'loading..'
                            }

                        </Swiper> */}
						</div>
					</div>
				</section>
			) : (
				<Loading />
			)
			}
			{/* End feature-video-section */}
		</div >
	);
}

export default FeaturedVideo;
