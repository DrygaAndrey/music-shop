

export default interface Category {
    attributes: CategoryAttribute[];
    isSubcategory: boolean;
    pictureCode: string,
    products: string[];
    subcategories: string[];
    title: string;
    url: string;
    _id: string;
}

export interface CategoryAttribute {
    name: string;
    options: string[];
}
