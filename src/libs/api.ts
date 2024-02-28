import {Order} from "@/types/Order";
import {OrderStatus} from "@/types/OrserStatus";
import {Product} from "@/types/Product";
import {Category} from "@/types/Category";

// PRODUTO TEMPORARIO
const tmpProduct: Product = {
    id: 99,
    image: 'https://picsum.photos/seed/picsum/200/300',
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
                        orderDate: "2023-01-02 18:30",
                        userid: "1",
                        userName: "Henrique",
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
                            {qt: 1, product: {...tmpProduct, id: 100, name: 'Burger Teste 2'}}
                        ]
                    })
                }
                resolve(orders)
            }, 1000)
        })
    },
    changeOrderStatus: async(id: number, newStatus: OrderStatus)=>{
        return true
    },
    getCategories: async():Promise<Category[]> =>{
        const list: Category[] = [
            {id: 99, name: 'Burgers'},
            {id: 98, name: 'Bebidas'},
            {id: 97, name: 'Doces'},
        ]
        return new Promise(resolve =>{
            setTimeout(()=>{
                resolve(list)
            }, 200)
        })
    },
    getProducts: async(): Promise<Product[]> =>{
        const list : Product[] = [
            {...tmpProduct, id: 123},
            {...tmpProduct, id: 124},
            {...tmpProduct, id: 125},
            {...tmpProduct, id: 126},
            {...tmpProduct, id: 127},
            {...tmpProduct, id: 128},
            {...tmpProduct, id: 129},
            {...tmpProduct, id: 130},
        ]
        return new Promise(resolve =>{
            setTimeout(()=>{
                resolve(list)
            }, 500)
        })
    },
    deleteProduct: async(id: number):Promise<Boolean>=>{
        return new Promise(resolve =>{
            setTimeout(()=>{
                resolve(true)
            }, 1000)
        })
    }
}
