import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/product";

interface Prop {
    product: Product;
}

export default function ProductCard({product}: Prop) {
    return (
        <ListItem key={product.id}>
            <ListItemAvatar>
                <Avatar src={product.pictureUrl}></Avatar>
            </ListItemAvatar>
            <ListItemText>{product.name} - {product.price}</ListItemText>
        </ListItem>
    )
}