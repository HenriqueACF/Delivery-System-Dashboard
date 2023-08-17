"use client"

import {Alert, Link as MuiLink} from "@mui/material";
import Link from "next/link";

const Page = () => {

    return (
        <>
            <Alert
                variant='filled'
                severity='error'
                sx={{
                    mt: 3,
                    mb: 3
                }}
            >Este link expirou, refaça o procedimento para solicitar sua nova senha.</Alert>

            <MuiLink
                href="/login/forgot"
                component={Link}
                variant="button"
            >Esqueci minha senha</MuiLink>
        </>
    )
}

export default Page
