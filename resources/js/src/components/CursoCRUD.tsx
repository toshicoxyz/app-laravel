import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Curso } from '../types/Curso';
import { Categoria } from '../types/Categoria';

export const CursoCRUD: React.FC = () => {
    const [data, setData] = useState<Curso[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaId, setCategoriaId] = useState<number | null>(null);
    const [name, setName] = useState<string>('');
    const [imagen, setImagen] = useState<string>('');
    const [precio, setPrecio] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);

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
            <input
                type="search"
                className="form-control"
                placeholder="Buscar"
                defaultValue={""}
                onChange={(e) => fetchData(e.target.value)}
            />
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Agregar Curso
            </button>
            {/* <div className="mb-3">
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
            </div> */}

            {showModal && (
                <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Agregar Curso</h5>
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
                                        <label htmlFor="imagen">Imagen URL</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="imagen"
                                            value={imagen}
                                            onChange={(e) => setImagen(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="precio">Precio</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="precio"
                                            value={precio}
                                            onChange={(e) => setPrecio(Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="categoria">Categoría</label>
                                        <select
                                            className="form-select"
                                            value={categoriaId || ''}
                                            onChange={(e) =>
                                                setCategoriaId(Number(e.target.value) || null)
                                            }
                                        >
                                            <option value="">Seleccionar Categoría</option>
                                            {categorias.map((categoria) => (
                                                <option key={categoria.id} value={categoria.id}>
                                                    {categoria.nombre}
                                                </option>
                                            ))}
                                        </select>
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
                                    onClick={() =>
                                        addUser({
                                            nombre: name,
                                            precio,
                                            imagen,
                                            categoria_id: categoriaId,
                                        } as Curso)
                                    }
                                >
                                    Guardar Curso
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
                        <th scope="col">Imagen</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>
                                <img src={item.imagen} alt={item.nombre} style={{ maxWidth: '100px' }} />
                            </td>
                            <td>{item.precio}</td>
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
