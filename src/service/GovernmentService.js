import http from "../http-common";

const getAll = () => {
    return http.get("government");
  };
  
  const get = id => {
    return http.get(`government/${id}`);
  };
  
  const create = data => {
    return http.post("government", data);
  };
  
  const update = (data) => {
    return http.put(`government`, data);
  };
  
  const GovernmentService = {
    getAll,
    get,
    create,
    update

  };
  
  export default GovernmentService;