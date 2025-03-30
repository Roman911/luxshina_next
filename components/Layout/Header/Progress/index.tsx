'use client'
import { Progress } from '@heroui/progress';
import { useAppSelector } from '@/hooks/redux';

const MyProgress = () => {
	const { progress } = useAppSelector(state => state.progressReducer);

	if (!progress) return null;

	return (
		<div className="fixed top-0 left-0 w-full z-50">
			<Progress color='primary' isIndeterminate aria-label="Loading..." size="sm" />
		</div>
	);
};

export default MyProgress;
