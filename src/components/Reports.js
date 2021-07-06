import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";

import renderHTML from "react-render-html";

import SideBar from "./SideBar";
import axios from "axios";

import Moment from "react-moment";
import "moment-timezone";
import TopViews from "./TopViews";
import Loading from "./Loading";
import { param } from "jquery";

function Reports({ match }) {
  const [data, setData] = useState([]);
  const [cats, setCats] = useState([]);
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
    setCats([]);
    fetchData(1);
    setLoading(true);
    setHasMore(true);
  }, [match.params]);

  // useEffect(() => {
  //   if (pageNumber === 1) return;
  //   fetchData(pageNumber);
  // }, [pageNumber]);

  const fetchData = async (page) => {
    setLoading(true);
    await axios
      .get("https://egyptoil-gas.com/wp-json/wp/v2/reports_category")
      .then((res) => {
        setCats(res.data);
        res.data.map((slug) => {
          axios
            .get(
              `https://egyptoil-gas.com/wp-json/wp/v2/reports?filter[reports_category]=${slug.slug}`,
              {
                params: {
                  per_page: 4
                },
              }
            )
            .then((res) => {
              if (res.status === 400) {
                setLoading(false);
                setHasMore(false);
                return;
              }

              setData((prev) => [...prev, ...res.data]);
              console.log(data);

              if (data.length === 0) {
                console.log("false");
                setHasMore(false);
              } else {
                console.log("true");
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
        });
      });
  };
  return (
    <section className="block-wrapper">
      {console.log(data)}
      <div className="container">
        {data.length > 0 && (
          <div className="row">
            <div className="col-sm-8">
              {/* block content */}
              <div className="block-content">
                <div className="row">
                  {cats.map((cat) => (
                    <div className="blockDiv col-sm-12">
                      <div class="title-section">
                        <h1><span><Link to={`archive/reports/reports_category/${cat.slug}`}>{cat.slug}</Link></span></h1>
                      </div>
                      <div className="row">
                        {data.map(
                          (post, index) =>
                            data.length > 0 &&
                            post.reports_category[0] === cat.id && (
                              <div
                                className="news-post standard-post2 col-sm-6"
                                key={`${post.id}-${post.slug}`}
                                ref={isLastElVisible}
                              >
                                <div className="post-gallery">
                                  <Link
                                    to={`/single/reports/${post.slug}`}
                                  >
                                    <img
                                      src={post.featured_media_src_url}
                                      alt={renderHTML(post.title.rendered)}
                                    />
                                  </Link>
                                </div>
                                <div className="post-title">
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
                            )
                        )}
                      </div>
                      <h5 className="text-right mb-3">
                        <span>
                          <Link to={`archive/reports/reports_category/${cat.slug}`}>More &#8594;</Link>
                        </span>
                      </h5>
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
        )}
        {!loading && data.length === 0 && (
          <h4 className="my-5 text-center">No Data found</h4>
        )}
        {loading && <Loading />}
      </div>
    </section>
  );
}

export default Reports;
