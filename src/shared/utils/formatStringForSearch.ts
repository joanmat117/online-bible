export const formatStringForSearch = (string:string)=>{
    return string
    .toLowerCase()
    .normalize("NFD")                 
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/[^a-z0-9\s]/g, "")     // Eliminar caracteres especiales
    .replace(/\s+/g, "")            // Eliminar espacios
    .trim(); 
  }
