'use client'

import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Product from "@/types/product";
import ProductCardsContainer from "../productCardsContainer/ProductCardsContainer";
import MyButton from "../myButton/myButton";
import getNewProducts from "@/functions/getNewProducts";

interface NewProductsProps {
    initialProducts: Product[];
    initialHasMore: boolean;
}

export default function NewProducts({ initialProducts, initialHasMore }: NewProductsProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [page, setPage] = useState(2); // 2 because we already have 1 from the initialProducts
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const { products: newProducts, hasMore: moreProducts } = await getNewProducts(page, 5);

            if (newProducts && newProducts.length > 0) {
                setProducts(prevProducts => [...prevProducts, ...newProducts]);
                setPage(prevPage => prevPage + 1);
            }

            setHasMore(moreProducts);
        } catch (error) {
            console.error('Error fetching new products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.newProducts}>
            <h2 className="container">New Products</h2>
            <ProductCardsContainer products={products} columns={5}/>

            {hasMore && (
                <MyButton
                    onClick={getProducts}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Load More'}
                </MyButton>
            )}
        </div>
    );
}