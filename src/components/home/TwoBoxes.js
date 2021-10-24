import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Moment from "react-moment";
import "moment-timezone";

import renderHTML from "react-render-html";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import SwiperArrows from "../SwiperArrows";
import axios from "axios";
import SideBar from "../SideBar";
import Loading from "../Loading";

SwiperCore.use([Navigation]);

function TwoBoxes() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [reports, setReports] = useState([]);
  const [publications, setPublications] = useState([]);

  useEffect(async () => {
    await axios
      .get("https://egyptoil-gas.com/wp-json/wp/v2/events_coverage?per_page=6")
      .then((res) => {
        setEvents(res.data);
      });
    await axios
      .get("https://egyptoil-gas.com/wp-json/wp/v2/news?per_page=4")
      .then((res) => {
        setNews(res.data);
      });

    await axios
      .get("https://egyptoil-gas.com/wp-json/wp/v2/reports?per_page=6")
      .then((res) => {
        setReports(res.data);
      });

    await axios
      .get("https://egyptoil-gas.com/wp-json/wp/v2/publications?per_page=5")
      .then((res) => {
        setPublications(res.data);
      });

      <script type='text/javascript' src='https://ads.egyptoil-gas.com/www/delivery/spcjs.php?id=1&amp;userType=premiumUser'></script>


    // <ins data-revive-zoneid="1" data-revive-userType="premiumUser" data-revive-id="9689241d68f3bd2ccf2f346d74a3abaa"></ins>
    // <script async src="//revive-adserver.example.com/www/delivery/asyncjs.php"></script>

    //     const script = document.createElement('script');
    //     script.src = `https://ads.egyptoil-gas.com/www/delivery/ajs.php?zoneid=1&cb=${Math.floor(Math.random() * 99999999999)}`;



    //     const m3_u = 'https://ads.egyptoil-gas.com/www/delivery/ajs.php';
    //     const m3_r = Math.floor(Math.random() * 99999999999);

    //     if (!document.MAX_used) document.MAX_used = ',';
    //     document.write("<scr" + "ipt type='text/javascript' src='" + m3_u);
    //     document.write("?zoneid=1");
    //     document.write('&amp;cb=' + m3_r);
    //     if (document.MAX_used != ',') document.write("&amp;exclude=" + document.MAX_used);
    //     document.write(document.charset ? '&amp;charset=' + document.charset : (document.characterSet ? '&amp;charset=' + document.characterSet : ''));
    //     document.write("&amp;loc=" + escape(window.location));
    //     if (document.referrer) document.write("&amp;referer=" + escape(document.referrer));
    //     if (document.context) document.write("&context=" + escape(document.context));
    //     if (document.mmm_fo) document.write("&amp;mmm_fo=1");
    //     document.write("'><\/scr" + "ipt>");
    //]]>--></script><noscript><a href='http://ads.egyptoil-gas.com/www/delivery/ck.php?n=ac4e6269&amp;cb=INSERT_RANDOM_NUMBER_HERE' target='_blank'><img loading="lazy" loading="lazy"src='http://ads.egyptoil-gas.com/www/delivery/avw.php?zoneid=1&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;n=ac4e6269' border='0' alt='' /></a></noscript>
    // return () => {
    //   document.body.removeChild(script);
    // }
  }, []);

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
              <div className="col-md-8 col-sm-12">
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
                        },
                      }}
                    >
                      {publications.map((post) => (
                        <SwiperSlide key={post.id}>
                          <div className="item news-post image-post3">
                            <Link to={`/single/publications/${post.slug}`}>
                              <img loading="lazy"
                                src={post.featured_media_src_url.replace(
                                  "750x370",
                                  "210x295"
                                )}
                                alt={renderHTML(post.title.rendered)}
                              />
                            </Link>
                            <div className="hover-box">
                              <h2>
                                <Link to={`/single/publications/${post.slug}`}>
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
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <h5 className="text-right my-2 mx-1">
                      <span>
                        <Link to="/publications">More &#8594;</Link>
                      </span>
                    </h5>
                  </div>
                  {/* <img loading="lazy"
                    src="https://ads.egyptoil-gas.com/www/images/54a8fb2810a50256c62e6f11e122f887.jpg"
                    width="100%"
                    className="mb-5"
                  />
                   */}
                  {/* <a href={`https://ads.egyptoil-gas.com/www/delivery/ck.php?n=a744f791&cb=${Math.floor(Math.random() * 99999999999)}`} target='_blank'><img loading="lazy" loading="lazy"src={`https://ads.egyptoil-gas.com/www/delivery/avw.php?zoneid=2&userType=premiumUser&cb=${Math.floor(Math.random() * 99999999999)}&n=a744f791`} border='0' alt='' /></a> */}

                  <div id="test"></div>

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
                                      <Link to={`/single/reports/${post.slug}`}>
                                        <img loading="lazy"
                                          src={post.featured_media_src_url}
                                          alt={renderHTML(post.title.rendered)}
                                          height="200"
                                        />
                                      </Link>
                                      <div className="hover-box">
                                        <h2>
                                          <Link
                                            to={`/single/reports/${post.slug}`}
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

                          <img loading="lazy"
                            src="https://ads.egyptoil-gas.com/www/images/54a8fb2810a50256c62e6f11e122f887.jpg"
                            width="100%"
                            className="mb-5 mt-3"
                          />
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
                                      <Link
                                        to={`/single/events_coverage/${post.slug}`}
                                      >
                                        <img loading="lazy"
                                          src={post.featured_media_src_url}
                                          alt={renderHTML(post.title.rendered)}
                                        />
                                      </Link>

                                      <div className="post-content">
                                        <h2>
                                          <Link
                                            to={`/single/events_coverage/${post.slug}`}
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

                  <img loading="lazy"
                    src="https://ads.egyptoil-gas.com/www/images/54a8fb2810a50256c62e6f11e122f887.jpg"
                    width="100%"
                    className="mb-3 mt-3"
                  />
                </div>
                {/* End block content */}
              </div>
              <div className="col-md-4 col-sm-12">
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
