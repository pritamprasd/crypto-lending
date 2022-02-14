import { Button, Card, Divider, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch } from "react-redux";
import { signIn, updateUserState } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../../services";
import { userStateEnum } from "../../types";
import Axios from "../../config/Axios";

const SignIn = () => {
    const [formData, setFormData] = useState({
        walletAddress: "",
        password: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await login(formData);
        if (data.status === 200) {
            Axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${data.data.token}`;
            localStorage.setItem("isSignIn", true);
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("id", data.data.id);
            dispatch(signIn(data.data));
            dispatch(updateUserState(userStateEnum.SIGNEDIN));
            navigate("/wallet-import");
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/wallet-import");
        }
    }, []);

    const onChange = (e) => {
        const name = e.target.id;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <Box component="div">
                <Card
                    sx={{
                        boxShadow: 3,
                        maxWidth: "512px",
                        minHeight: "704px",
                        margin: "1rem auto",
                        padding: "3rem 2.2rem",
                        background:
                            "linear-gradient(180deg, #FDF4E3 -1.85%, #F6E7EB 100%)",
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: "28px",
                            marginBottom: "0.5rem",
                            fontWeight: "500",
                            mb: "2rem",
                        }}
                    >
                        Sign in with your Crypto wallet
                    </Typography>
                    {/* <Typography
                        variant="subtitle1"
                        sx={{ fontSize: "16px", fontWeight: "400" }}
                    >
                        Your crypto wallet will be imported to UC
                    </Typography> */}

                    {/* <Box sx={{ mt: "4rem" }}>
                        <Button
                            variant="contained"
                            sx={{ my: "1rem" }}
                            fullWidth
                        >
                            Binance
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ my: "1rem" }}
                            fullWidth
                        >
                            Metamask
                        </Button>
                    </Box> */}

                    {/* <Divider sx={{ my: "2rem" }}></Divider> */}

                    {/* <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                        Sign in with your Wallet details
                    </Typography> */}
                    <form onSubmit={onSubmit}>
                        <Box sx={{ mt: "10px" }}>
                            <TextField
                                sx={{ mb: "10px" }}
                                fullWidth
                                id="walletAddress"
                                label="Your wallet address"
                                variant="filled"
                                value={formData.walletAddress}
                                required
                                onChange={onChange}
                            />
                            <TextField
                                fullWidth
                                id="password"
                                label="Your Password"
                                helperText="Your crypto wallet will be imported to UC by
                                default."
                                value={formData.password}
                                type={"password"}
                                variant="filled"
                                required
                                onChange={onChange}
                            />
                        </Box>
                        <small>
                            
                        </small>
                        <Box sx={{ mt: "1.5rem" }}>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    p: "0.3rem 0.6rem",
                                }}
                                endIcon={<ChevronRightIcon />}
                            >
                                Login
                            </Button>
                        </Box>
                    </form>
                </Card>
            </Box>
        </>
    );
};

export default SignIn;
