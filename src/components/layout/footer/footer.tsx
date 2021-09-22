import React from "react";
import styled from "styled-components";

export default function footer() {
  return (
    <Container>
      <div className="text-center">Developed by Irishstorm</div>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  height: 50px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
`;
