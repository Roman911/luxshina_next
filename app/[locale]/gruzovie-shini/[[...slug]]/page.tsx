import { generateRedirect } from '@/utils/redirect';

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
	const { slug } = await params;

	return generateRedirect(`gruzovie-shini${slug ? `/${decodeURIComponent(slug.join('/'))}` : ''}`);
}
