import styled from "styled-components";
import HomeBg from "../images/Home.jpg";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${HomeBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

function Home() {
  return <Container></Container>;
}

export default Home;
