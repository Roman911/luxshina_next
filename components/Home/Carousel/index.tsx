'use client';

import { FC } from 'react';
import dynamic from "next/dynamic";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { Banner } from '@/models/banners';

const Lightbox = dynamic(() => import("./LightboxComponent"), { ssr: false });

const inline = {
	style: {
		width: "100%",
		maxWidth: "1520px",
		height: '100%',
		maxHeight: '500px',
		aspectRatio: "1",
		margin: "0 auto",
	},
};

interface Props {
	sliderData: Banner[]
}

const Carousel: FC<Props> = ({ sliderData }) => {
	const slides = sliderData.map(item => {
		return { src: item.image, width: 1520, height: 500 }
	});

	return (
		<div className='mt-24'>
			<Lightbox
				index={0}
				slides={slides}
				carousel={{
					padding: 0,
					spacing: 0,
					imageFit: "cover",
				}}
				inline={ inline }
			/>
		</div>
	)
};

export default Carousel;
