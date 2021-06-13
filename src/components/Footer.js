import React, { useEffect } from 'react'
// import '../js/jquery.min.js'

function Footer() {
    return (
        <div>
            {/* footer 
			================================================== */}
            <footer>
                <div className="container">
                    <div className="footer-widgets-part">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="widget text-widget">
                                    <h1>About</h1>
                                    <p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. </p>
                                </div>
                                <div className="widget social-widget">
                                    <h1>Stay Connected</h1>
                                    <ul className="social-icons">
                                        <li><a href="https://www.facebook.com/EgyptOilandGas" className="facebook"><i className="fa fa-facebook" /></a></li>
                                        <li><a href="https://twitter.com/EgyptOilandGas" className="twitter"><i className="fa fa-twitter" /></a></li>
                                        <li><a href="https://www.instagram.com/egyptoilandgas/" className="instagram"><i className="fa fa-instagram" /></a></li>
                                        <li><a href="https://www.linkedin.com/company/egypt-oil-&-gas/" className="linkedin"><i className="fa fa-linkedin" /></a></li>
                                        <li><a href="https://youtube.com/user/EgyptOilandGas" className="youtube"><i className="fa fa-youtube" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-last-line">
                        <div className="row">
                            <div className="col-md-6">
                                <p>© COPYRIGHT 2021 Egypt oil gas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* End footer */}
        </div>
    )
}

export default Footer
