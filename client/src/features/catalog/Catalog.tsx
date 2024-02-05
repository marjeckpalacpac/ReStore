import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";


export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        agent.Catalog.list().then(products => setProducts(products))
        // fetch('http://localhost:5001/api/products')
        //     .then(response => response.json())
        //     .then(data => setProducts(data))
    }, [])


    return (
        <>
            <ProductList products={products} />
        </>
    )
}