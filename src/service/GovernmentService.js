import http from "../http-common";

export const createGovernment = async (data) =>{
        try {
            const postData = {
                name: data.name,
                description: data.description,
            };
            const response = await http.post(baseURL, postData);

            return response.status === 201;
        } catch (error) {
            throw new Error("Error al agregar Government");
        }
    }

    export const getGovernments = async () =>{
        try {
            const response = await http.get(baseURL);
            const listGovernments = response.data;

            const governments = listGovernments.map((item) => ({
                id: item.id,
                name: item.name,
                description: item.description,
            }))
            .sort((a, b) => {
                // Ordenar en forma descendente por el campo 'name'
                if (a.id > b.id) return -1;
                if (a.id < b.id) return 1;
                return 0;
            });
            return governments;
            
        } catch (error) {
            throw new Error("Error al obtener Governments");
        }
       
    }
    export const getGovernment = async (id) =>{
        try {
            const response = await http.get(`${baseURL}/${id}`);
            const governments = response.data;
            console.log(governments);
            return governments;
            
        } catch (error) {
            throw new Error("Error al obtener Governments");
        }
        
    }

    export const updateGovernment = async (data) =>{
        try {
            const response = await http.put(`${baseURL}/${data.id}`, data);
            return response.status === 200;
        } catch (error) {
            throw new Error("Error al actualizar Government");
        }
    }

    export const removeGovernment = async (id) => {
        try {
            const response = await http.delete(`${baseURL}/${id}`);
            console.log(response);
            return response.status === 204;
        } catch (error) {
            throw new Error("Error al eliminar Government");
        }
    }

