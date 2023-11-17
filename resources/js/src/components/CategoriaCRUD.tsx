import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface Categoria {
    id: number,
    nombre: string,
    activo: number,
    descripcion: string,
    created_at: Date | null,
    updated_at: Date | null,
    deleted_at: Date | null
}

export const CategoriaCRUD: React.FC = () => {
    const [data, setData] = useState<Categoria[]>([]);
    const [name, setName] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');

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
            <h2>Categoria</h2>
            <input
                type="search"
                className="form-control"
                placeholder="Buscar"
                defaultValue={""}
                onChange={(e) => fetchData(e.target.value)}
            />
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    className="form-control mt-2"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={() => addUser({ nombre: name, descripcion } as Categoria)}>
                    Agregar Usuario
                </button>
            </div>
            <ul className="list-group">
                {data.map((_) => (
                    <li key={_.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {_.nombre} - {_.descripcion}
                        <button className="btn btn-danger" onClick={() => deleteUser(_.id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
