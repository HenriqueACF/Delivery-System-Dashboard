"use client"
import {FormEvent, useState} from "react";
import {Box, Button, TextField, Typography, Link as MuiLink, Alert} from "@mui/material";
import Link  from "next/link"
import {api} from "@/libs/api";

const Page = () => {
    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(!emailField || !passwordField){
            setError('Preencha e-mail e senha')
            return
        }

        setError('')
        setLoading(true)

        const result = await api.login(emailField, passwordField)
        setLoading(false)

        if (result.error){
            setError(result.error)
        }


    }
    return (
        <Box>
            <>
                <Typography component="p" sx={{
                    textAlign: 'center',
                    mt:2,
                    color: '#555'
                }}>
                    Digite seus dados para entrar no painel administrativo doi estabelecimento e gerenciar produtos/pedidos.
                </Typography>

                <Box
                    component="form"
                    sx={{
                        mt: 3
                    }}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        label="Digite o seu E-mail"
                        name="email"
                        fullWidth
                        autoFocus
                        sx={{
                            mb: 2
                        }}
                        onChange={e => setEmailField(e.target.value)}
                        value={emailField}
                        disabled={loading}
                        // required
                    />
                    <TextField
                        label="Digite a sua Senha"
                        type='password'
                        name="password"
                        fullWidth
                        sx={{
                            mb: 2
                        }}
                        onChange={e => setPasswordField(e.target.value)}
                        value={passwordField}
                        disabled={loading}
                        // required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                    >{loading ? 'Carregando...' : 'Entrar'}</Button>

                    {error &&
                        <Alert
                            variant='filled'
                            severity='error'
                            sx={{
                                mt: 3
                            }}
                        >{error}</Alert>
                    }

                    <Box sx={{ mt:3 }}>
                        <MuiLink
                            href="/login/forgot"
                            variant="body2"
                            component={Link}
                        >Esqueceu a sua senha?</MuiLink>
                    </Box>
                </Box>
            </>
        </Box>
    )
}

export default Page
