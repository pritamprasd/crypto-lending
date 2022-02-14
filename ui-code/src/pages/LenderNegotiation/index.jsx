import {
    Button,
    Card,
    Checkbox,
    Divider,
    FilledInput,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputAdornment,
    InputLabel,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import TimerIcon from "@mui/icons-material/Timer";
import MainContainer from "../../components/MainContainer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import Offer from "../../components/Offer";
import Chatbox from "../../components/Chatbox";
import ErrorIcon from "@mui/icons-material/Error";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    finalOffer,
    getNegotiation,
    lenderpays,
    loanpaid,
} from "../../services";
import { setSelectedBorrower } from "../../slices/lenderSlice";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const LenderDetails = () => {
    const dispatch = useDispatch();
    const { selectedBorrower, initialOffer } = useSelector(
        (state) => state.lenders
    );
    const [formData, setFormData] = useState({});
    console.log("selectedBorrower", selectedBorrower);
    const navigate = useNavigate();
    const navigateUrl = () => {
        navigate("/borrowing/negotiation/12345");
    };

    const onChange = (e) => {
        const name = e.target.id;
        const value = e.target.value;
        setFormData({ ...formData, [name]: +value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await finalOffer(
            selectedBorrower.negotiation_id,
            formData
        );
        if (data.status === 200) {
            dispatch(
                setSelectedBorrower({
                    ...selectedBorrower,
                    ...data.data,
                })
            );
            // navigateUrl(
            //     `/borrowing/negotiation/${selectedBorrower.negotiation_id}`
            // );
        }
    };

    const handleTransfer = async () => {
        const data = await loanpaid(selectedBorrower.negotiation_id);
        if (data.status === 200) {
            dispatch(
                setSelectedBorrower({
                    ...selectedBorrower,
                    ...data.data,
                })
            );
        }
    };

    const actualAmountDisbursed = (amount, interest) => {
        if (amount && interest) {
            return amount - amount * (interest / 100);
        } else return "";
    };

    useEffect(() => {
        let timer;
        timer = setInterval(async () => {
            const data = await getNegotiation();
            const final = data.data.filter(
                (nego) =>
                    nego.negotiation_id === selectedBorrower.negotiation_id
            );
            if (final.length) {
                const finalData = final[0];

                dispatch(
                    setSelectedBorrower({ ...selectedBorrower, ...finalData })
                );
            }
        }, 8000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const updateStatus = async () => {
        const data = await lenderpays(selectedBorrower.negotiation_id);
        if (data.status === 200) {
            dispatch(
                setSelectedBorrower({
                    ...selectedBorrower,
                    ...data.data,
                })
            );
        }
    };

    return (
        <MainContainer>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ flex: 1 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                            mb: "18px",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{ fontWeight: "500", fontSize: "28px" }}
                            >
                                {[
                                    "pending",
                                    "engaged",
                                    "pending",
                                    "final",
                                ].includes(selectedBorrower.state) &&
                                    "Negotiation"}
                                {["borrower_paid", "lender_paid"].includes(
                                    selectedBorrower.state
                                ) && "Disbursal amount transfer"}
                                {["deal_done"].includes(
                                    selectedBorrower.state
                                ) && "Complete"}
                                {["borrower_repaid", "finished"].includes(
                                    selectedBorrower.state
                                ) && "Loan Details"}
                            </Typography>
                            <Button variant="outlined">Need Help</Button>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                            }}
                        >
                            <TimerIcon sx={{ color: "primary.main" }} />
                            <Typography>14:45 left</Typography>
                        </Box>
                    </Box>
                    <Card
                        sx={{
                            padding: "1.4rem",
                            background:
                                "linear-gradient(180deg, #FDF4E3 0%, #FFFFFF 100%)",
                        }}
                    >
                        <Box sx={{ flex: "1" }}>
                            <Box sx={{ flex: "1" }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        mb: "20px",
                                    }}
                                >
                                    {selectedBorrower?.negotiation_id}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider
                            sx={{
                                my: "1.6rem",
                                background: "primary.main",
                                color: "primary.main",
                            }}
                        />
                        {[
                            "borrower_paid",
                            "lender_paid",
                            "deal_done",
                            "borrower_repaid",
                            "finished",
                        ].includes(selectedBorrower?.state) && (
                            <>
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: "18px",
                                            fontWeight: "700",
                                            mb: "18px",
                                        }}
                                    >
                                        {"Deal"}
                                    </Typography>
                                    <Offer
                                        tenure={selectedBorrower?.tenure}
                                        interest={selectedBorrower?.interest}
                                        amount={selectedBorrower?.amount}
                                    />
                                </Box>
                                <Divider
                                    sx={{
                                        my: "1.6rem",
                                        background: "primary.main",
                                        color: "primary.main",
                                    }}
                                />
                            </>
                        )}
                        {["pending", "engaged", "pending", "final"].includes(
                            selectedBorrower?.state
                        ) && (
                            <>
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: "18px",
                                            fontWeight: "700",
                                            mb: "18px",
                                        }}
                                    >
                                        {"Initial offer"}
                                    </Typography>
                                    <Offer
                                        tenure={initialOffer?.tenure}
                                        interest={initialOffer?.interest}
                                        amount={initialOffer?.amount}
                                    />
                                </Box>
                                <Divider
                                    sx={{
                                        my: "1.6rem",
                                        background: "primary.main",
                                        color: "primary.main",
                                    }}
                                />
                            </>
                        )}

                        {selectedBorrower.state === "engaged" && (
                            <>
                                <form onSubmit={onSubmit}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: "18px",
                                            fontWeight: "700",
                                            mb: "18px",
                                        }}
                                    >
                                        {"Final offer"}
                                    </Typography>
                                    <FormControl
                                        variant="filled"
                                        sx={{ width: "44%", mr: "2rem" }}
                                    >
                                        <InputLabel htmlFor="loanAmount">
                                            Loan amount in INR
                                        </InputLabel>
                                        <FilledInput
                                            onChange={onChange}
                                            id="amount"
                                            value={formData.amount || ""}
                                            type="number"
                                            required
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    ₹
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    <FormControl
                                        variant="filled"
                                        sx={{ width: "44%", mb: "1.5rem" }}
                                    >
                                        <InputLabel htmlFor="tenure">
                                            Tenure in Seconds
                                        </InputLabel>
                                        <FilledInput
                                            id="tenure"
                                            value={formData.tenure || ""}
                                            type="number"
                                            onChange={onChange}
                                            required
                                        />
                                    </FormControl>
                                    <FormControl
                                        variant="filled"
                                        sx={{ width: "44%" }}
                                    >
                                        <InputLabel htmlFor="interest">
                                            Interest rate ( For Entire Loan
                                            Tenure )
                                        </InputLabel>
                                        <FilledInput
                                            id="interest"
                                            value={formData.interest || ""}
                                            type="number"
                                            onChange={onChange}
                                            required
                                        />
                                    </FormControl>

                                    {selectedBorrower.state === "pending" && (
                                        <Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "6px",
                                                    mb: "11px",
                                                }}
                                            >
                                                <TimerIcon
                                                    sx={{
                                                        color: "primary.main",
                                                    }}
                                                />
                                                <Typography>
                                                    You will get 15 minutes to
                                                    complete the deal
                                                </Typography>
                                            </Box>
                                            <FormControl>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked
                                                                name="gilad"
                                                            />
                                                        }
                                                        label="I am aware that I am completely responsible for negotiation during the deal"
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                        </Box>
                                    )}

                                    <Typography
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            my: "16px",
                                        }}
                                    >
                                        <ErrorIcon
                                            sx={{ color: "primary.main" }}
                                        />
                                        Actual disbursal amount is ₹{" "}
                                        {actualAmountDisbursed(
                                            formData.amount,
                                            formData.interest
                                        )}{" "}
                                        (Loan amount - interest)
                                    </Typography>

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
                                            Register final offer
                                        </Button>
                                    </Box>
                                </form>
                            </>
                        )}

                        {selectedBorrower.state === "final" && (
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        mb: "18px",
                                    }}
                                >
                                    {"Final offer"}
                                </Typography>
                                <Offer
                                    tenure={selectedBorrower.tenure}
                                    interest={selectedBorrower.interest}
                                    amount={selectedBorrower.amount}
                                />

                                <Typography
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        my: "16px",
                                    }}
                                >
                                    <ErrorIcon sx={{ color: "primary.main" }} />
                                    Actual disbursal amount is ₹{" "}
                                    {actualAmountDisbursed(
                                        selectedBorrower.amount,
                                        selectedBorrower.interest
                                    )}{" "}
                                    (Loan amount - interest)
                                </Typography>
                                <Divider
                                    sx={{
                                        my: "1.6rem",
                                        background: "primary.main",
                                        color: "primary.main",
                                    }}
                                />
                                <Typography
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        my: "8px",
                                        color: "#F4A12D",
                                    }}
                                >
                                    <HourglassEmptyIcon />
                                    Waiting for borrower confirmation
                                </Typography>
                            </Box>
                        )}

                        {selectedBorrower &&
                            selectedBorrower.state === "borrower_paid" && (
                                <Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: "18px",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {"Crypto collateral token transfer"}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                my: "8px",
                                            }}
                                        >
                                            <DoneIcon />
                                            Complete
                                        </Typography>
                                    </Box>
                                    <Divider
                                        sx={{
                                            my: "1.6rem",
                                            background: "primary.main",
                                            color: "primary.main",
                                        }}
                                    />
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: "18px",
                                            fontWeight: "700",
                                            mb: "18px",
                                        }}
                                    >
                                        {"Disbursal amount transfer"}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            my: "16px",
                                        }}
                                    >
                                        <ErrorIcon
                                            sx={{ color: "primary.main" }}
                                        />
                                        Transfer ₹{" "}
                                        {actualAmountDisbursed(
                                            selectedBorrower.amount,
                                            selectedBorrower.interest
                                        )}{" "}
                                        to UPI VPA —{" "}
                                        <strong>rohit@okaxis </strong>
                                    </Typography>
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
                                            onClick={handleTransfer}
                                        >
                                            ₹{" "}
                                            {actualAmountDisbursed(
                                                selectedBorrower.amount,
                                                selectedBorrower.interest
                                            )}{" "}
                                            transferred
                                        </Button>
                                    </Box>
                                </Box>
                            )}

                        {selectedBorrower &&
                            selectedBorrower.state === "lender_paid" && (
                                <Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: "18px",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {"Crypto collateral token transfer"}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                my: "8px",
                                            }}
                                        >
                                            <DoneIcon />
                                            Complete
                                        </Typography>
                                    </Box>
                                    <Divider
                                        sx={{
                                            my: "1.6rem",
                                            background: "primary.main",
                                            color: "primary.main",
                                        }}
                                    />
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: "18px",
                                            fontWeight: "700",
                                            mb: "18px",
                                        }}
                                    >
                                        {"Disbursal amount transfer"}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            my: "8px",
                                            color: "#F4A12D",
                                        }}
                                    >
                                        <HourglassEmptyIcon
                                            sx={{ color: "primary.main" }}
                                        />
                                        Waiting for borrower to confirm credit
                                        of ₹{" "}
                                        {actualAmountDisbursed(
                                            selectedBorrower.amount,
                                            selectedBorrower.interest
                                        )}
                                    </Typography>
                                </Box>
                            )}
                        {selectedBorrower &&
                            (selectedBorrower.state === "finished" ||
                                selectedBorrower.state === "deal_done" ||
                                selectedBorrower.state ===
                                    "borrower_repaid") && (
                                <Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: "18px",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {"Crypto collateral token transfer"}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                my: "8px",
                                            }}
                                        >
                                            <DoneIcon />
                                            Complete
                                        </Typography>
                                    </Box>
                                    <Divider
                                        sx={{
                                            my: "1.6rem",
                                            background: "primary.main",
                                            color: "primary.main",
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: "18px",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {"Disbursal amount transfer"}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                my: "8px",
                                            }}
                                        >
                                            <DoneIcon />
                                            Complete
                                        </Typography>
                                    </Box>
                                    <Divider
                                        sx={{
                                            my: "1.6rem",
                                            background: "primary.main",
                                            color: "primary.main",
                                        }}
                                    />
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            mt: "1rem",
                                            fontSize: "24px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        {"Deal complete! 🎉"}
                                    </Typography>

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
                                        Check Status
                                    </Button>
                                </Box>
                            )}
                    </Card>
                </Box>
                <Box sx={{ width: "360px", mx: "18px" }}>
                    <Chatbox
                        amount={selectedBorrower.amount}
                        status={selectedBorrower.state}
                        onClick={updateStatus}
                    />
                </Box>
            </Box>
        </MainContainer>
    );
};

export default LenderDetails;
