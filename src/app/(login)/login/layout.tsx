"use client"; // <- next identifica que a pagina vai utilizar client side

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'


import React from "react";
import {Box, Container, Typography} from "@mui/material";

type Props = {
    children: React.ReactNode
}
const Layout = ({children}) => {
    return(
        <html lang="pt-br">
            <body>
                <Container component="main" maxWidth="xs">
                    <Box sx={{
                        mt: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems:'center'
                    }}>
                        <Typography component="h3" variant="h3">
                            SaaS Painel
                        </Typography>

                        <Typography component="h5" variant="h5">
                            Painel do estabelecimento
                        </Typography>

                        {children}
                    </Box>
                </Container>
            </body>
        </html>
    )
}

export default Layout
