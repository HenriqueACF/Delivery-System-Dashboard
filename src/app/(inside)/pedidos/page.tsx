"use client"

import React, {useEffect, useState} from "react";
import {Box, Button, CircularProgress, Grid, InputAdornment, Skeleton, TextField, Typography} from "@mui/material";
import {Refresh, Search} from "@mui/icons-material";
import {Order} from "@/types/Order";
import {api} from "@/libs/api";
import {OrderItem} from "@/components/OrderItem";
import {OrderStatus} from "@/types/OrserStatus";
import {dateFormat} from "@/libs/dateFormat";

const Page = () => {
    const [searchInput, setSearchInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
    //"FAKE BACKUP DOS PEDIDOS"
    const [orders, setOrders] = useState<Order[]>([])
    //STATE PRA USAR NA HORA DE IMPRIMIR
    const [printOrder, setPrintOrder] = useState<Order | null>(null)

    const getOrders = async () =>{
        setSearchInput('')
        setOrders([])
        setLoading(true)
        const orderList: Order[] = await api.getOrders()
        setOrders(orderList)
        setLoading(false)
    }

    useEffect(()=>{
        getOrders()
    }, [])

    useEffect(()=>{
        setSearchInput('')
        setFilteredOrders(orders)
    }, [orders])


    const handleSearchKey = (event: KeyboardEvent) => {
        console.log(event.code)
        if(event.code.toLowerCase() === 'enter'){
            if(searchInput != ''){
                let newOrders: Order[] = []

                for(let i in orders){
                    if(orders[i].id.toString() === searchInput){
                        newOrders.push(orders[i])
                    }
                }
                setFilteredOrders(newOrders)
            } else {
                setFilteredOrders(orders)
            }
        }

    }

    const handleChangeStatus = async(id: number, newStatus: OrderStatus) =>{
        await api.changeOrderStatus(id, newStatus)
        getOrders()
    }

    const handlePrintAction = (order: Order) =>{
        setPrintOrder(order)
        setTimeout(()=>{
            if(window) window.print()
        }, 200)
    }

    return (
        <>
            <Box sx={{my: 3, displayPrint: 'none'}}>
                <Box sx={{mb: 3, display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography
                            component="h5"
                            variant="h5"
                            sx={{color: '#555', mr: 2}}>Pedidos
                        </Typography>
                        {loading && <CircularProgress size={24}/>}
                        {!loading &&
                            <Button
                                onClick={getOrders}
                                sx={{justifyContent: {xs: 'flex-start', md: 'center'}}}>
                                <Refresh/>
                                <Typography
                                    component="div"
                                    sx={{color: '#555', display: {xs: 'none', sm: 'block'}}
                                    }
                                >
                                    Atualizar
                                </Typography>
                            </Button>
                        }
                    </Box>
                    <TextField
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        onKeyUp={handleSearchKey}
                        placeholder="Pesquise um pedido"
                        variant="standard"
                        disabled={loading}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search/>
                                </InputAdornment>
                            )
                        }}
                    >

                    </TextField>
                </Box>
                <Grid
                    container
                    spacing={3}
                    columns={{xs: 1, sm: 2, md: 4}}
                >
                    {loading &&
                        <>
                            <Grid item xs={1}>
                                <Skeleton variant="rectangular" height={220}/>
                            </Grid>
                            <Grid item xs={1}>
                                <Skeleton variant="rectangular" height={220}/>
                            </Grid>
                            <Grid item xs={1}>
                                <Skeleton variant="rectangular" height={220}/>
                            </Grid>
                            <Grid item xs={1}>
                                <Skeleton variant="rectangular" height={220}/>
                            </Grid>
                        </>
                    }
                    {!loading && filteredOrders.map((item, index)=>(
                        <Grid key={index} item xs={1}>
                            <OrderItem
                                item={item}
                                onChangeStatus={handleChangeStatus}
                                onPrint={handlePrintAction}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{display: 'none', displayPrint: 'block'}}>
                {printOrder &&
                    <>
                        <Typography component="h5" variant="h5" >Pedido</Typography>
                        <Box>ID: #{printOrder.id}</Box>
                        <Box>Data do pedido{dateFormat(printOrder.orderDate)}</Box>
                        <Box>Cliente: {printOrder.userName}</Box>

                        <Typography component="h5" variant="h5" >Pagamento</Typography>
                        <Box>Tipo de pagamento: {printOrder.paymentType === 'card' ? 'Cartão' : 'Dinheiro'}</Box>
                        <Box>Subtotal: R$ {printOrder.subtotal.toFixed(2)}</Box>
                        <Box>Entrega: R$ {printOrder.shippingPrice.toFixed(2)}</Box>
                        {printOrder.cupomDiscount &&
                            <Box>Desconto: - R${printOrder.cupomDiscount}</Box>
                        }
                        <Box>Total: R$ {printOrder.total.toFixed(2)}</Box>

                        <Typography component="h5" variant="h5" >Endereço</Typography>
                        <Box>Rua: {printOrder.shippingAddress.address}</Box>
                        <Box>Número: {printOrder.shippingAddress.number}</Box>
                        <Box>Complemento: {printOrder.shippingAddress.complement}</Box>
                        <Box>CEP: {printOrder.shippingAddress.cep}</Box>
                        <Box>Bairro: {printOrder.shippingAddress.neighborhood}</Box>
                        <Box>Cidade: {printOrder.shippingAddress.city}</Box>
                        <Box>Estado: {printOrder.shippingAddress.state}</Box>

                        <Typography component="h5" variant="h5" >Itens</Typography>
                        {printOrder.products.map((item, index)=>(
                            <Box key={index}>{item.qt} - {item.product.name}</Box>
                        ))}
                    </>
                }
            </Box>
        </>
    )
}

export default Page
