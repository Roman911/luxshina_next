import { generateRedirect } from '@/utils/redirect';

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
	const { slug } = await params;

	return generateRedirect(`letnyaya-avtoshina-planet-2p${slug ? `/${decodeURIComponent(slug.join('/'))}` : ''}`);
}
