import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface offerType {
    amount: number,
    tenure: number,
    interest: number
}

const Offer = ({amount, interest, tenure}: offerType) => {
    return (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "1rem" }}>
            <Divider orientation="vertical" flexItem sx={{ border: "2px solid #662200", borderRadius: "4px"}}/>
            <Box>
                <Typography sx={{color: "primary.main", mb: "12px", fontSize: "14px", fontWeight: "400"}}>Loan amount in INR</Typography>
                <Typography sx={{ fontSize: "18px", fontWeight: "500"}}>₹ {amount}</Typography>
            </Box>
            <Box>
                <Typography sx={{color: "primary.main", mb: "12px", fontSize: "14px", fontWeight: "400"}}>Tenure in seconds</Typography>
                <Typography sx={{ fontSize: "18px", fontWeight: "500"}}>{tenure} seconds</Typography>
            </Box>
            <Box>
                <Typography sx={{color: "primary.main", mb: "12px", fontSize: "14px", fontWeight: "400"}}>Interest rate  ( For Entire Loan Tenure )</Typography>
                <Typography sx={{ fontSize: "18px", fontWeight: "500"}}>{interest} %</Typography>
            </Box>
        </Box>
    );
};

export default Offer;
