import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  data: any
  handleEdit: VoidFunction
  handleDelete: VoidFunction
}

const ImageGallery = ({ data, handleEdit, handleDelete }: Props) => {
  const deleteImage = (id) => {
    // Lógica para eliminar la imagen con el ID proporcionado
    console.log(`Eliminar imagen con ID: ${id}`);
  };

  return (
    <div className="row g-3">
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
            <img src="https://random.imagecdn.app/150/150" className="card-img-top" alt={item.descripcion} />
            <div className="card-body">
              <h5 className="card-title">{item.nombre}</h5>
              <p className="card-text">{item.descripcion}</p>
              <button className="btn btn-info mx-2" onClick={handleEdit}>
                Editar
              </button>
              <button onClick={handleDelete} className="btn btn-danger">
                Eliminar
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGallery
