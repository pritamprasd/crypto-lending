import { Box } from "@mui/system";
import NoBorrowerOrLender from "../../components/NoBorrowerOrLender";
import MainContainer from "../../components/MainContainer";
import BrowseCard from "../../components/BrowseCard";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getNegotiation } from "../../services";
import BrowseNegotiation from "../../components/BrowseNegotiations";

const Lenders = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        setTimeout(async () => {
            const data = await getNegotiation();
            setData(data.data);
        }, 0);
        const timer = setInterval(async () => {
            const data = await getNegotiation();
            setData(data.data);
        }, 8000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <MainContainer>
            <Box>
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: "200",
                        fontSize: "2rem",
                        textAlign: "center",
                    }}
                >
                    Welcome to UC!
                </Typography>
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: "500",
                        fontSize: "28px",
                        mt: "12px",
                        mb: "21px",
                    }}
                >
                    Browse Borrowers
                </Typography>
            </Box>

            {data.map((lender) => (
                <BrowseNegotiation key={lender.ad_id} {...lender} />
            ))}

            {!data.length && (
                <>
                    <NoBorrowerOrLender forText="borrowers" />
                </>
            )}
        </MainContainer>
    );
};

export default Lenders;
