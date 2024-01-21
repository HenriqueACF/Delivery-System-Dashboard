import {Box, Button, Typography} from "@mui/material";
import {Order} from "@/types/Order";
import {OrderStatus} from "@/types/OrserStatus";

type Props = {
    item: Order
}

export const OrderItem = ({item}: Props) => {

    const getStatusBackground = (status: OrderStatus) => {
        const statuses = {
            preparing: '#2787BA',
            sent: '#27BA3A',
            delivered: '#999'
        }
        return statuses[status]
    }

    return (
        <>
        <Box sx={{border: '1px solid #EEE', color: '#FFF', borderRadius: 2, overflow: 'hidden'}}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p:1,
                    backgroundColor: getStatusBackground(item.status)
                }}>
                    <Box>
                        <Typography component="p">{item.orderDate}</Typography>
                        <Typography component="p">{item.userName}</Typography>
                        <Button size="small" sx={{color: '#FFF', p: 0}}>Imprimir</Button>
                    </Box>
                    <Box>
                        <Typography component="p" sx={{fontSize: 24}}>#{item.id}</Typography>
                    </Box>
            </Box>
        </Box>
        </>
    )
}