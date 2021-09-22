/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import AddAssignment from "./AddAssignment/AddAssignment";
import styled from "styled-components";
import { useFilteredAssignments, Status } from "../../hooks/assignment-hook";
import { deleteAssignment, updateAssignment } from "../../api/api";
import Modal from "react-modal";
import Subjects from "../../data/subjects.json";
import StatusData from "../../data/status.json";

interface AssignmentProps {
  statusFilter?: Status;
}

Modal.setAppElement("#root");
export default function Assignments({ statusFilter }: AssignmentProps) {
  const assignmentFilter = useFilteredAssignments(statusFilter);
  const [assignment, setAssignment] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const setData = (
    _id: string,
    _ass: string,
    _sub: string,
    _date: string,
    _status: string
  ) => {
    setId(_id);
    setAssignment(_ass);
    setSubject(_sub);
    setDate(_date);
    setStatus(_status);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    updateAssignment(id, {
      assignment,
      subject,
      dueDate,
      status,
    });

    setModalOpen(false);
  };

  return (
    <Container className="container mt-5">
      <div className="row">
        <AddAssignment />
      </div>

      <table className="mt-5 table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Assignment</th>
            <th>Subject</th>
            <th>Due Date</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {assignmentFilter.map((i, index) => {
            return (
              <tr key={index}>
                <td>{i.assignment}</td>
                <td>{i.subject}</td>
                <td>{i.dueDate.slice(0, -14)}</td>
                <td>{i.status}</td>
                <td style={{ width: "50px" }}>
                  <i
                    onClick={() => deleteAssignment(i._id)}
                    className="fas fa-trash-alt"
                  ></i>
                </td>
                <td style={{ width: "50px" }}>
                  <i
                    className="fas fa-edit"
                    onClick={() => {
                      setData(
                        i._id,
                        i.assignment,
                        i.subject,
                        i.dueDate,
                        i.status
                      );

                      setModalOpen(true);
                    }}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <form className="row jumbotron mt-5">
          <h1 className="text-center"> Edit </h1>
          <div className="col-sm-12">
            <label className="mb-3 ">
              <strong>Assignment Name</strong>
            </label>
            <input
              type="text"
              className="form-control"
              defaultValue={assignment}
              onChange={(e) => {
                setAssignment(e.target.value);
              }}
            />
          </div>

          <div className="col-sm-12">
            <label className="mb-3 ">
              <strong>Subject</strong>
            </label>
            <select
              className="form-control"
              name="subject"
              id="subject"
              defaultValue={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            >
              {Subjects.map((index, key) => {
                return <option key={key}>{index.name}</option>;
              })}
            </select>
          </div>

          <div className="col-sm-12">
            <label className="mb-3 ">
              <strong>Due Date</strong>
            </label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              name="startDate"
              defaultValue={dueDate}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></input>
          </div>

          <div className="col-sm-12">
            <label className="mb-3 ">
              <strong>Status</strong>
            </label>
            <select
              className="form-control"
              name="status"
              id="status"
              defaultValue={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option>Status</option>
              {StatusData.map((index, key) => {
                return <option key={key}>{index.name}</option>;
              })}
            </select>
          </div>

          <div className="col-sm-12">
            <label className="mb-3 ">&nbsp;</label>
            <button
              type="submit"
              className="btn btn-success btn-create col-sm-12"
              onClick={(e) => handleSubmit(e)}
            >
              Update
            </button>
          </div>
        </form>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  i {
    cursor: pointer;
  }
`;
