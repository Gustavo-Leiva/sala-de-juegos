export interface Encuesta {
    nombreApellido: string;
    edad: number | null; // Permitir que sea null inicialmente
    telefono: string;
    respuestas: {
      pregunta1: string;
      pregunta2: string;
      pregunta3: string;
    };
  }
  