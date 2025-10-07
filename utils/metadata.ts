import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Language, LanguageCode } from '@/models/language';
import { Section } from '@/models/filter';
import { DEFAULT_HEADERS } from '@/config/api';

export async function generateCatalogMetadata({ locale, section, slug }: {
	locale: Language;
	section: Section;
	slug: string[]
}): Promise<Metadata> {
	const response = await fetch(`${process.env.SERVER_URL}/api/getSeo`, {
		method: 'POST',
		headers: DEFAULT_HEADERS,
		body: JSON.stringify({
			url: `${process.env.NEXT_PUBLIC_ACCESS_ORIGIN}/${locale}/katalog/${section}/${slug?.join('/')}`,
		})
	});

	// Перевірка статусу відповіді
	if (!response.ok) {
		console.error(`API error: ${response.status} ${response.statusText}`);
		return {
			title: 'Catalog',
			description: '',
		};
	}

	// Отримання тексту відповіді для перевірки
	const text = await response.text();

	// Перевірка, чи відповідь не порожня
	if (!text || text.trim() === '') {
		console.error('Empty response from API');
		return {
			title: 'Catalog',
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
		redirect(data.redirect);
	}

	return {
		title: data?.descriptions?.[locale === Language.UK ? LanguageCode.UA : Language.RU]?.title || 'Catalog',
		description: data?.descriptions?.[locale === Language.UK ? LanguageCode.UA : Language.RU]?.meta_description || '',
	};
}