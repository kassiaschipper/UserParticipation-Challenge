import React from "react";
import { useQuery, gql } from "@apollo/client";
import client from "../../service/userParticipationService";
import { Chart } from "react-google-charts";
import styled from "styled-components";

const GET_USERS = gql`
  query GetUsers {
    users {
      name
      lastName
      participation
    }
  }
`;

export default function ParticipationChart () {
  const { loading, error, data } = useQuery(GET_USERS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const chartData = [["Name", "Participation"]];
  data.users.forEach((user) => {
    chartData.push([`${user.name} ${user.lastName}`, user.participation]);
  });

  const sliceOptions = {};
  chartData.slice(1).forEach((_, index) => {
    sliceOptions[index] = { offset: 0.015 };
  });

  return (
    <ChartWrapper>
      <ChartBox>
       <Chart
        width={"800px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart...</div>}
        data={chartData}
        options={{
          pieSliceText: "none",
          slices: sliceOptions,
          pieHole: 0.4,
        }}
        rootProps={{ "data-testid": "1" }}
      />
      </ChartBox>
    </ChartWrapper>
  );
}

const ChartWrapper = styled.div`
margin-right: 1rem;
margin-top: 20px;
height: 60vh;
width: 40vw;
display: flex;

`
const ChartBox = styled.div`
margin: 0 auto;

`

