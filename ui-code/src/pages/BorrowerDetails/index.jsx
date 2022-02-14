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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { negotiation } from "../../services";
import { setInitialOffer } from "../../slices/borrowerSlice";

const BorrowerDetails = () => {
    const dispatch = useDispatch();
    const selectedLender = useSelector(
        (state) => state.borrowers.selectedLender
    );

    const [formData, setFormData] = useState({
        lenderId: selectedLender.creator_id,
        collateralAmount: 20,
        collateralCurrency: "MATIC",
    });

    const onChange = (e) => {
        const name = e.target.id;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value });
    };
    const navigate = useNavigate();
    const navigateUrl = (url) => {
        navigate(url);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await negotiation(formData);
        
        if (data.status === 200) {
            dispatch(
                setInitialOffer({...data.data})
            );
            navigateUrl(`/borrowing/negotiation/${selectedLender.ad_id}`);
        }
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
                    onClick={() => navigateUrl("/borrowing")}
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
                        "linear-gradient(180deg, #F6E7EB 0%, #FFFFFF 100%)",
                }}
            >
                <Box sx={{ flex: "1" }}>
                    <Typography
                        variant="subtitle2"
                        sx={{ fontSize: "18px", fontWeight: "700", mb: "20px" }}
                    >
                        {selectedLender?.creator_id}
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
                            {selectedLender?.min_amount +
                                " - " +
                                selectedLender?.max_amount}
                        </Typography>
                        <Typography variant="body1">
                            <strong>% </strong>
                            {selectedLender?.min_interest_rate +
                                " - " +
                                selectedLender?.max_interest_rate}
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
                                selectedLender?.min_tenure_sec +
                                " - " +
                                selectedLender?.max_tenure_sec}{" "}
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

                <form onSubmit={onSubmit}>
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
                        />
                    </FormControl>
                    <FormControl variant="filled" sx={{ width: "44%" }}>
                        <InputLabel htmlFor="interest">
                            Interest rate ( For Entire Loan Tenure )
                        </InputLabel>
                        <FilledInput
                            id="interest"
                            value={formData.interest || ""}
                            type="number"
                            onChange={onChange}
                        />
                    </FormControl>

                    <Divider
                        sx={{
                            my: "1.6rem",
                            background: "primary.main",
                            color: "primary.main",
                        }}
                    />

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
                </form>
            </Card>
        </MainContainer>
    );
};

export default BorrowerDetails;
