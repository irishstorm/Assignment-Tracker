import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = "http://localhost:5000/assignments";
/*
    All hooks need to be named use.
    only use hooks in components or other hooks
*/

/** The supported values for assignment statuses */
export type Status = "Done" | "In progress" | "Won't do" | "Not Started";

/* Interfaces should be the source of truth for your data */
export interface Assignment {
  _id: string;
  assignment: string;
  subject: string;
  dueDate: string;
  status: Status;
}

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchAssignments = () =>
      axios
        .get(`${apiUrl}`)
        .then((res) => setAssignments(res.data))
        .catch((error) => console.log(error));

    const handle = window.setInterval(fetchAssignments, 10000);
    fetchAssignments();

    return () => {
      window.clearInterval(handle);
    };
  }, []);

  return assignments;
}

export function useFilteredAssignments(filter?: Status) {
  const assignments = useAssignments();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filtered, setFiltered] = useState(assignments);

  useEffect(() => {
    setFiltered(
      assignments.filter(
        (assignment) => !filter || assignment.status === filter
      )
    );
  }, [assignments, filter]);

  return assignments;
}

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
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.response.data));
};
