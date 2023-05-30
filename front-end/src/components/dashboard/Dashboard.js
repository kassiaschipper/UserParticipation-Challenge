import styled from "styled-components";
import ParticipationChart from "./ParticipationChart";
import Table from "./Table";

export default function Dashboard() {
  return (
    <>
    <TitleWrapper><h1>DATA</h1>
    <p>Data regarding users participation</p>
    </TitleWrapper>
    <DashboardWrapper>
      <Table></Table>
      <ParticipationChart></ParticipationChart>
    </DashboardWrapper>
    </>
  );
}

const DashboardWrapper = styled.div`
width: 90vw;
height: 90vw;
margin: 0 auto;

display: flex;
justify-content: space-between;

`;
const TitleWrapper = styled.div`
width: 90vw;
height: 1vw;
height: 5vw;
margin: 0 auto;

display: flex;
flex-direction: column;


justify-content: center;
align-items: center;
color: rgb(78, 78,79);
font-family: Arial, Helvetica, sans-serif;

h1{
  font-size: 2rem;
  padding-bottom: 0.5rem;
}
`