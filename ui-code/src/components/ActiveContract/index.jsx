import { Button, Card, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { useDispatch, useSelector } from "react-redux";
import { lenderpays } from "../../services";
import { setSelectedBorrower } from "../../slices/lenderSlice";

const ActiveContract = ({ amount, updateStatus, status }) => {
    const dispatch = useDispatch()
    const hereFor = useSelector((state) => state.auth.hereFor);
    const negotiation = useSelector((state) => state.lenders.selectedBorrower);
    const updateStatusHere = async () => {
        const data = await lenderpays(negotiation.negotiation_id);
        if (data.status === 200) {
            dispatch(
                setSelectedBorrower({
                    ...negotiation,
                    ...data.data,
                })
            );
        }
    };
    return (
        <Box>
            <Box sx={{ height: "600px" }}>
                <Box>
                    <Typography
                        align="center"
                        sx={{ fontWeight: "700", fontSize: "20px", my: "1rem" }}
                    >
                        Smart contract active
                    </Typography>

                    <img
                        src="/clipboard.svg"
                        style={{
                            display: "block",
                            margin: "0px auto -2rem auto",
                        }}
                    />
                    <Card
                        raised
                        sx={{
                            textAlign: "center",
                            background: "#F6E7EB",
                            width: "90%",
                            px: "1rem",
                            py: "3rem",
                            m: "auto",
                            border: "1px solid #9E7D8B",
                        }}
                    >
                        {/* <QueryBuilderIcon sx={{ color: "primary.color" }} /> */}
                        {/* <Typography
                            variant="body1"
                            sx={{ fontWeight: "700", fontSize: "20px" }}
                        >
                            10 minutes left
                        </Typography> */}
                        {/* <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        > */}
                        {/* <Box>
                                <Typography
                                    sx={{
                                        py: "0.5rem",
                                        fontSize: "12px",
                                        color: "#9E7D8B",
                                    }}
                                    variant="body2"
                                >
                                    Start
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ fontWeight: 400, fontSize: "14px" }}
                                >
                                    13 Feb 2022 <br></br> 11:45 AM IST
                                </Typography>
                            </Box>
                            <Box>
                                <EastIcon />
                            </Box>
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        py: "0.5rem",
                                        fontSize: "12px",
                                        color: "#9E7D8B",
                                    }}
                                >
                                    End
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ fontWeight: 400, fontSize: "14px" }}
                                >
                                    14 Feb 2022 <br></br> 11:45 AM IST
                                </Typography>
                            </Box>
                        </Box> */}

                        {/* <Divider sx={{ my: "1rem" }} /> */}

                        <Box sx={{ textAlign: "left" }}>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#9E7D8B",
                                }}
                                variant="body2"
                            >
                                Amount repayed within time?
                            </Typography>
                            <Typography
                                sx={{
                                    pb: "0.5rem",
                                    fontSize: "14px",
                                }}
                                variant="body2"
                            >
                                Collateral crypto transferred back to borrower
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: "left" }}>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#9E7D8B",
                                }}
                                variant="body2"
                            >
                                Amount not repayed within time?
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                }}
                                variant="body2"
                            >
                                Collateral crypto transferred to lender
                            </Typography>
                        </Box>
                    </Card>

                    {status === "borrower_repaid" && hereFor === "lend" && (
                        <Box sx={{ textAlign: "center", mt: "1rem" }}>
                            <Button
                                onClick={updateStatusHere}
                                variant="contained"
                                type="submit"
                                sx={{
                                    mt: "1rem",
                                    fontWeight: "400",
                                    fontSize: "14px",
                                }}
                                endIcon={<ChevronRightIcon />}
                            >
                                CONFIRM ₹ {negotiation?.amount} Recieved
                            </Button>
                        </Box>
                    )}

                    {status === "deal_done" && hereFor === "borrow" && (
                        <Box sx={{ textAlign: "center", mt: "1rem" }}>
                            <Button
                                onClick={updateStatus}
                                variant="contained"
                                type="submit"
                                sx={{
                                    mt: "1rem",
                                    fontWeight: "400",
                                    fontSize: "14px",
                                }}
                                endIcon={<ChevronRightIcon />}
                            >
                                CONFIRM ₹ {amount} PAID
                            </Button>
                        </Box>
                    )}

                    {status === "borrower_repaid" && hereFor === "borrow" && (
                        <>
                            <Box
                                sx={{
                                    textAlign: "center",
                                    my: "16px",
                                }}
                            >
                                <HourglassEmptyIcon
                                    sx={{ color: "primary.main" }}
                                />
                                <Typography>
                                    Waiting for lender to confirm payment
                                </Typography>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ActiveContract;
