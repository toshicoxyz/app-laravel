import { LugarTuristico } from "./LugarTuristico";

export interface Region {
    id?: number;
    nombre: string;
    descripcion: string;
    ubicacion: string; // Puede ser una coordenada geográfica, dirección, etc.
    imagen?: string; // URL o ruta de la imagen representativa de la región
    poblacion: number; // Cantidad de habitantes de la región
    clima: string; // Descripción del clima de la región
    created_at?: string; // Fecha de creación
    updated_at?: string | Date; // Fecha de actualización
    lugaresTuristicos?: LugarTuristico[]; // Relación: una región puede tener muchos lugares turísticos
}
