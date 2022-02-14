import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const MainContainer = (props: any) => {
    return (
        <Box sx={{ width: { sm: "100%", md: "84%", lg: "78%"}, margin: "auto" }}>
            <Box sx={{textAlign: "center", mb: "3rem"}}>
                <Typography sx={{background: "#FAE2B9", color: "black", p: "2px 4px", borderRadius: "0 0 6px 6px"}}>
                    Collateral crypto tokens are protected with smart contracts
                    and always stored in secure escrow wallets of UC
                </Typography>
            </Box>
            {props.children}
        </Box>
    );
};

export default MainContainer;
