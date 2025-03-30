import { ReactNode } from 'react';
import ResetProgress from '@/components/Layout/ResetProgress';

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<div className='container mx-auto max-w-7xl px-4 py-5 min-h-[70vh]'>
			<ResetProgress />
			{ children }
		</div>
	)
};

export default LayoutWrapper;
