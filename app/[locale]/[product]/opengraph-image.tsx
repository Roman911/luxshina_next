import { ImageResponse } from 'next/og';
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { getProduct } from '@/app/api/api';

// Image metadata
export const size = {
	width: 1200,
	height: 630,
}

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: { params: Promise<{ product: string }> }) {
	const { product } = await params;
	const match = product.match(/(\d+)$/);
	const id = match ? match[1] : '';

	const response = await getProduct(id);
	const logoData = await readFile(join(process.cwd(), 'logo.png'), 'base64')
	const logoSrc = `data:image/jpg;base64,${logoData}`

	if(!response) {
		return new ImageResponse(
			<div
				style={ {
					fontSize: 48,
					background: '#000',
					color: 'white',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				} }
			>
				Product not found
			</div>
		)
	}

	return new ImageResponse(
		(
			<div
				style={ {
					fontSize: 40,
					background: '#fff',
					color: '#000',
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '40px',
					boxSizing: 'border-box',
				} }
			>
				<img
					src={ logoSrc }
					alt={ response.data.full_name }
					width={ 400 }
					height={ 400 }
					style={ { objectFit: 'cover', marginBottom: 20 } }
				/>
				<div>{ response.data.full_name }</div>
				<div style={ { fontSize: 32, color: '#888' } }>{ response.data.min_price } ₴</div>
			</div>
		),
	)
}
