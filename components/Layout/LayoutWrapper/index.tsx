import { ReactNode } from 'react';

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<div className='container mx-auto max-w-[1420px] px-4 py-5 min-h-[70vh]'>
			{ children }
		</div>
	)
};

export default LayoutWrapper;
