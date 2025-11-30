export type ProductImage = {
	id: number;
	position: number;
	url: string;
};

export type ProductVariant = {
	id: number;
	sku: string;
	barcode: string;
	image_id: number;
	inventory_quantity: number;
};

export type Product = {
	id: number;
	title: string;
	description: string;
	images: ProductImage[];
	variants: ProductVariant[];
	imageSrc?: string;
	variantsCount?: number;
	inStock?: boolean;
	category?: string;
};
