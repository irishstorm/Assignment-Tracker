import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Subjects from "../../../data/subjects.json";

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
  const [errMessage, setErrMessage] = useState("");

  const changeOnClick = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    setAssignment("");
    setSubject("");
    setDueDate("");
    setStatus("");

    axios
      .post("http://localhost:5000/assignments/add", {
        assignment,
        subject,
        dueDate: dueDate,
        status,
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        setErrMessage(err.response.data);
      });
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
            <option value="Done">Done</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Won't do">Won't do</option>
          </select>
        </div>

        <div className="col-md-2 col-sm-12">
          <label className="mb-3 ">&nbsp;</label>
          <button type="submit" className="btn btn-success btn-create">
            Create
          </button>
        </div>
      </form>
      <div className="mt-2 text-center shake">{errMessage}</div>
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
