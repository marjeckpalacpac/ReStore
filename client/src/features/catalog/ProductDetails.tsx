import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingCompoent from "../../app/layout/LoadingComponent";
// import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
// import { removeItem, setBasket } from "../basket/basketSlice";
// import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "../basket/basketSlice";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
    // const { basket, setBasket, removeItem } = useStoreContext();
    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    // const [product, setProduct] = useState<Product | null>(null);
    const product = useAppSelector(state => productSelectors.selectById(state, parseInt(id!)));
    // const [loading, setLoading] = useState(true);
    const {status: productStatus} = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState(0);
    // const [submitting, setSubmitting] = useState(false)
    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        // id && agent.Catalog.details(parseInt(id))
        //     // axios.get(`http://localhost:5001/api/products/${id}`)
        //     .then(response => setProduct(response))
        //     .catch(error => console.log(error))
        //     .finally(() => setLoading(false))
        if (!product && id) dispatch(fetchProductAsync(parseInt(id)))
    }, [id, item, dispatch, product])

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        if (parseInt(event.currentTarget.value) >= 0) {
            setQuantity(parseInt(event.currentTarget.value));
        }
    }

    function handleUpdateCart() {
        if (!product) return;
        // setSubmitting(true);
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            // agent.Basket.addItem(product.id, updatedQuantity)
            //     .then(basket => dispatch(setBasket(basket)))
            //     .catch(error => console.log(error))
            //     .finally(() => setSubmitting(false))
            dispatch(addBasketItemAsync({productId: item?.productId!, quantity: updatedQuantity}))
        }
        else {
            const updatedQuantity = item.quantity - quantity;
            // agent.Basket.removeItem(product.id, updatedQuantity)
            //     .then(() => dispatch(removeItem({productId: product.id, quantity: updatedQuantity})))
            //     .catch(error => console.log(error))
            //     .finally(() => setSubmitting(false));
            dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
        }
    }

    // if (loading) return <LoadingCompoent message='Loading product...' />
    if (productStatus.includes('pending')) return <LoadingCompoent message='Loading product...' />

    if (!product) return <NotFound />

    return (

        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h3" color="secondary">{(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || !item && quantity === 0}
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{ height: '55px' }}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}

                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}