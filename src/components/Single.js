import React, { useState, useEffect } from "react";
import axios from "axios";

import { Document, Page } from "react-pdf";

import { Link } from "react-router-dom";

import renderHTML from "react-render-html";

import SwiperArrows from "./SwiperArrows";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
// Import Swiper styles
import "swiper/swiper.scss";
import { map } from "jquery";

import Moment from "react-moment";
import "moment-timezone";
import SideBar from "./SideBar";
import TopViews from "./TopViews";
import Loading from "./Loading";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

SwiperCore.use([Navigation]);

function Single({ match }) {
  const likePrevRef = React.useRef(null);
  const likeNextRef = React.useRef(null);

  const [post, setPost] = useState();
  const [like, setLike] = useState();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const type = match.params.type;

  function getId(url) {
    var regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return "error";
    }
  }

  useEffect(async () => {
    await axios
      .get(
        `https://egyptoil-gas.com/wp-json/wp/v2/${match.params.type}/${match.params.id}?_embed`
      )
      .then((res) => setPost(res.data));

    await axios
      .get(
        `https://egyptoil-gas.com/wp-json/wp/v2/${match.params.type}?per_page=5`
      )
      .then((res) => setLike(res.data));
  }, [match.params]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (post && like) {
    return (
      <div>
        {/* block-wrapper-section
                ================================================== */}
        {console.log(post)}
        <section className="block-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-sm-8">
                {/* block content */}
                <div className="block-content">
                  {/* single-post box */}
                  <div className="single-post-box">
                    <div className="title-post">
                      <h1>{renderHTML(post.title.rendered)}</h1>
                      <ul className="post-tags">
                        <li>
                          <i className="fa fa-clock-o" />
                          <Moment format="YYYY/MM/DD">{post.date}</Moment>
                        </li>
                        <li>
                          <i className="fa fa-user" />
                          {post?._embedded?.author && (
                            <span>
                              {" "}
                              "by" {post?._embedded?.author[0]?.name}{" "}
                            </span>
                          )}
                        </li>
                      </ul>
                    </div>

                    <div className="post-gallery">
                      <div className="item news-post video-post" key={post.id}>
                        {type !== "tv" &&
                          type !== "reports" &&
                          type !== "publications" &&
                          type !== "maps" ? (
                          <img
                            src={
                              post.featured_media_src_url
                                ? post.featured_media_src_url
                                : ""
                            }
                            alt={renderHTML(post.title.rendered)}
                          />
                        ) : (
                          ""
                        )}
                        {type === "maps" ? (
                          <TransformWrapper
                            initialScale={1}
                            initialPositionX={200}
                            initialPositionY={100}
                          >
                            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                              <React.Fragment>
                                <div className="tools">
                                  <button className="map-btn" onClick={zoomIn}>+</button>
                                  <button className="map-btn" onClick={zoomOut}>-</button>
                                  <button className="map-btn" onClick={resetTransform}>x</button>
                                </div>
                                <TransformComponent>
                                  <img
                                    src={
                                      post.acf.svg_map
                                    }
                                    alt={renderHTML(post.title.rendered)}
                                  />
                                </TransformComponent>
                              </React.Fragment>
                            )}
                          </TransformWrapper>
                        ) : (
                          ""
                        )}

                        {post.acf.video ? (
                          <>
                            <iframe
                              width="100%"
                              height="400"
                              src={`//www.youtube.com/embed/${getId(
                                post.acf.video
                              )}`}
                              frameborder="0"
                              allowfullscreen
                            ></iframe>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      {/* <span className="image-caption">Cras eget sem nec dui volutpat ultrices.</span> */}
                    </div>
                    <div className="post-content">
                      {post.content && renderHTML(post.content.rendered)}
                      {type == "reports"
                        ? renderHTML(post.acf.issuu_code)
                        : type == "publications"
                          ? renderHTML(post.acf.issuu_code)
                          : ""}

                      {type == "reports" || type == "publications" ? (
                        <a href={post.acf.pdf.url} className="d-block my-3" target="_blank">
                          Download File
                        </a>
                      ) : (
                        ""
                      )}
                    </div>

                    {/* carousel box */}
                    <div className="carousel-box owl-wrapper">
                      <div className="title-section">
                        <h1>
                          <span>You may also like</span>
                        </h1>
                        <SwiperArrows
                          color="#000"
                          prev={likePrevRef}
                          next={likeNextRef}
                        />
                      </div>
                      <Swiper
                        slidesPerView={3}
                        spaceBetween={5}
                        onInit={(swiper) => {
                          swiper.params.navigation.prevEl = likePrevRef.current;
                          swiper.params.navigation.nextEl = likeNextRef.current;
                          swiper.navigation.init();
                          swiper.navigation.update();
                        }}
                      >
                        {like.map((post) => (
                          <SwiperSlide key={post.id}>
                            <div className="item news-post image-post3">
                              <Link to={`/single/news/${post.id}`}>
                                <img 
                                  style={{"minHeight": "200px"}}
                                  src={
                                    post.featured_media_src_url
                                      ? post.featured_media_src_url
                                      : post.acf.svg_map
                                  }
                                  alt={renderHTML(post.title.rendered)}
                                />
                              </Link>
                              <div className="hover-box">
                                <h2>
                                  <Link to={`/single/news/${post.id}`}>
                                    {renderHTML(post.title.rendered)}
                                  </Link>
                                </h2>
                                <ul className="post-tags">
                                  <li>
                                    <i className="fa fa-clock-o" />
                                    <Moment format="DD-MM-Y">
                                      {post.date}
                                    </Moment>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    {/* End carousel box */}
                    {/* contact form box */}
                    {/* End contact form box */}
                  </div>
                  {/* End single-post box */}
                </div>
                {/* End block content */}
              </div>
              <div className="col-sm-4">
                {/* sidebar */}
                <SideBar />
                {/* End sidebar */}
              </div>
            </div>
          </div>
        </section>
        {/* End block-wrapper-section */}
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default Single;
