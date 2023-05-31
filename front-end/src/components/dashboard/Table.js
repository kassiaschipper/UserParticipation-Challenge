import styled from "styled-components";
import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import client from "../../service/userParticipationService";
import { FaTrash } from "react-icons/fa";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      lastName
      participation
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(id: $userId) {
      code
      message
      status
    }
  }
`;

export default function Table(){
    const { loading, error, data } = useQuery(GET_USERS, { client });
    const listParticipations = [];
    const [deleteUser] = useMutation(DELETE_USER, { client });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const totalParticipation = data.users

    totalParticipation.map((user) => {
        listParticipations.push(user.participation);
    })    
    const sumOfParticipations = listParticipations.reduce((acc, curr) => acc + curr, 0);
  
    function percenatage(participation){
        return ((participation/sumOfParticipations)*100).toFixed(2)
    }

    const handleDelete = (userId) => {
      deleteUser({
        variables: { userId },
        refetchQueries:[{ query:GET_USERS }]
      }).catch((error) => {
        console.error('Erro ao deletar' , error);
      });
    };
    return(
        <TableWrappewer>
        <TableContent>
          <thead>
            <tr>
              <TableHeader></TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Last Name</TableHeader>
              <TableHeader>Participation</TableHeader>
              <TableHeader>Delete</TableHeader>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user, index) => (
              <tr key={index}>
                {console.log(user)}
                <TableData>{index + 1}</TableData>
                <TableData>{user.name}</TableData>
                <TableData>{user.lastName}</TableData>
                <TableData>{`${percenatage(user.participation)}%`}</TableData>
                <TableData><button onClick={() => handleDelete(user.id)}
          >
            <FaTrash color="red"/>
          </button></TableData>
              </tr>
            ))}
          </tbody>
        </TableContent>
      </TableWrappewer>
    )

}

const TableWrappewer = styled.div`
  margin-top: 20px;
  margin-left: 1rem;
  height: 40vh;
  width: 40vw;
  text-align: center;
  thead{
    font-size: 1.2rem;
    color: black;
    background-color: lightgrey;
    }
`;

const TableContent = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid lightgrey;  
`;

const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  border: 1.5px solid lightgrey;
  text-align: center;
  `;

const TableData = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  border: 1px solid lightgrey;

  button{
    background-color: transparent;
    border: none;
  }
`;