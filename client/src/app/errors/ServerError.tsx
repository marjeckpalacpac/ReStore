import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ServerError() {
    const { state } = useLocation();

    return (
        <Container component={Paper}>
            {state?.error ? (
                <>
                    <Typography gutterBottom variant="h3" color='secondary'>
                        {state.error.title}
                    </Typography>
                    <Divider />
                    <Typography variant="body1">{state.error.detail || 'Internal server error'}</Typography>    {/*When running in prod., we will not have access to state.error.detail stack trace. 
                                                                                                                So the "Internal server error" will display instead*/}
                </>
            ) : (
                // if "state" is null then "Server error" will be displayed
                <Typography variant="h5" gutterBottom>Server error</Typography>
            )}

        </Container>
    )
}