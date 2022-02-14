import "./App.css";
import Appbar from "./components/Appbar";
import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "./theme";
import SignIn from "./pages/SignIn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WalletImport from "./pages/WalletImport";
import FirstThing from "./pages/FirstThing";
import { Box } from "@mui/system";
import Lend from "./pages/Lend";
import Borrow from "./pages/Borrow";
import Borrowers from "./pages/Borrowers";
import Lenders from "./pages/Lenders";
import LenderDetails from "./pages/LenderDetails";
import BorrowerDetails from "./pages/BorrowerDetails";
import BorrowerNegotiation from "./pages/BorrowNegotiation";
import LenderNegotiation from "./pages/LenderNegotiation";
import { Typography } from "@mui/material";
import PrivateRoute from "./config/PrivateRoute";
import { store } from "./store";
import { saveState } from "./config/browserStorage";
import Home from "./pages/Home";

store.subscribe(() => saveState(store.getState()));

const App = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <div className="App">
                <Appbar />
                <Box sx={{ mt: { xs: "3.5rem", sm: "4rem" } }}></Box>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route
                            path="/wallet-import"
                            element={
                                <PrivateRoute>
                                    <WalletImport />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/first-thing" element={<FirstThing />} />
                        <Route
                            path="/lend"
                            element={
                                <PrivateRoute>
                                    <Lend />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/borrow"
                            element={
                                <PrivateRoute>
                                    <Borrow />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/borrowing/"
                            element={
                                <PrivateRoute>
                                    <Borrowers />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/borrowing/:id"
                            element={
                                <PrivateRoute>
                                    <BorrowerDetails />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/borrowing/negotiation/:id"
                            element={
                                <PrivateRoute>
                                    <BorrowerNegotiation />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/lending/"
                            element={
                                <PrivateRoute>
                                    <Lenders />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/lending/:id"
                            element={
                                <PrivateRoute>
                                    <LenderDetails />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/lending/negotiation/:id"
                            element={
                                <PrivateRoute>
                                    <LenderNegotiation />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="*"
                            element={
                                <Typography variant="h3">
                                    Not authorized
                                </Typography>
                            }
                        ></Route>
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>
    );
};

export default App;
