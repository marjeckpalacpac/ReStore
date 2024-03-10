// import agent from "../../app/api/agent";
import LoadingCompoent from "../../app/layout/LoadingComponent";
// import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchProductsAsync, productSelectors, fetchFilters, setProductParams } from "./catalogSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckBoxButtons";
import AppPagination from "../../app/components/AppPagination";



const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' },
]

export default function Catalog() {
    // const [products, setProducts] = useState<Product[]>([]);
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status, filtersLoaded, brands, types, productParams, metaData } = useAppSelector(state => state.catalog);
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
    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [filtersLoaded, dispatch])
    if (status.includes('pending') || !metaData) return <LoadingCompoent message='Loading products...' />

    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2 }}>
                    <ProductSearch />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <RadioButtonGroup 
                        selectedValue={productParams.orderBy}
                        options={sortOptions}
                        onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtons 
                        items={brands}    
                        checked={productParams.brands}
                        onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtons 
                        items={types}    
                        checked={productParams.types}
                        onChange={(items: string[]) => dispatch(setProductParams({types: items}))}
                    />
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>
            <Grid item xs={3}/>
            <Grid item xs={9}> 
                <AppPagination 
                    metaData={metaData}
                    onPageChange={(page: number) => dispatch(setProductParams({pageNumber: page}))}
                />
            </Grid>
        </Grid>
    )
}