import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Categoria } from './CategoriaCRUD';

interface Curso {
    id: number;
    nombre: string;
    activo: boolean;
    imagen: string;
    precio: number;
    fecha_inicio?: string | null;
    fecha_fin?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    deleted_at?: string | null;
    categoria_id: number;
}

export const CursoCRUD: React.FC = () => {
    const [data, setData] = useState<Curso[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaId, setCategoriaId] = useState<number | null>(null);
    const [name, setName] = useState<string>('');
    const [imagen, setImagen] = useState<string>('');
    const [precio, setPrecio] = useState<number>(0);

    // Obtener todos los usuarios
    const fetchData = async (busqueda: string = "") => {
        try {
            const response = await axios.get(`http://localhost:8000/curso/search?busqueda=${busqueda}`);
            console.log(response.data); // Hacer algo con los datos recibidos
            setData(response.data)
            // setUsers(response.data)
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchCategorias = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/curso/search?busqueda=`);
            console.log(response.data); // Hacer algo con los datos recibidos
            setCategorias(response.data)
            // setUsers(response.data)
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    // Agregar un usuario
    const addUser = async (form: Curso) => {
        try {
            const response = await axios.post('http://localhost:8000/curso/create', form);
            console.log(response.data); // Hacer algo con los datos recibidos
            await fetchData()
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };
    // Eliminar un usuario por ID
    const deleteUser = async (userId: number) => {
        try {
            const response = await axios.delete(`http://localhost:8000/curso/destroy/${userId}`);
            console.log(response.data); // Hacer algo con los datos recibidos
            await fetchData()
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchCategorias()
    }, []);

    return (
        <div className="container mt-5">
            <h2>Curso</h2>
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
                    type="url"
                    className="form-control mt-2"
                    placeholder="Imagen Url"
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                />
                <input
                    type="number"
                    className="form-control mt-2"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(Number(e.target.value))}
                />
                <select
                    className="form-select mt-2"
                    value={categoriaId || ''}
                    onChange={(e) => setCategoriaId(Number(e.target.value) || null)}
                >
                    <option value="">Seleccionar Categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
                <button className="btn btn-primary mt-2" onClick={() => addUser({ nombre: name, precio, imagen, categoria_id: categoriaId } as Curso)}>
                    Agregar Usuario
                </button>
            </div>
            <ul className="list-group">
                {data.map((_) => (
                    <li key={_.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {_.nombre} - {_.imagen} - {_.precio}
                        <button className="btn btn-danger" onClick={() => deleteUser(_.id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
