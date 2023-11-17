export interface Categoria {
    id: number,
    nombre: string,
    activo: number,
    descripcion: string,
    created_at: Date | null,
    updated_at: Date | null,
    deleted_at: Date | null
}