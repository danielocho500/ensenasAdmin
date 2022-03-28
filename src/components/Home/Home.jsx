import React, { useContext} from 'react'
import { modalContext } from '../../context/modalContext';
import { useGetProducts } from '../../hooks/useGetProducts';
import Swal from 'sweetalert2';


import './home.css';
import { ProductModal } from './ProductModal';
import { deleteProduct } from '../../helpers/deleteProduct';

export const Home = () => {
    const { data, setData, loading, error } = useGetProducts();

    const { setActualProduct, setActiveModal } = useContext(modalContext);

    const addProduct = () => {
        setActualProduct(false);
        setActiveModal(true);
    }

    const handleEdit = (element) => {
        setActiveModal(true);
        setActualProduct({
            ...element
        })
    }

    const handleDelete = (element) => {
        Swal.fire({
            title: '¿Seguro que deseas eliminar el producto',
            text: "No podras revertirlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        })
        .then(() => {
            return deleteProduct(element)
        })
        .then((id) => {
            setData((oldData) => {
                return oldData.filter((element) => element.id !== id);
            })
        })
    }

    return (
        <>
            {
                (loading)
                    ? 'loading'
                    : (error)

                        ? 'error'
                        :
                        <div className='App container mt-5'>
                            <h1 className='title'> Administrar productos </h1>
                            <button className="btn btn-success" onClick={addProduct}>Agregar Producto</button>
                            <table className='table table-bordered mt-4'>
                                <thead>
                                    <tr>
                                        <th> Titulo </th>
                                        <th> Precio </th>
                                        <th> Categoria </th>
                                        <th> Color </th>
                                        <th> Descripción </th>
                                        <th> Forma </th>
                                        <th> Medida </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map(element => {
                                            return (
                                                <tr key={element.id} >
                                                    <td> {element.title} </td>
                                                    <td> {'$'}{element.precio} </td>
                                                    <td> {element.categoria} </td>
                                                    <td> {element.color} </td>
                                                    <td> {element.description} </td>
                                                    <td> {element.forma} </td>
                                                    <td> {element.medida} </td>
                                                    <td className='buttons'> <button className='btn btn-primary' onClick={() => { handleEdit(element) }}> Editar </button>
                                                        <button className='btn btn-danger' onClick={() => {handleDelete(element)}}> Eliminar </button></td>
                                                </tr>)
                                        })
                                    }
                                </tbody>
                            </table>

                            <ProductModal setData={setData} />
                        </div>
            }
        </>
    )
}
