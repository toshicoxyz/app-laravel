import React from "react";
import { LugarTuristico } from "../models/LugarTuristico";
import { useState } from "react";
import { useEffect } from "react";
import { addItem, deleteItem, fetchData, updateItem } from "../services/Crud";
import { Region } from "../models/Region";
import { motion } from 'framer-motion';
import moment from "moment";

const LugaresTuristicos = () => {
    const [data, setData] = useState<LugarTuristico[]>([]);
    const [selectData, setSelectData] = useState<Region[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modeEdit, setModeEdit] = useState<boolean>(false);
    const [form, setForm] = useState<LugarTuristico>({
        nombre: "",
        imagen: "",
        region_id: 0,
        descripcion: "",
        precio: 0,
        ubicacion: ""
    })

    const fetchAll = async (search?: string) => {
        const data = await fetchData<LugarTuristico[]>('lugar-turisticos', search);
        setData(data); // Hacer algo con los datos recibidos
    };

    const fetchAllSelect = async () => {
        const data = await fetchData<Region[]>('regions');
        setSelectData(data); // Hacer algo con los datos recibidos
    };


    const addData = async (newRegion: LugarTuristico) => {
        await addItem<LugarTuristico>('lugar-turisticos', newRegion);
        await fetchAll();
    };

    const updateData = async (itemId: number, updatedItem: Partial<LugarTuristico>) => {
        delete updatedItem.created_at
        delete updatedItem.updated_at
        delete updatedItem.id
        await updateItem<LugarTuristico>(`lugar-turisticos`, itemId, updatedItem);
        await fetchAll()
    };

    const deleteData = async (id: number) => {
        await deleteItem(`lugar-turisticos`, id);
        await fetchAll()
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });
    };

    useEffect(() => {
        fetchAll();
        fetchAllSelect()
    }, []);

    useEffect(() => {
        console.log(form)
    }, [form])

    return (
        <div className="container mt-5">
            <input
                type="search"
                className="form-control mb-3"
                placeholder="Buscar por nombre y descripción"
                aria-label="Buscar"
                onChange={(e) => fetchAll(e.target.value)}
            />

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
                                            <label htmlFor="descripcion">Descripción</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="descripcion"
                                                value={form.descripcion}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="ubicacion">Ubicacion</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="ubicacion"
                                                value={form.ubicacion}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="precio">Precio</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="precio"
                                                value={form.precio}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="precio">Imagen Url</label>
                                            <input
                                                type="url"
                                                className="form-control"
                                                id="imagen"
                                                value={form.imagen}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="categoria">Region</label>
                                            <select
                                                className="form-select"
                                                value={form.region_id || ''}
                                                id="region_id"
                                                onChange={handleInputChange}>
                                                <option value="">Seleccionar Region</option>
                                                {selectData.map((categoria) => (
                                                    <option key={categoria.id} value={categoria.id}>
                                                        {categoria.nombre}
                                                    </option>
                                                ))}
                                            </select>
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
                                    onClick={() => modeEdit ? updateData(form.id ?? 0, form) : addData(form)}
                                >
                                    {modeEdit ? "Editar" : "Guardar"} Lugar Turistico
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
                            <img src={item.imagen ?? ""} className="card-img-top" alt={item.descripcion} />
             
                            <div className="card-body">
                                <p><strong>Nombre:</strong> {item.nombre}</p>
                                <p><strong>Descripcion:</strong> {item.descripcion}</p>
                                <p><strong>Ubicación:</strong> {item.ubicacion}</p>
                                <p><strong>Precio:</strong> S/.{item.precio}</p>
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
                                <button onClick={() => deleteData(item.id ?? 0)} className="btn btn-danger">
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

export default LugaresTuristicos;
