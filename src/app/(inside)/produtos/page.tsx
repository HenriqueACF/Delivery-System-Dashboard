"use client"

import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Product} from "@/types/Product";
import {Category} from "@mui/icons-material";
import {api} from "@/libs/api";
import {ProductTableSkeleton} from "@/components/ProductTableSkeleton";
import {ProductTableItem} from "@/components/ProductTableItem";

const Page = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [productToDelete, setProductToDelete] = useState<Product>()
    const [loadingDelete, setLoadingDelete] = useState(false)

    useEffect(()=>{
        getProducts()
    }, [])

    const getProducts = async () =>{
        setLoading(true)
        setProducts(await api.getProducts())
        setCategories(await api.getCategories())
        setLoading(false)
    }

    const handleNewProduct = () =>{

    }

    const handleEditProduct = (product: Product) =>{

    }

    //DELETE PRODUCT
    const handleDeleteProduct = (product: Product) => {
        setProductToDelete(product)
        setShowDeleteDialog(true)
    }
    const handleConfirmDelete = async() =>{
        if (productToDelete){
            setLoadingDelete(true)
            await api.deleteProduct(productToDelete.id)
            setLoadingDelete(false)
            setShowDeleteDialog(false)
            getProducts()
        }
    }

    return (
        <>
            <Box sx={{my: 3}}>
                <Box sx={{mb: 3, display: 'flex', justifyContent: 'space-between'}}>
                    <Typography
                        component="h5"
                        variant="h5"
                        sx={{color: '#555', mr: 2}}>Produtos
                    </Typography>
                    <Button
                        onClick={handleNewProduct}
                    >Novo Produto</Button>
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{width: 50, display:{ xs: 'none', md: 'table-cell'}}}
                            >ID</TableCell>
                            <TableCell>Imagem</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell
                                sx={{display:{ xs: 'none', md: 'table-cell'}}}
                            >Preço</TableCell>
                            <TableCell
                                sx={{display:{ xs: 'none', md: 'table-cell'}}}
                            >Categoria</TableCell>
                            <TableCell
                                sx={{width:{xs: 50, md: 130}}}
                            >Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading &&
                            <>
                                <ProductTableSkeleton/>
                                <ProductTableSkeleton/>
                                <ProductTableSkeleton/>
                                <ProductTableSkeleton/>
                                <ProductTableSkeleton/>
                            </>
                        }
                        {!loading && products.map(item => (
                            <ProductTableItem
                                key={item.id}
                                item={item}
                                onEdit={handleEditProduct}
                                onDelete={handleDeleteProduct}
                            />
                        ))
                        }
                    </TableBody>
                </Table>

                <Dialog open={showDeleteDialog} onClose={()=> !loadingDelete ? setShowDeleteDialog(false) : null}>
                    <DialogTitle>Tem certeza que deseja deletar este produto?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Não será possível voltar atras após confirmar está acão</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={loadingDelete} onClick={()=> setShowDeleteDialog(false)}>Não</Button>
                        <Button disabled={loadingDelete} onClick={handleConfirmDelete}>Sim</Button>
                    </DialogActions>
                </Dialog>

            </Box>
        </>
    )
}

export default Page
