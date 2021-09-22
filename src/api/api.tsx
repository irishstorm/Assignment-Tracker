import axios from "axios";

const apiUrl = "http://localhost:5000/assignments";

export const deleteAssignment = (_id: string) => {
  axios
    .delete(`${apiUrl}/${_id}`)
    .then((res) => window.location.reload())
    .catch((error) => console.log(error));
};

export const updateAssignment = (_id: string, _payload: any) => {
  axios
    .put(`${apiUrl}/update/${_id}`, _payload)
    .then((res) => window.location.reload())
    .catch((err) => console.log(err.data));
};

export const addAssignment = (_payload: any) => {
  axios
    .post(`${apiUrl}/add`, _payload)
    .then((res) => window.location.reload())
    .catch((err) => console.log(err.response.data));
};
