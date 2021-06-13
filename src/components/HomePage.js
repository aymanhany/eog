import React from 'react';
import FeaturesToday from './home/FeaturesToday';
import LatestArticle from './home/LatestArticle';
import HeadingNews from './home/HeadingNews';
import TwoBoxes from './home/TwoBoxes';
import FeaturedVideo from './home/FeaturedVideo';

function HomePage() {
	return (
		<div>
			<HeadingNews />
			<FeaturesToday />
			<TwoBoxes />
			<FeaturedVideo />
		</div>
	);
}

export default HomePage;
