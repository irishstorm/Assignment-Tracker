import React, { useState } from "react";
import styled from "styled-components";
import Subjects from "../../../data/subjects.json";
import { addAssignment } from "../../../api/api";
import StatusData from "../../../data/status.json";

export default function AddAssignment() {
  let todaysDate =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);
  const [assignment, setAssignment] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState(todaysDate);
  const [status, setStatus] = useState("");

  const changeOnClick = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    setAssignment("");
    setSubject("");
    setDueDate("");
    setStatus("");

    addAssignment({ assignment, subject, dueDate, status });
  };

  return (
    <Container>
      <form className="row jumbotron" onSubmit={changeOnClick}>
        <div className="col-md-4 col-sm-12">
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
            required
          />
        </div>

        <div className="col-md-2 col-sm-12">
          <label className="mb-3 ">
            <strong>Subject</strong>
          </label>
          <select
            className="form-control"
            name="subject"
            id="subject"
            defaultValue={subject}
            onChange={(e: React.ChangeEvent<any>) => {
              setSubject(e.target.value);
            }}
          >
            <option>Subjects</option>
            {Subjects.map((index, key) => {
              return <option key={key}>{index.name}</option>;
            })}
          </select>
        </div>

        <div className="col-md-2 col-sm-12">
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
              setDueDate(e.target.value);
            }}
          ></input>
        </div>

        <div className="col-md-2 col-sm-12">
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

        <div className="col-md-2 col-sm-12">
          <label className="mb-3 ">&nbsp;</label>
          <button type="submit" className="btn btn-success btn-create">
            Create
          </button>
        </div>
      </form>
    </Container>
  );
}

const Container = styled.div`
  .jumbotron {
    padding: 30px;
    background-color: #e9ecef;
    border-radius: 0.3rem;
  }

  .btn-create {
    width: 100%;
  }
`;
