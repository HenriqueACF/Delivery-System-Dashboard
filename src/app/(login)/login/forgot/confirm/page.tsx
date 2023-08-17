"use client"
import {FormEvent, useState} from "react";
import {Box, Button, TextField, Typography, Alert} from "@mui/material";
import {api} from "@/libs/api";

const Page = () => {
    const [passwordField, setPasswordField] = useState('')
    const [passwordField2, setPasswordField2] = useState('')
    const [error, setError] = useState('')
    const [info, setInfo] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!passwordField || !passwordField2) {
            setError('Preencha a senha')
            return
        }

        if (passwordField !== passwordField2) {
            setError('As senhas não são iguais')
            return
        }

        setError('')
        setInfo('')
        setLoading(true)

        const result = await api.redefinePassword(passwordField, '123')
        setLoading(false)

        if (result.error) {
            setError(result.error)
        } else {
            setInfo('Senha redefinida com sucesso.')
            setPasswordField('')
            setPasswordField2('')
        }


    }
    return (
        <Box>
            <>
                <Typography component="p" sx={{
                    textAlign: 'center',
                    mt: 2,
                    color: '#555'
                }}>
                    Olá, **USUARIO** defina a sua nova senha abaixo.
                </Typography>

                <Box
                    component="form"
                    sx={{
                        mt: 3
                    }}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        label="Digite sua nova senha"
                        name="password"
                        type="password"
                        fullWidth
                        autoFocus
                        sx={{
                            mb: 2
                        }}
                        onChange={e => setPasswordField(e.target.value)}
                        value={passwordField}
                        disabled={loading}
                        // required
                    />

                    <TextField
                        label="Confirme sua nova senha"
                        name="password2"
                        type="password"
                        fullWidth
                        autoFocus
                        sx={{
                            mb: 2
                        }}
                        onChange={e => setPasswordField2(e.target.value)}
                        value={passwordField2}
                        disabled={loading}
                        // required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                    >{loading ? 'Carregando...' : 'Definir nova senha'}</Button>

                    {error &&
                        <Alert
                            variant='filled'
                            severity='error'
                            sx={{
                                mt: 3
                            }}
                        >{error}</Alert>
                    }

                    {info &&
                        <Alert
                            variant='filled'
                            severity='success'
                            sx={{
                                mt: 3
                            }}
                        >{info}</Alert>
                    }
                </Box>
            </>
        </Box>
    )
}

export default Page
