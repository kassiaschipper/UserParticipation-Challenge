import styled from "styled-components";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import client from "../../service/userParticipationService";

const GET_USERS = gql`
  query GetUsers {
    users {
      name
      lastName
      participation
    }
  }
`;


export default function Table(){
    const { loading, error, data } = useQuery(GET_USERS, { client });
    const listParticipations = [];

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
    return(
        <TableWrappewer>
        <TableContent>
          <thead>
            <tr>
              <TableHeader></TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Last Name</TableHeader>
              <TableHeader>Participation</TableHeader>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user, index) => (
              <tr key={index}>
                <TableData>{index + 1}</TableData>
                <TableData>{user.name}</TableData>
                <TableData>{user.lastName}</TableData>
                <TableData>{`${percenatage(user.participation)}%`}</TableData>
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
`;