import { Card, Typography, Button } from "@mui/material";
import { HashLink as Link } from "react-router-hash-link";
import { Box } from "@mui/system";
import ActiveContract from "../ActiveContract";
import RepaymentComplete from "../RepaymentComplete/index.jsx";
import TalkJS from "../TalkJS";

const Chatbox = ({ status, amount, updateStatus }: { status: string; amount: number, updateStatus: any }) => {
    console.log(status, amount)
    return (
        <Card
            raised
            sx={{ borderRadius: "8px", position: "sticky", top: "100px" }}
        >
            <Box sx={{ height: "60px", background: "#9E7D8B", color: "white" }}>
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: "700",
                        fontSize: "20px",
                        p: "1rem",
                        textAlign: "center",
                    }}
                >
                    Negotiation chat
                </Typography>
            </Box>

            {/* Conditionally show message and button to input final offer */}
            {["engaged"].includes(
                status
            ) && (
                <Box
                    sx={{
                        background: "#DAC6CE",
                        p: "1rem",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "300",
                            fontSize: "14px",
                            width: "55%",
                        }}
                    >
                        After negotiation on chat, register your final offer
                    </Typography>
                    <Link to="#">
                        <Button
                            variant="contained"
                            sx={{
                                marginLeft: "1rem",
                                fontFamily: "Manrope",
                            }}
                        >
                            FINAL OFFER &gt;
                        </Button>
                    </Link>
                </Box>
            )}

            {/* Chat goes here */}

            {["borrower_paid", "lender_paid", "final", "engaged"].includes(
                status
            ) && <TalkJS />}

            {["deal_done", "borrower_repaid"].includes(status) && <ActiveContract status={status} amount={amount} updateStatus={updateStatus}/>}
            

            {["finished"].includes(status) && <RepaymentComplete amount={amount}/>}
        </Card>
    );
};

export default Chatbox;
