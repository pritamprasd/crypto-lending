import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { IconButton } from "@mui/material";

const ResponsiveAppBar = () => {
    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="div">
                        UC
                    </Typography>

                    <Typography
                        sx={{ ml: "0.5rem", flexGrow: 1 }}
                        variant="subtitle1"
                    >
                        Udhaar with Crypto
                    </Typography>

                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-haspopup="true"
                    >
                        <ManageAccountsIcon style={{color: "white"}}/>
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
