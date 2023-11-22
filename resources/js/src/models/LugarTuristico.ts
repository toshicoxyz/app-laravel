export interface LugarTuristico {
    id?: number;
    nombre: string;
    descripcion: string;
    imagen?: string;
    ubicacion: string;
    precio: number;
    // Otras propiedades específicas de un lugar turístico
    created_at?: string; // Fecha de creación
    updated_at?: string; // Fecha de actualización
    region_id: number; // Clave foránea que identifica la región a la que pertenece el lugar turístico
}
