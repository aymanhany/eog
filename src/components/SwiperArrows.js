import React from 'react'

function SwiperArrows({ prev, next, color }) {
    return (
        <div className="swiper-arrows">
            <div ref={prev} style={ { color: color } }><i className="fa fa-angle-left"></i></div>
            <div ref={next} style={ { color: color } }><i className="fa fa-angle-right"></i></div>
        </div>
    )
}

export default SwiperArrows
