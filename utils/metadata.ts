import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Language, LanguageCode } from '@/models/language';
import { DEFAULT_HEADERS } from '@/config/api';

export async function generateCatalogMetadata({ locale, urlPath }: {
	locale: Language;
	urlPath: string;
}): Promise<Metadata> {
	const url = `${process.env.NEXT_PUBLIC_ACCESS_ORIGIN}/${locale}/${urlPath}`;
	const response = await fetch(`${process.env.SERVER_URL}/api/getSeo`, {
		method: 'POST',
		headers: DEFAULT_HEADERS,
		body: JSON.stringify({
			url,
		})
	});

	// Перевірка статусу відповіді
	if (!response.ok) {
		console.error(`API error: ${response.status} ${response.statusText}`);
		return {
			title: 'Шини та диски',
			description: '',
		};
	}

	// Отримання тексту відповіді для перевірки
	const text = await response.text();

	// Перевірка, чи відповідь не порожня
	if (!text || text.trim() === '') {
		console.error('Empty response from API');
		return {
			title: 'Шини та диски',
			description: '',
		};
	}

	// Спроба парсингу JSON
	let data;
	try {
		data = JSON.parse(text);
	} catch (error) {
		console.error('Failed to parse JSON:', text);
		return {
			title: 'Catalog',
			description: '',
		};
	}

	if (data.redirect) {
		if(url !== data.redirect) {
			redirect(data.redirect);
		}
	}

	return {
		title: data?.descriptions?.[locale === Language.UK ? LanguageCode.UA : Language.RU]?.meta_title || 'Шини та диски',
		description: data?.descriptions?.[locale === Language.UK ? LanguageCode.UA : Language.RU]?.meta_description || '',
		openGraph: {
			title: data?.descriptions?.[locale === Language.UK ? LanguageCode.UA : Language.RU]?.meta_title || 'Шини та диски',
			description: data?.descriptions?.[locale === Language.UK ? LanguageCode.UA : Language.RU]?.meta_description || '',
			images: `${process.env.NEXT_PUBLIC_ACCESS_ORIGIN}/logo.png`,
		},
		alternates: {
			canonical: data?.descriptions?.[locale === Language.UK ? LanguageCode.UA : Language.RU]?.canonical || `${process.env.NEXT_PUBLIC_ACCESS_ORIGIN}/${locale}/${urlPath}`,
		}
	};
}
