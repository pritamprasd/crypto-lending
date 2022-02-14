import { Button, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Piechart from "../../components/Piechart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { updateUserState } from "../../slices/authSlice";
import { userStateEnum } from "../../types";
import { useDispatch } from "react-redux";

const WalletImport = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleClick = () => {
        dispatch(updateUserState(userStateEnum.WALLET_IMPORTED));
        navigate("/first-thing")
    }
    return (
        <Box component="div">
            <Card
                sx={{
                    boxShadow: 3,
                    maxWidth: "512px",
                    minHeight: "704px",
                    margin: "1rem auto",
                    padding: "3rem 2.2rem",
                    background:
                        "linear-gradient(180deg, #FFFFFF 0%, #F6E7EB 100%)",
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: "28px",
                        mb: "2.4rem",
                        fontWeight: 500,
                    }}
                >
                    Crypto wallet import
                </Typography>
                <Box sx={{ mt: "4rem" }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: "20px",
                            fontWeight: 700,
                        }}
                    >
                        Wallet Details
                    </Typography>
                    <Box sx={{ display: "flex", mt: "18px" }}>
                        <Box
                            sx={{
                                background: "#662200",
                                width: "4px",
                                borderRadius: "2px",
                                mr: "20px",
                            }}
                        ></Box>
                        <Box sx={{ my: "8px" }}>
                            <Box sx={{ mb: "18px" }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ fontSize: "16px", fontWeight: "400" }}
                                >
                                    Username
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ fontSize: "20px", fontWeight: "500" }}
                                >
                                    rohit007
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ fontSize: "16px", fontWeight: "400" }}
                                >
                                    Wallet ID
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ fontSize: "20px", fontWeight: "500" }}
                                >
                                    JHVG2335DF67576
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ mt: "4rem" }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: "20px",
                                fontWeight: 700,
                            }}
                        >
                            Portfolio summary
                        </Typography>

                        <Piechart />
                    </Box>
                </Box>
                <Button
                    onClick={handleClick}
                    variant="contained"
                    sx={{ mt: "1rem", fontWeight: "400", fontSize: "14px" }}
                    endIcon={<ChevronRightIcon />}
                >
                    Import
                </Button>
            </Card>
        </Box>
    );
};

export default WalletImport;
