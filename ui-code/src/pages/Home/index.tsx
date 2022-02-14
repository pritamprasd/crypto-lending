import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from 'react-router-dom'
import DoneIcon from '@mui/icons-material/Done';
import React from "react";

const Home = () => {

    const [entity, setEntity] = React.useState('borrower');
    return (

        <>
            <Box component="div"
                sx={{
                    margin: "-2rem auto 0rem auto",
                    background:
                        "linear-gradient(180deg, #F6E7EB 0%, #FAE2B9 100%)",
                }}
            >
                <Box
                    sx={{
                        maxWidth: "1024px",
                        margin: "0rem auto",
                        padding: "6rem 0rem",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "end",
                            mb: "4rem"
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: "36px",
                                    marginBottom: "1rem",
                                    fontWeight: "400",
                                    fontFamily: "Manrope",
                                    color: "#662200"
                                }}
                            >
                                Collaterals in Crypto
                            </Typography>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: "48px",
                                    marginBottom: "0.5rem",
                                    fontWeight: "700",
                                    fontFamily: "Manrope",
                                    color: "#662200"
                                }}
                            >
                                Loans in INR within minutes!
                            </Typography>
                        </Box>
                        <Box>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center"
                            }}
                            >
                                <DoneIcon sx={{
                                    color: "#662200",
                                    marginRight: "1rem"
                                }} />
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontSize: "24px",
                                        marginBottom: "0.5rem",
                                        fontWeight: "700",
                                        fontFamily: "Manrope",
                                        color: "#662200"
                                    }}
                                >
                                    BORROW
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center"
                            }}
                            >
                                <DoneIcon sx={{
                                    color: "#662200",
                                    marginRight: "1rem"
                                }} />
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontSize: "24px",
                                        marginBottom: "0.5rem",
                                        fontWeight: "700",
                                        fontFamily: "Manrope",
                                        color: "#662200"
                                    }}
                                >
                                    LEND
                                </Typography>
                            </Box>
                        </Box>
                    </Box>


                    <Box sx={{ mb: "2rem" }}>
                        <Link to="/signin" style={{textDecoration: "none"}}>
                            <Button
                                variant="contained"
                                sx={{ fontFamily: "Manrope", }}
                            >
                                GET STARTED WITH UC &gt;
                            </Button>
                        </Link>
                        <Link to="#learn-more" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    backgroundColor: "#FFFFFF",
                                    marginLeft: "1rem",
                                    fontFamily: "Manrope",
                                    textDecoration: "none"
                                }}
                            >
                                LEARN MORE
                            </Button>
                        </Link>
                    </Box>

                    <Box sx={{ display: "flex" }}>
                        <img src="benance.svg" alt="benance" />
                        <Typography
                            sx={{
                                fontFamily: "Manrope",
                                marginLeft: "0.75rem"
                            }}
                        >
                            and more wallets supported
                        </Typography>
                    </Box>
                </Box>
            </Box>


            <div id="learn-more">
            <Box sx={{ backgroundColor: "#FBFBFB" }} >
                <Box
                    sx={{
                        maxWidth: "1024px",
                        margin: "0rem auto",
                        padding: "6rem 0rem",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: "2rem" }}>
                        <Box sx={{ width: '50%' }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: "36px",
                                    marginBottom: "1rem",
                                    fontWeight: "700",
                                    fontFamily: "Manrope",
                                    color: "#662200"
                                }}
                            >
                                Protected with smart contracts
                            </Typography>
                            <Typography
                                sx={{
                                    marginBottom: "1rem",
                                    fontFamily: "Manrope",
                                    fontSize: "20px",
                                    fontWeight: "300"
                                }}
                            >
                                Pre-set logic executed with no scope for ambiguity — exactly what borrowers and lenders look for!
                            </Typography>
                        </Box>
                        <Box sx={{ marginTop: "-3rem" }}>
                            <img src="/smartcontract.png" alt="" />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ width: '45%' }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: "28px",
                                    marginBottom: "1rem",
                                    fontWeight: "500",
                                    fontFamily: "Manrope",
                                    color: "#662200"
                                }}
                            >
                                Why sell your crypto, when you can collateralise?
                            </Typography>
                            <Typography
                                sx={{
                                    marginBottom: "1rem",
                                    fontFamily: "Manrope",
                                    fontSize: "20px",
                                    fontWeight: "300"
                                }}
                            >
                                Repay the loan as per the terms and get back your crypto tokens
                            </Typography>
                        </Box>
                        <Box sx={{ width: '45%' }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: "28px",
                                    marginBottom: "1rem",
                                    fontWeight: "500",
                                    fontFamily: "Manrope",
                                    color: "#662200"
                                }}
                            >
                                Full power to you — negotiate your deals
                            </Typography>
                            <Typography
                                sx={{
                                    marginBottom: "1rem",
                                    fontFamily: "Manrope",
                                    fontSize: "20px",
                                    fontWeight: "300"
                                }}
                            >
                                With in platform chat, negotiate and cut a deal that works for both
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            </div>

            <Box sx={{ backgroundColor: "#F6E7EB" }} >
                <Box
                    sx={{
                        maxWidth: "1024px",
                        margin: "0rem auto",
                        padding: "6rem 0rem",
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: "48px",
                            fontWeight: "700",
                            fontFamily: "Manrope",
                            color: "#662200",
                            mb: "3rem"
                        }}
                    >
                        Easy to understand process
                    </Typography>
                    {entity === 'borrower' && (
                        <>
                            <Box sx={{ display: "flex", mb: "2rem" }}>
                                <Box sx={{ width: "6%", marginRight: "2rem" }}>
                                    <Box sx={{
                                        padding: "1rem",
                                        backgroundColor: "#F8D08C",
                                        borderRadius: "5rem",
                                    }}>
                                        <Typography
                                            sx={{
                                                fontSize: "20px",
                                                fontWeight: "700",
                                                fontFamily: "Manrope",
                                                textAlign: "center",
                                            }}
                                        >
                                            1
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "94%" }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontSize: "24px",
                                            marginBottom: "0.5rem",
                                            fontWeight: "700",
                                            fontFamily: "Manrope",
                                            color: "#662200"
                                        }}
                                    >
                                        Import crypto portfolio and browse lender offers
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            fontFamily: "Manrope",
                                        }}
                                    >
                                        Find a lender that is ready to offer loans somewhere near your expectations.
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", mb: "2rem" }}>
                                <Box sx={{ width: "6%", marginRight: "2rem" }}>
                                    <Box sx={{
                                        padding: "1rem",
                                        backgroundColor: "#F8D08C",
                                        borderRadius: "5rem",
                                    }}>
                                        <Typography
                                            sx={{
                                                fontSize: "20px",
                                                fontWeight: "700",
                                                fontFamily: "Manrope",
                                                textAlign: "center",
                                            }}
                                        >
                                            2
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "94%" }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontSize: "24px",
                                            marginBottom: "0.5rem",
                                            fontWeight: "700",
                                            fontFamily: "Manrope",
                                            color: "#662200"
                                        }}
                                    >
                                        Negotiate a deal
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            fontFamily: "Manrope",
                                        }}
                                    >
                                        Start with an initial offer with the lender using in platform chat, negotiate and accept the final offer.
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", mb: "2rem" }}>
                                <Box sx={{ width: "6%", marginRight: "2rem" }}>
                                    <Box sx={{
                                        padding: "1rem",
                                        backgroundColor: "#F8D08C",
                                        borderRadius: "5rem",
                                    }}>
                                        <Typography
                                            sx={{
                                                fontSize: "20px",
                                                fontWeight: "700",
                                                fontFamily: "Manrope",
                                                textAlign: "center",
                                            }}
                                        >
                                            3
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "94%" }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontSize: "24px",
                                            marginBottom: "0.5rem",
                                            fontWeight: "700",
                                            fontFamily: "Manrope",
                                            color: "#662200"
                                        }}
                                    >
                                        Transfer collateral cypto
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            fontFamily: "Manrope",
                                        }}
                                    >
                                        Transfer your collateral crypto tokens to platform managed secure escrow wallet.
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", mb: "2rem" }}>
                                <Box sx={{ width: "6%", marginRight: "2rem" }}>
                                    <Box sx={{
                                        padding: "1rem",
                                        backgroundColor: "#F8D08C",
                                        borderRadius: "5rem",
                                    }}>
                                        <Typography
                                            sx={{
                                                fontSize: "20px",
                                                fontWeight: "700",
                                                fontFamily: "Manrope",
                                                textAlign: "center",
                                            }}
                                        >
                                            4
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "94%" }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontSize: "24px",
                                            marginBottom: "0.5rem",
                                            fontWeight: "700",
                                            fontFamily: "Manrope",
                                            color: "#662200"
                                        }}
                                    >
                                        Get the loan amount in INR
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            fontFamily: "Manrope",
                                        }}
                                    >
                                        After collateral transfer is complete, lender will transfer the loan amount In INR to your UPI VPA.
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", mb: "2rem" }}>
                                <Box sx={{ width: "6%", marginRight: "2rem" }}>
                                    <Box sx={{
                                        padding: "1rem",
                                        backgroundColor: "#F8D08C",
                                        borderRadius: "5rem",
                                    }}>
                                        <Typography
                                            sx={{
                                                fontSize: "20px",
                                                fontWeight: "700",
                                                fontFamily: "Manrope",
                                                textAlign: "center",
                                            }}
                                        >
                                            5
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "94%" }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontSize: "24px",
                                            marginBottom: "0.5rem",
                                            fontWeight: "700",
                                            fontFamily: "Manrope",
                                            color: "#662200"
                                        }}
                                    >
                                        Smart contract activated
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            fontFamily: "Manrope",
                                        }}
                                    >
                                        Smart contract protects the interest of both borrower and lender by executing pre-defined logic at the end of loan period.
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", mb: "2rem" }}>
                                <Box sx={{ width: "6%", marginRight: "2rem" }}>
                                    <Box sx={{
                                        padding: "1rem",
                                        backgroundColor: "#F8D08C",
                                        borderRadius: "5rem",
                                    }}>
                                        <Typography
                                            sx={{
                                                fontSize: "20px",
                                                fontWeight: "700",
                                                fontFamily: "Manrope",
                                                textAlign: "center",
                                            }}
                                        >
                                            6
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "94%" }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontSize: "24px",
                                            marginBottom: "0.5rem",
                                            fontWeight: "700",
                                            fontFamily: "Manrope",
                                            color: "#662200"
                                        }}
                                    >
                                        Pay loan and get collateral back
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            fontFamily: "Manrope",
                                        }}
                                    >
                                        Pay the loan amount to the lender’s UPI VPA. Smart contract will execute and return your collateral crypto to your wallet.
                                    </Typography>
                                </Box>
                            </Box>
                        </>
                    )
                    }
                    <Link to="/signin" style={{textDecoration: "none"}}>
                            <Button
                                variant="contained"
                                sx={{ fontFamily: "Manrope", mt:"1rem" }}
                            >
                                GET STARTED WITH UC &gt;
                            </Button>
                        </Link>
                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontFamily: "Manrope",
                            mt: "4rem",
                            textAlign: "center"
                        }}
                    >
                        Built by <strong>moria_in_a_new_avataar</strong>
                    </Typography>
                </Box>
            </Box>

        </>
    );
};

export default Home;
