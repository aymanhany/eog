import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade } from 'swiper';

import 'swiper/swiper.scss';
import renderHTML from 'react-render-html';

SwiperCore.use([EffectFade]);
// Import Swiper styles


function TickerNews() {

    const [tickerData, setTickerData] = useState([]);

    useEffect(async () => {
        const resft = await axios.get('https://egyptoil-gas.com/wp-json/wp/v2/news?per_page=5');
        setTickerData(resft.data);

    }, [])

    return (
        <div>
            {/* ticker-news-section
			================================================== */}
            <section className="ticker-news">
                <div className="container">
                    <div className="ticker-news-box">
                        <span className="breaking-news">breaking news</span>
                        <div className="ticker-content">
                            <Swiper
                                slidesPerView={2}
                                spaceBetween={15}
                                autoplay={
                                    {delay: 3000}
                                }
                                speed={1500}
                            >
                                {
                                    tickerData ?
                                        tickerData.map(post => (
                                            <SwiperSlide key={post.id}><Link to={`/single/news/${post.id}`}>{renderHTML(post.title.rendered).substring(0, 60)}...</Link></SwiperSlide>
                                        ))
                                        : 'loading..'
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
            {/* End ticker-news-section */}



        </div>
    )
}

export default TickerNews
