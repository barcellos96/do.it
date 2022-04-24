import { Container, Content } from "./styles";
import Button from "../../components/Button";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";

function Home({ authenticated }) {
  const history = useHistory();

  const handleNavigation = (path) => {
    return history.push(path);
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Content>
        <h1>
          do<span>.</span>it
        </h1>
        <p>Organize-se de forma facil e efetiva</p>
        <div>
          <Button onClick={() => handleNavigation("/signup")} whiteSchema>
            Cadastre-se
          </Button>
          <Button onClick={() => handleNavigation("/login")}>Login</Button>
        </div>
      </Content>
    </Container>
  );
}

export default Home;
