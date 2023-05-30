import styled from "styled-components";
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import client from "../../service/userParticipationService";

const CREATE_USER = gql`
mutation AddUser( $name: String!,$lastName: String!,$participation: Int!){
  addUser(user: { name: $name, lastName: $lastName, participation: $participation}){
    code
    message
    status
  }
}
`;

const GET_USERS = gql`
  query GetUsers {
    users {
      name
      lastName
      participation
    }
  }
`;

function Header() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [participation, setParticipation] = useState("");

  const [addUser] = useMutation(CREATE_USER, { client,
  refetchQueries:[{ query:GET_USERS }] });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name || !lastName || !participation) {
      alert("Você deve preencher todos os campos")
      return;
    }

    addUser({
      variables: { name, lastName, participation: parseInt(participation) },
    });

    setName("");
    setLastName("");
    setParticipation("");
  };

  return (
    <HeaderWrapper>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="First name"
          minLength={2}
          value={name}
          onChange={(e) => setName(e.target.value.trim())}
        />
        <input
          type="text"
          placeholder="Last name"
          minLength={2}
          value={lastName}
          onChange={(e) => setLastName(e.target.value.trim())}
        />
        <input
          type="number"
          placeholder="Participation"
          value={participation}
          min={1}
          onChange={(e) => setParticipation(e.target.value)}
        />
        <button type="submit">SEND</button>
      </form>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.div`
  height: 20vh;
  width: 100%;
  background-color: rgb(0, 184, 226, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 2px 10px lightgray;


  input{
    margin-right: 1rem;
    width: 16vw;
    height: 7vh;
    padding-left: 1rem;
    border: none;
  }

  button {
    width: 08vw;
    height: 7vh;
    background-color: rgb(0, 184, 226, 1);
    border: 1px solid white;
    color: white;
  }

`;
