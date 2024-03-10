// import agent from "../../app/api/agent";
import LoadingCompoent from "../../app/layout/LoadingComponent";
// import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchProductsAsync, productSelectors, fetchFilters } from "./catalogSlice";
import { Grid, Paper, TextField, FormControl, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, Typography, Pagination, Box } from "@mui/material";



const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' },
]

export default function Catalog() {
    // const [products, setProducts] = useState<Product[]>([]);
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status, filtersLoaded, brands, types } = useAppSelector(state => state.catalog);
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
    if (status.includes('pending')) return <LoadingCompoent message='Loading products...' />

    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2 }}>
                    <TextField
                        label='Search products'
                        variant='outlined'
                        fullWidth
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <FormControl>
                        <RadioGroup>
                            {sortOptions.map(({ value, label }) => (
                                <FormControlLabel value={value} control={<Radio />} label={label} key={value} />

                            ))}
                        </RadioGroup>
                    </FormControl>
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <FormGroup>
                        {brands.map(brand => (
                            <FormControlLabel control={<Checkbox />} label={brand} key={brand} />

                        ))}
                    </FormGroup>
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <FormGroup>
                        {types.map(type => (
                            <FormControlLabel control={<Checkbox />} label={type} key={type} />

                        ))}
                    </FormGroup>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>
            <Grid item xs={3}/>
            <Grid item xs={9}> 
                <Box display="flex" justifyContent='space-between' alignItems='center'>
                    <Typography>
                        Displaying 1-6 of 20 items
                    </Typography>
                    <Pagination 
                        color="secondary"
                        size="large"
                        count={10}
                        page={2}
                    />
                </Box>           
            </Grid>
        </Grid>
    )
}