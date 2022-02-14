import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBorrower } from "../../slices/lenderSlice";
import { setSelectedLender } from "../../slices/borrowerSlice";

const BrowseNegotiation = ({
    negotiation_id,
    lender_id,
    borrower_id,
    amount,
    interest,
    currency,
    tenure,
    collateral_amount,
    collateral_currency,
    collateral_txn_hash,
    state,
    active_loan_id,
    ad_id,
}) => {
    const dispatch = useDispatch();
    const whoAmI = useSelector((state) => state.auth.whoAmI);
    const bgColor = () => (whoAmI === "lending" ? "#FDF4E3" : "#F6E7EB");
    const navigate = useNavigate();
    const handleClick = () => {
        let toBeUsedDispatch =
            whoAmI === "lending" ? setSelectedBorrower : setSelectedLender;
        dispatch(
            toBeUsedDispatch({
                negotiation_id,
                lender_id,
                borrower_id,
                amount,
                interest,
                currency,
                tenure,
                collateral_amount,
                collateral_currency,
                collateral_txn_hash,
                state,
                active_loan_id,
                ad_id,
            })
        );
        navigate(`/${whoAmI}/${negotiation_id}`);
    };

    return (
        <Card
            onClick={handleClick}
            sx={{
                background: bgColor(),
                display: "flex",
                p: "1.5rem 0.8rem 1.5rem 1.4rem",
                mt: "8px",
                alignItems: "center",
                "&:hover": {
                    cursor: "pointer",
                    boxShadow: "0 0 11px #02020233",
                },
            }}
        >
            <Box sx={{ flex: "1" }}>
                <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "18px", fontWeight: "700" }}
                >
                    {negotiation_id}
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
                        {amount}
                    </Typography>
                    <Typography variant="body1">
                        <strong>% </strong>
                        {interest}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <AccessTimeIcon
                            sx={{ height: "20px", width: "20px" }}
                        />
                        {tenure} seconds
                    </Typography>
                    
                </Box>
            </Box>

            <Box sx={{ flex: "0.1" }}>
                <ArrowForwardIosIcon />
            </Box>
        </Card>
    );
};

export default BrowseNegotiation;
