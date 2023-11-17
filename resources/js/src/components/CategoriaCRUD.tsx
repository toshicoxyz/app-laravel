import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Categoria } from '../types/Categoria';

export const CategoriaCRUD: React.FC = () => {
    const [data, setData] = useState<Categoria[]>([]);
    const [name, setName] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [showModal, setShowModal] = useState(false);

    // Obtener todos los usuarios
    const fetchData = async (busqueda: string = "") => {
        try {
            const response = await axios.get(`http://localhost:8000/categoria/search?busqueda=${busqueda}`);
            console.log(response.data); // Hacer algo con los datos recibidos
            setData(response.data)
            // setUsers(response.data)
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Agregar un usuario
    const addUser = async (form: Categoria) => {
        try {
            const response = await axios.post('http://localhost:8000/categoria/create', form);
            console.log(response.data); // Hacer algo con los datos recibidos
            await fetchData()
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };
    
    // Eliminar un usuario por ID
    const deleteUser = async (userId: number) => {
        try {
            const response = await axios.delete(`http://localhost:8000/categoria/destroy/${userId}`);
            console.log(response.data); // Hacer algo con los datos recibidos
            await fetchData()
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <input
                type="search"
                className="form-control"
                placeholder="Buscar"
                defaultValue={""}
                onChange={(e) => fetchData(e.target.value)}
            />
            <div className="mb-3">

                <button className="btn btn-primary mt-2" onClick={() => setShowModal(true)}>
                    Agregar Categoria
                </button>
            </div>

            {showModal && (
                <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Agregar Categoria</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="nombre">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombre"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="descripcion">Descripción</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="descripcion"
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cerrar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => addUser({ nombre: name, descripcion } as Categoria)}
                                >
                                    Guardar Categoria
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>{item.descripcion}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteUser(item.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

