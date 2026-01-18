import { permanentRedirect, redirect } from 'next/navigation';
import { DEFAULT_HEADERS } from '@/config/api';

export async function generateRedirect( urlPath: string ) {
	const response = await fetch(`${process.env.SERVER_URL}/api/getSeo`, {
		method: 'POST',
		headers: DEFAULT_HEADERS,
		body: JSON.stringify({
			url: `${process.env.NEXT_PUBLIC_ACCESS_ORIGIN}/${urlPath}`,
		})
	});

	// Перевірка статусу відповіді
	if (!response.ok) {
		console.error(`API error: ${response.status} ${response.statusText}`);
		return;
	}

	// Отримання тексту відповіді для перевірки
	const text = await response.text();

	console.log(text);

	// Перевірка, чи відповідь не порожня
	if (!text || text.trim() === '') {
		console.error('Empty response from API');
		return;
	}

	// Спроба парсингу JSON
	let data;
	try {
		data = JSON.parse(text);
	} catch (error) {
		console.error('Failed to parse JSON:', text);
		return;
	}

	if(data.redirect) {
		if(data.code === '301') {
			permanentRedirect(data.redirect)
		} else {
			redirect(data.redirect);
		}
	}
}
