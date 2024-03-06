// import agent from "../../app/api/agent";
import LoadingCompoent from "../../app/layout/LoadingComponent";
// import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";


export default function Catalog() {
    // const [products, setProducts] = useState<Product[]>([]);
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        // fetch('http://localhost:5001/api/products')
        //     .then(response => response.json())
        //     .then(data => setProducts(data))

                //agent.Catalog.list()
        // .then(products => setProducts(products))
        // .catch(error => console.log(error))
        // .finally(() => setLoading(false))
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded,dispatch])

    if (status.includes('pending')) return <LoadingCompoent message='Loading products...'/>

    return (
        <>
            <ProductList products={products} />
        </>
    )
}