import { generateRedirect } from '@/utils/redirect';

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
	const { slug } = await params;

	return generateRedirect(`letnie-shini-r19letnyaya-rezina-r19${slug ? `/${decodeURIComponent(slug.join('/'))}` : ''}`);
}
