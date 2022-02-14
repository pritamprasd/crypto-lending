import {
    Box,
    Button,
    Card,
    FilledInput,
    FormControl,
    InputAdornment,
    InputLabel,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch } from "react-redux";
import { updateUserState } from "../../slices/authSlice";
import { userStateEnum } from "../../types";
import { postBorrowAd } from "../../services";
import { useState } from "react";

const Borrow = () => {
    const [formData, setFormData] = useState({
        minAmount: 100,
        maxAmount: 1000,
        minTenure: 3600,
        maxTenure: 3600000,
        minInterest: 5,
        maxInterest: 10,
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async (e: any) => {
        e.preventDefault();
        await postBorrowAd(formData);
        dispatch(updateUserState(userStateEnum.BORROW));
        navigate(`/borrowing`);
    };

    const skip = () => {
        navigate(`/borrowing`);
    }

    const onChange = (e: any) => {
        const name = e.target.id;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value });
    };

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
                        mb: "10px",
                        fontWeight: 500,
                    }}
                >
                    Borrow on your terms, not ours!
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontSize: "16px",
                        mb: "3.5rem",
                        fontWeight: 400,
                    }}
                >
                    Negotiate actual terms before closing a deal—these are
                    ranges
                </Typography>

                <form onSubmit={onSubmit}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: "16px",
                            mb: "10px",
                            fontWeight: 400,
                        }}
                    >
                        How much <strong>amount</strong> do you want to borrow?
                    </Typography>
                    <Box sx={{ mb: "3rem" }}>
                        <FormControl
                            variant="filled"
                            sx={{ width: "44%", mr: "2rem" }}
                        >
                            <InputLabel htmlFor="minAmount">
                                Minimum Amount
                            </InputLabel>
                            <FilledInput
                                onChange={onChange}
                                id="minAmount"
                                value={formData.minAmount}
                                type="number"
                                startAdornment={
                                    <InputAdornment position="start">
                                        ₹
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl variant="filled" sx={{ width: "44%" }}>
                            <InputLabel htmlFor="maxAmount">
                                Maximum Amount
                            </InputLabel>
                            <FilledInput
                                onChange={onChange}
                                id="maxAmount"
                                value={formData.maxAmount}
                                type="number"
                                startAdornment={
                                    <InputAdornment position="start">
                                        ₹
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ mb: "3rem" }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontSize: "16px",
                                mb: "10px",
                                fontWeight: 400,
                            }}
                        >
                            How <strong>long</strong> do you want to borrow for?
                        </Typography>
                        <FormControl
                            variant="filled"
                            sx={{ width: "44%", mr: "2rem" }}
                        >
                            <InputLabel htmlFor="minTenure">
                                Min tenure in seconds
                            </InputLabel>
                            <FilledInput
                                onChange={onChange}
                                id="minTenure"
                                value={formData.minTenure}
                                type="number"
                            />
                        </FormControl>
                        <FormControl variant="filled" sx={{ width: "44%" }}>
                            <InputLabel htmlFor="maxTenure">
                                Max Tenure in secoonds
                            </InputLabel>
                            <FilledInput
                                onChange={onChange}
                                id="maxTenure"
                                type="number"
                                value={formData.maxTenure}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ mb: "3rem" }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontSize: "16px",
                                mb: "10px",
                                fontWeight: 400,
                            }}
                        >
                            What <strong>interest</strong> rate can you pay?
                        </Typography>
                        <FormControl
                            variant="filled"
                            sx={{ width: "44%", mr: "2rem" }}
                        >
                            <InputLabel htmlFor="minInterset">
                                Min Interest rate  ( For Entire Loan Tenure )
                            </InputLabel>
                            <FilledInput
                                onChange={onChange}
                                type="number"
                                id="minInterset"
                                value={formData.minInterest}
                            />
                        </FormControl>
                        <FormControl variant="filled" sx={{ width: "44%" }}>
                            <InputLabel htmlFor="maxInterset">
                                Max Interest rate  ( For Entire Loan Tenure )
                            </InputLabel>
                            <FilledInput
                                onChange={onChange}
                                id="maxInterset"
                                type="number"
                                value={formData.maxInterest}
                                required
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <Button
                            variant="outlined"
                            sx={{
                                mt: "1rem",
                                fontWeight: "400",
                                fontSize: "14px",
                                mr: "8px",
                            }}
                            endIcon={<ChevronRightIcon />}
                            onClick={skip}
                        >
                            Skip
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                mt: "1rem",
                                fontWeight: "400",
                                fontSize: "14px",
                            }}
                            endIcon={<ChevronRightIcon />}
                        >
                            Finish
                        </Button>
                    </Box>
                </form>
            </Card>
        </Box>
    );
};

export default Borrow;
