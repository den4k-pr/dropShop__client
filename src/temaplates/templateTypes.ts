// types/models.ts
export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    soldProducts: string[];
    storeProducts: ProductTypes[];
  }
  
  export interface Category {
    id: string;
    name: string;
    categorySlug: string;
    images: string[];
    subCategory: SubCategory[];
    products: ProductTypes[];
  }
  
  export interface SubCategory {
    id: string;
    name: string;
    subCategorySlug: string;
    category: Category;
    categoryId: string;
    products: ProductTypes[];
  }
  
  export interface ProductTypes {
    id: string;
    name: string;
    slug: string;
    price: number;
    priceDrop: number;
    description: string;
    sizes: string[];
    images: string[];
    colors: string[];
    gender: string;
    categoryName: string;
    user?: User;
    userId?: string;
    category?: Category;
    categoryId?: string;
    subCategory?: SubCategory;
    subCategoryId?: string;
  }
  