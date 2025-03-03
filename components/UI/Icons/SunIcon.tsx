import { SVGProps } from 'react';

const SunIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="36px"
		height="36px"
		fill="none"
		viewBox="0 0 36 36"
		{ ...props }
	>
		<path
			d="M18.0005 24.546C21.6155 24.546 24.546 21.6155 24.546 18.0005C24.546 14.3856 21.6155 11.4551 18.0005 11.4551C14.3856 11.4551 11.4551 14.3856 11.4551 18.0005C11.4551 21.6155 14.3856 24.546 18.0005 24.546Z"
			fill="#FABA18"/>
		<path d="M18 3.60059V6.21877" stroke="#FABA18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M18 29.7832V32.4014" stroke="#FABA18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M7.81641 7.81641L9.67532 9.67532" stroke="#FABA18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M26.3262 26.3262L28.1851 28.1851" stroke="#FABA18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M3.60059 18H6.21877" stroke="#FABA18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M29.7832 18H32.4014" stroke="#FABA18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M7.81641 28.1851L9.67532 26.3262" stroke="#FABA18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M26.3262 9.67532L28.1851 7.81641" stroke="#FABA18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
);

export default SunIcon;
