import React from "react";
import { Region } from "../models/Region";
import { useEffect } from "react";
import { addItem, deleteItem, fetchData, updateItem } from "../services/Crud";
import { useState } from "react";
import { motion } from 'framer-motion';
import moment from 'moment'; // Importar moment

const Regiones = () => {
    const [data, setData] = useState<Region[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modeEdit, setModeEdit] = useState<boolean>(false);
    const [form, setForm] = useState<Region>({
        nombre: "",
        clima: "",
        poblacion: 0,
        ubicacion: "",
        descripcion: "",
        lugaresTuristicos: []
    })

    const fetchRegions = async (search?: string) => {
        const data: Region[] = await fetchData<Region[]>('regions', search);
        setData(data);
    };

    const addRegion = async (newRegion: Partial<Region>) => {
        await addItem<Region>('regions', newRegion);
        await fetchRegions()
    };

    const updateRegion = async (regionId: number, updatedRegion: Partial<Region>) => {

        delete updatedRegion.created_at
        delete updatedRegion.updated_at
        delete updatedRegion.id
        await updateItem<Region>(`regions`, regionId, updatedRegion);
        await fetchRegions()
    };

    const deleteRegion = async (id: number) => {
        await deleteItem(`regions`, id);
        await fetchRegions()
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });
    };

    useEffect(() => {
        fetchRegions();
    }, []);


    return (
        <div className="container mt-5">
            <input
                type="search"
                className="form-control mb-3"
                placeholder="Buscar por nombre y descripción"
                aria-label="Buscar"
                onChange={(e) => fetchRegions(e.target.value)}
            />

            {showModal && (
                <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"> {modeEdit ? "Editar" : "Guardar"} Región</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="nombre">Nombre</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nombre"
                                                value={form.nombre}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="poblacion">Población</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="poblacion"
                                                value={form.poblacion}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="descripcion">Descripción</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="descripcion"
                                                value={form.descripcion}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="ubicacion">Ubicación</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="ubicacion"
                                                value={form.ubicacion}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="clima">Clima</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="clima"
                                                value={form.clima}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="clima">Imagen Url</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="imagen"
                                                value={form.imagen}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
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
                                    onClick={() => modeEdit ? updateRegion(form.id ?? 0, form) : addRegion(form)}
                                >
                                    {modeEdit ? "Editar" : "Guardar"} Región
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row g-3">
                <motion.div
                    onClick={() => { setShowModal(true); setModeEdit(false) }}
                    className="col-md-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        animate={{ display: 'flex', height: 500, alignItems: 'center', justifyContent: 'center' }}
                        className="card"
                        style={{ border: '1px solid #ccc' }} // Agrega estilos de borde para visualización
                    >
                        <h1>+ Agregar</h1>
                    </motion.div>
                </motion.div>
                {data.map((item) => (
                    <motion.div
                        key={item.id}
                        className="col-md-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="card">
                            {item.imagen && <img src={item.imagen} className="card-img-top" alt={item.descripcion} />}
                            <div className="card-body">
                                <p><strong>Nombre:</strong> {item.nombre}</p>
                                <p><strong>Descripcion:</strong> {item.descripcion}</p>
                                <p><strong>Población:</strong> {item.poblacion}</p>
                                <p><strong>Clima:</strong> {item.clima}</p>
                                <p><strong>Ubicación:</strong> {item.ubicacion}</p>
                                <p><strong>Fecha Creada:</strong> {moment(item.created_at).format('LL')}</p>
                                <p><strong>Fecha Modificada:</strong> {moment(item.updated_at).format('LL')}</p>
                                <button
                                    className="btn btn-info mx-2"
                                    onClick={() => {
                                        // Lógica para editar el elemento item
                                        setModeEdit(true);
                                        setShowModal(true);
                                        setForm(item);
                                    }}
                                >
                                    Editar
                                </button>
                                <button onClick={() => deleteRegion(item.id ?? 0)} className="btn btn-danger">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Regiones;
