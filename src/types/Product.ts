import {Category} from "@/types/Category";

export type Product = {
    id: number
    image: string
    category: Category
    name: string
    price: number
    description?: string
}
