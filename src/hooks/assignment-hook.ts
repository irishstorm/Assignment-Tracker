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
