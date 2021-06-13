import React from 'react'

import logo from '../eog.png'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

function ViewMore(props) {
    return (
        <div className="item news-post standard-post">
            <div className="post-content">
                <h2 style={{fontSize: 50, marginTop: 30}}><Link to={`/archive/${props.type}`}>More</Link></h2>
            </div>
        </div>
    )
}

export default ViewMore
