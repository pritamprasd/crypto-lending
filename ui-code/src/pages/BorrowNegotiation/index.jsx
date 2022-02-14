import { Button, Card, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TimerIcon from "@mui/icons-material/Timer";
import MainContainer from "../../components/MainContainer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Offer from "../../components/Offer";
import Chatbox from "../../components/Chatbox";
import ErrorIcon from "@mui/icons-material/Error";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    acceptOffer,
    borrowerpays,
    getNegotiation,
    loanreceived,
} from "../../services";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const BorrowerDetails = () => {
    const dispatch = useDispatch();
    const { initialOffer, selectedLender } = useSelector(
        (state) => state.borrowers
    );

    const handleConfirm = async () => {
        const data = await acceptOffer(initialOffer.negotiation_id);
        if (data.status === 200 && data.data.negotiation_id) {
            setFinalData(...data.data);
        }
    };

    const acceptTransfer = async () => {
        const data = await loanreceived(initialOffer.negotiation_id);
        if (data.status === 200 && data.data.negotiation_id) {
            setFinalData(...data.data);
        }
    };

    const updateStatus = async () => {
        const data = await borrowerpays(initialOffer.negotiation_id);
        if (data.status === 200 && data.data.negotiation_id) {
            setFinalData(...data.data);
        }
    };

    const [finalData, setFinalData] = useState();
    console.log("data", finalData);
    useEffect(() => {
        let timer;
        if (finalData && finalData.state === "final") {
            clearInterval(timer);
        } else {
            setTimeout(async () => {
                const data = await getNegotiation();
                const final = data.data.filter(
                    (nego) =>
                        nego.negotiation_id === initialOffer.negotiation_id
                );
                setFinalData(final.pop());
            }, 0);
            timer = setInterval(async () => {
                const data = await getNegotiation();
                const final = data.data.filter(
                    (nego) =>
                        nego.negotiation_id === initialOffer.negotiation_id
                );
                setFinalData(final.pop());
            }, 8000);
        }
        return () => {
            clearInterval(timer);
        };
    }, []);

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
                                ].includes(finalData?.state) && "Negotiation"}
                                {["borrower_paid", "lender_paid"].includes(
                                    finalData?.state
                                ) && "Disbursal amount transfer"}
                                {["deal_done"].includes(finalData?.state) &&
                                    "Complete"}
                                {["borrower_repaid", "finished"].includes(
                                    finalData?.state
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
                                "linear-gradient(180deg, #F6E7EB 0%, #FFFFFF 100%)",
                        }}
                    >
                        <Box sx={{ flex: "1" }}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    mb: "20px",
                                }}
                            >
                                {selectedLender.creator_id}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "30px",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="body1">
                                    <strong>₹ </strong>
                                    {selectedLender.min_amount +
                                        " - " +
                                        selectedLender.max_amount}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>% </strong>
                                    {selectedLender.min_interest_rate +
                                        " - " +
                                        selectedLender.max_interest_rate}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <AccessTimeIcon
                                        sx={{
                                            height: "20px",
                                            width: "20px",
                                            mr: "4px",
                                        }}
                                    />
                                    {" " +
                                        selectedLender.min_tenure_sec +
                                        " - " +
                                        selectedLender.max_tenure_sec}{" "}
                                    seconds
                                </Typography>
                                {"dsf" && (
                                    <Typography
                                        sx={{
                                            px: "8px",
                                            background: "#21212114",
                                            borderRadius: "13px",
                                            width: "fit-content",
                                        }}
                                    >
                                        {"90% loan disbursal rate (9/10)"}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        <Divider
                            sx={{
                                my: "1.6rem",
                                background: "primary.main",
                                color: "primary.main",
                            }}
                        />
                        {finalData &&
                            ["pending", "engaged", "pending", "final"].includes(
                                finalData.state
                            ) && (
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: "18px",
                                            fontWeight: "700",
                                            mb: "18px",
                                        }}
                                    >
                                        {"Initial Offer"}
                                    </Typography>
                                    <Offer
                                        tenure={initialOffer?.tenure}
                                        interest={initialOffer?.interest}
                                        amount={initialOffer?.amount}
                                    />
                                </Box>
                            )}
                        {finalData &&
                            [
                                "borrower_paid",
                                "lender_paid",
                                "deal_done",
                                "borrower_repaid",
                                "finished",
                            ].includes(finalData.state) && (
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
                                        tenure={finalData.tenure}
                                        interest={finalData.interest}
                                        amount={finalData.amount}
                                    />
                                </Box>
                            )}
                        <Divider
                            sx={{
                                my: "1.6rem",
                                background: "primary.main",
                                color: "primary.main",
                            }}
                        />
                        {finalData && finalData.state === "final" ? (
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
                                    tenure={finalData.tenure}
                                    interest={finalData.interest}
                                    amount={finalData.amount}
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
                                    {finalData.amount -
                                        finalData.amount *
                                            (finalData.interest / 100)}{" "}
                                    (Loan amount - interest)
                                </Typography>
                                <Box>
                                    <Button
                                        onClick={handleConfirm}
                                        variant="contained"
                                        type="submit"
                                        sx={{
                                            mt: "1rem",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                        }}
                                        endIcon={<ChevronRightIcon />}
                                    >
                                        CONFIRM FINAL OFFER
                                    </Button>
                                </Box>
                            </Box>
                        ) : null}
                        {finalData &&
                        (finalData.state === "engaged" ||
                            finalData.state === "pending") ? (
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
                                <Typography
                                    sx={{
                                        my: "16px",
                                    }}
                                >
                                    Awaiting decision
                                </Typography>
                            </Box>
                        ) : null}

                        {finalData && finalData.state === "borrower_paid" && (
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
                        )}

                        {finalData && finalData.state === "borrower_paid" && (
                            <Box>
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
                                    }}
                                >
                                    <HourglassEmptyIcon
                                        sx={{ color: "primary.main" }}
                                    />
                                    Waiting for lender to transfer disbursal
                                    amount to your UPI VPA — rohit@okaxis
                                </Typography>
                            </Box>
                        )}

                        {finalData && finalData.state === "lender_paid" && (
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
                                    <ErrorIcon sx={{ color: "primary.main" }} />
                                    Transfer ₹{" "}
                                    {finalData.amount -
                                        finalData.amount *
                                            (finalData.interest / 100)}{" "}
                                    to UPI VPA — <strong>rohit@okaxis </strong>
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
                                        onClick={acceptTransfer}
                                    >
                                        ₹{" "}
                                        {finalData.amount -
                                            finalData.amount *
                                                (finalData.interest / 100)}{" "}
                                        recieved
                                    </Button>
                                </Box>
                            </Box>
                        )}
                        {finalData &&
                            (finalData.state === "finished" ||
                                finalData.state === "deal_done" ||
                                finalData.state === "borrower_repaid") && (
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
                <Box sx={{ width: "360px", ml: "18px" }}>
                    <Chatbox
                        amount={finalData?.amount}
                        status={finalData?.state}
                        updateStatus={updateStatus}
                    />
                </Box>
            </Box>
        </MainContainer>
    );
};

export default BorrowerDetails;
