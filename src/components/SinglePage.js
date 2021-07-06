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

import Moment from "react-moment";
import "moment-timezone";
import SideBar from "./SideBar";
import Loading from "./Loading";


SwiperCore.use([Navigation]);

function SinglePage({ match }) {


  const [post, setPost] = useState();


  useEffect(async () => {
    await axios
      .get(
        `https://egyptoil-gas.com/wp-json/wp/v2/pages/${match.params.id}`
      )
      .then((res) => setPost(res.data));
  }, [match.params.id]);


  if (post) {
    return (
      <div>
        {/* block-wrapper-section
                ================================================== */}
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
                    </div>

                    <div className="post-content">
                      <img src={post.featured_media_src_url} className="mb-5" />
                      {
                        post.slug == 'contact-us' && (
                          <iframe className="mb-3" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1221.5146937595607!2d31.434997805215552!3d30.009152942479236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAwJzMyLjUiTiAzMcKwMjYnMDguNCJF!5e0!3m2!1sen!2seg!4v1625458871225!5m2!1sen!2seg" width="600" height="450" allowfullscreen="" loading="lazy"></iframe>
                        )
                      }
                      {post.content && renderHTML(post.content.rendered)}
                    </div>
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

export default SinglePage;
