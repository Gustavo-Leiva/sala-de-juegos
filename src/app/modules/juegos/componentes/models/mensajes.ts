export interface Mensaje{
    emisor: string | null; // Permite null
    fecha: string | Date,
    texto: string,
}

