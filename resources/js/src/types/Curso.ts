export interface Curso {
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
