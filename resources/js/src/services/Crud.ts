import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = window.location.origin;
const options = {
    // headers: { "Content-Type": "application/json" },
};
// Función genérica para realizar una solicitud GET
export const fetchData = async <T>(
    endpoint: string,
    queryParams: string = ""
): Promise<T> => {
    try {
        const response = await axios.get<T>(
            `${BASE_URL}/${endpoint}?busqueda=${queryParams}`,
            options
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return {} as T;
    }
};

// Función genérica para agregar un nuevo elemento
export const addItem = async <T>(
    endpoint: string,
    newItem: Partial<T>
): Promise<void> => {
    try {
        await axios.post(
            `${BASE_URL}/${endpoint}/create`,
            newItem,
            options
        );
        toast.success("Agregado con éxito!");
        console.log("Item agregado");
    } catch (error) {
        console.error(`Error adding item to ${endpoint}:`, error);
    }
};

// Función genérica para actualizar un elemento existente
export const updateItem = async <T>(
    endpoint: string,
    itemId: number,
    updatedItem: Partial<T>
): Promise<void> => {
    try {
        await axios.put(
            `${BASE_URL}/${endpoint}/update/${itemId}`,
            updatedItem,
            options
        );
        toast.success("¡Editado con éxito!");
        console.log("Item updated successfully");
    } catch (error) {
        toast.error("Ups un error!");
        console.error(`Error updating item in ${endpoint}:`, error);
    }
};

// Función genérica para eliminar un elemento por su ID
export const deleteItem = async (
    endpoint: string,
    id: number
): Promise<void> => {
    try {
        await axios.delete(
            `${BASE_URL}/${endpoint}/destroy/${id}`,
            options
        );
        toast.success("¡Eliminado con éxito!");
        console.log("Item deleted successfully");
    } catch (error) {
        toast.error("Ups un error!");
        console.error(`Error deleting item from ${endpoint}:`, error);
    }
};
