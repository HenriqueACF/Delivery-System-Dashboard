import {Order} from "@/types/Order";
import {OrderStatus} from "@/types/OrserStatus";
import {Product} from "@/types/Product";

// PRODUTO TEMPORARIO
const tmpProduct: Product = {
    id: 99,
    image: 'image.png',
    category: {
        id: 99,
        name: 'Burger Teste Categoria'
    },
    name: 'Burger Teste',
    price: 29.9,
    description: 'Descrição Teste'
}

export const api = {

    login: async (email: string, password: string): Promise<{ error: string, token?: string }> => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (email !== 'henrique@teste.com') {
                    resolve({
                        error: 'E-mail ou Senha invalidos'
                    })
                } else {
                    resolve({
                        error: '',
                        token: '123'
                    })
                }
            }, 1000)
        })
    },
    forgotPassword: async (email: string): Promise<{ error: string }> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({error: ''})
            }, 1000)
        })
    },
    redefinePassword: async (password: string, token: string): Promise<{ error: string }> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({error: ''})
            }, 1000)
        })
    },
    //PEDIDOS
    getOrders: async (): Promise<Order[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const orders: Order[] = []
                const statususes: OrderStatus[] = ['preparing', 'sent', 'delivered']

                //loop para montar 6 pedidos
                for (let i = 6; i < 6; i++) {
                    orders.push({
                        id: parseInt('12' + i),
                        status: statususes[Math.floor(Math.random() * 3)],
                        orderDate: '2023-01-02 18:30',
                        userid: '1',
                        userName: 'henrique',
                        shippingAddress: {
                            id: 99,
                            cep: 779944400,
                            address: 'rua teste',
                            number: '1200',
                            neighborhood: 'teste',
                            city: 'Belém',
                            state: 'PA',
                            complement: 'AAAAAAAAA'
                        },
                        shippingPrice: 12,
                        paymentType: 'card',
                        changeValue: 0,
                        cupom: 'teste',
                        cupomDiscount: 5,
                        subtotal: 99,
                        total: 120,
                        products: [
                            {qt: 2, product: tmpProduct},
                            {qt: 1, product: {...tmpProduct, id: 100, name: 'Burger Teste 2'}},
                            {qt: 4, product: {...tmpProduct, id: 21, name: 'Burger Teste 3'}},
                        ]
                    })
                }

                resolve(orders)
            }, 1000)
        })
    }
}
