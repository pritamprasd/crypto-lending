import { Button, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const RepaymentComplete = ({amount}) => {
    return (
        <Box>
            <Box sx={{ height: "480px" }}>
                <Box>
                    <Box sx={{textAlign: "center", mb: "28px"}}>
                        <Typography
                            align="center"
                            sx={{
                                fontWeight: "500",
                                fontSize: "22px",
                                mt: "2.3rem",
                            }}
                        >
                            Repayment complete
                        </Typography>
                        <CheckCircleOutlineIcon sx={{fontSize: "2rem", fontWeight: "700"}}/>
                    </Box>

                    <Card
                        raised
                        sx={{
                            textAlign: "center",
                            background: "#F6E7EB",
                            width: "90%",
                            px: "1rem",
                            py: "1.5rem",
                            m: "auto",
                        }}
                    >
                        
                        <Box>
                            <Box sx={{mb: "22px"}}>
                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        color: "#9E7D8B",
                                    }}
                                    variant="body2"
                                >
                                    Amount repaid
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ fontWeight: 600, fontSize: "18px" }}
                                >
                                    ₹ {amount}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        color: "#9E7D8B",
                                    }}
                                    variant="body2"
                                >
                                     Repayment date
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ fontWeight: 600, fontSize: "18px" }}
                                >
                                    14 Feb 2022
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                    <Box sx={{ textAlign: "center", mt: "5rem" }}>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                mt: "8px",
                                fontWeight: "500",
                                fontSize: "14px",
                            }}
                            endIcon={<ChevronRightIcon />}
                        >
                            LEND A NEW LOAN
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default RepaymentComplete;
