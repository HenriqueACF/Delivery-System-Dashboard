"use client"
import {FormEvent, useState} from "react";
import {Box, Button, TextField, Typography, Alert} from "@mui/material";
import {api} from "@/libs/api";

const Page = () => {
    const [emailField, setEmailField] = useState('')
    const [error, setError] = useState('')
    const [info, setInfo] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(!emailField){
            setError('Preencha o seu e-mail')
            return
        }

        setError('')
        setInfo('')
        setLoading(true)

        const result = await api.forgotPassword(emailField)
        setLoading(false)

        if (result.error){
            setError(result.error)
        } else {
            setInfo('Eviamos um e-mail para recuperação da sua senha.')
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
                    Deseja recuperar a sua senha?
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
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                    >{loading ? 'Carregando...' : 'Recuperar a senha'}</Button>

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
