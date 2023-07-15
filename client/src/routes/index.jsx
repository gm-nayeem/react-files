import React from 'react';
import {
    BrowserRouter, Routes, Route
} from 'react-router-dom';

// pages
import Home from '../pages/home/Home';
import About from '../pages/about/About';
import Error from '../pages/error/Error';

const Index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Index