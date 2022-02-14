import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import BrowseCard from "../../components/BrowseCard";
import MainContainer from "../../components/MainContainer";
import NoBorrowerOrLender from "../../components/NoBorrowerOrLender";
import { getLendersAd } from "../../services";

const Borrowers = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        setTimeout(async () => {
            const data = await getLendersAd();
            setData(data.data);
        }, 0);
        const timer = setInterval(async () => {
            const data = await getLendersAd();
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
                    Browse Lenders
                </Typography>
            </Box>

            {data.map((lender) => (
                <BrowseCard key={lender.ad_id} {...lender} />
            ))}

            {!data.length && (
                <>
                    <NoBorrowerOrLender forText="lenders" />
                </>
            )}
        </MainContainer>
    );
};

export default Borrowers;
