import {
    Button,
    Card,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { setHereFor, setUpi, updateUserState, setwhoAmI } from "../../slices/authSlice";
import { userStateEnum } from "../../types";
import { useDispatch } from "react-redux";

const FirstTing = () => {
    const [lendOrBorrow, setLendOrBorrow] = useState("borrow");
    const [upi, setUpiLocal] = useState("pk@gpay");
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const onSubmit = (e: any) => {
        console.log("submit")
        e.preventDefault();
        dispatch(setUpi(upi));
        dispatch(setHereFor(lendOrBorrow));
        dispatch(setwhoAmI(lendOrBorrow === "lend" ? "lending" : "borrowing"));
        dispatch(updateUserState(userStateEnum.FIRST_THING));
        navigate(`/${lendOrBorrow}`);
    };

    const handleChange = (e: any) => {
        setUpiLocal(e.target.value)
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
                    First things first?
                </Typography>
                <form onSubmit={onSubmit}>
                    <FormControl>
                        <FormLabel id="lend-or-borrow" sx={{ mb: "1rem" }}>
                            On UC, you want to —
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="lend-or-borrow"
                            name="radio-buttons-group"
                            value={lendOrBorrow}
                            onChange={(e) => setLendOrBorrow(e.target.value)}
                        >
                            <FormControlLabel
                                value="borrow"
                                control={<Radio />}
                                label="Borrow"
                            />
                            <FormControlLabel
                                value="lend"
                                control={<Radio />}
                                label="Lend"
                            />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        sx={{ width: "70%", my: "4rem" }}
                        id="upi"
                        label="Your UPI VPA"
                        defaultValue={upi}
                        helperText="This is where you will be paid in INR"
                        variant="filled"
                        onChange={handleChange}
                        required
                    />

                    <Box>
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
                            Next
                        </Button>
                    </Box>
                </form>
            </Card>
        </Box>
    );
};

export default FirstTing;
