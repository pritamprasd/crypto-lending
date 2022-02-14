import {
    Button,
    Card,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import TimerIcon from "@mui/icons-material/Timer";
import MainContainer from "../../components/MainContainer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import Piechart from "../../components/Piechart";
import Offer from "../../components/Offer";
import { useDispatch, useSelector } from "react-redux";
import { engageNegotiation } from "../../services";
import { setInitialOffer, setSelectedBorrower } from "../../slices/lenderSlice";

const LenderDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navigateUrl = (url) => {
        navigate(url);
    };
    const selectedBorrower = useSelector(
        (state) => state.lenders.selectedBorrower
    );

    const onClick = async () => {
        const data = await engageNegotiation(selectedBorrower.negotiation_id);
        if (data.status === 200) {
            dispatch(
                setSelectedBorrower({
                    ...selectedBorrower,
                    ...data.data,
                })
            );
            dispatch(
                setInitialOffer({
                    tenure: selectedBorrower.tenure,
                    interest: selectedBorrower.interest,
                    amount: selectedBorrower.amount,
                })
            );
        }
        navigateUrl(`/lending/negotiation/${selectedBorrower.negotiation_id}`);
    };

    return (
        <MainContainer>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    mb: "18px",
                }}
            >
                <ChevronLeftIcon sx={{ fontWeight: "500", fontSize: "28px" }} />
                <Typography
                    onClick={() => navigateUrl("/lending")}
                    variant="h3"
                    sx={{ fontWeight: "500", fontSize: "28px" }}
                >
                    View offer
                </Typography>
            </Box>
            <Card
                sx={{
                    padding: "1.4rem",
                    background:
                        "linear-gradient(180deg, #FDF4E3 0%, #FFFFFF 100%)",
                }}
            >
                <Box sx={{ flex: "1" }}>
                    <Typography
                        variant="subtitle2"
                        sx={{ fontSize: "18px", fontWeight: "700", mb: "20px" }}
                    >
                        {selectedBorrower?.negotiation_id}
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
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Piechart />
                </Box>

                <Divider
                    sx={{
                        my: "1.6rem",
                        background: "primary.main",
                        color: "primary.main",
                    }}
                />

                <Box sx={{ mb: "1.5rem" }}>
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
                        tenure={selectedBorrower.tenure}
                        interest={selectedBorrower.interest}
                        amount={selectedBorrower.amount}
                    />
                </Box>

                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            mb: "11px",
                        }}
                    >
                        <TimerIcon sx={{ color: "primary.main" }} />
                        <Typography>
                            You will get 15 minutes to complete the deal
                        </Typography>
                    </Box>
                    <FormControl>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked name="gilad" />}
                                label="I am aware that I am completely responsible for negotiation during the deal"
                            />
                        </FormGroup>
                    </FormControl>
                </Box>

                <Box>
                    <Button
                        onClick={onClick}
                        variant="contained"
                        type="submit"
                        sx={{
                            mt: "1rem",
                            fontWeight: "400",
                            fontSize: "14px",
                        }}
                        endIcon={<ChevronRightIcon />}
                    >
                        START NEGOTIATion
                    </Button>
                </Box>
            </Card>
        </MainContainer>
    );
};

export default LenderDetails;
