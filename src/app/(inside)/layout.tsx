"use client"; // <- next identifica que a pagina vai utilizar client side

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'


import React from "react";
import {Container} from "@mui/material";
import {Header} from "@/components/Header";

type Props = {
    children: React.ReactNode
}
const Layout = ({children}) => {
    return (
        <html lang="pt-br">
        <body style={{margin: 0}}>
        <Header/>
        <Container commponent="section" maxWidth="lg" sx={{
            pt: 10
        }}>
            {children}
        </Container>
        </body>
        </html>
    )
}

export default Layout
