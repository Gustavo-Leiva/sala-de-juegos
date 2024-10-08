
  


export interface Pais {
    name: { common: string }; // Nombre común en inglés
    flags: { png: string }; // URL de la bandera
    translations?: {
      spa?: { common: string }; // Traducción en español (opcional)
    };
  }
  