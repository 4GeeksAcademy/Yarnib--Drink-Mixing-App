import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import LandingPage from "./pages/landingpage";
import { Home } from "./pages/home";
import { Sendtoken } from "./pages/requestingreset";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { ResetPassword } from "./pages/resetpassword";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { SignUp } from "./pages/signup";
import { Profile } from "./pages/profile";
import Chatbot from "./pages/chatbot";
import Social from "./pages/social";
import Ageverification from "./pages/ageverification";
import Blogsidebar from "./pages/Blogsidebar";
import BlogPage from "./pages/BlogPage";
import UserFavorites from "./pages/userfavorites";
import { ContactForm } from "./pages/contactform";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Ageverification />} path="/ageverification" />
                        <Route element={<Home />} path="/" />
                        <Route element={<Home />} path="/:theId" />
                        <Route element={<SignUp />} path="/sign-up" />
                        <Route element={<ResetPassword />} path="/request_reset" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<Chatbot />} path="/chatbot" />
                        <Route element={<LandingPage />} path="/landingpage" />
                        <Route element={<Social />} path="/social" />
                        <Route element={<Blogsidebar />} path="/Blogsidebar" />
                        <Route element={<BlogPage />} path="/BlogPage" />
                        <Route element={<ContactForm />} path="/contactform" />
                        <Route element={<UserFavorites />} path="/userfavorites" />
                        <Route element={<Sendtoken />} path="/sendtoken" />
                        <Route element={<Single />} path="/single/:theid" />
                       
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
