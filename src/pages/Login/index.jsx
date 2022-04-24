import { AnimationContainer, Background, Container, Content } from "./styles";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { FiMail, FiLock } from "react-icons/fi";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "../../services/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

function Login({ authenticated, setAuthenticated }) {
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório!"),
    password: yup
      .string()
      .min(8, "Minimo de 8 digitos")
      .required("Campo Obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmitFucntion = (data) => {
    api
      .post("/user/login", data)
      .then((response) => {
        const { token } = response.data;

        localStorage.setItem("@Doit:token", JSON.stringify(token));

        setAuthenticated(true);

        return history.push("/dashboard");
      })
      .catch((err) => toast.error("Email ou senha inválidos"));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFucntion)}>
            <h1>Login</h1>

            <Input
              icon={FiMail}
              label="Email"
              placeholder="Seu melhor email"
              register={register}
              name="email"
              error={errors.email?.message}
            />
            <Input
              icon={FiLock}
              label="Senha"
              type="password"
              placeholder="Uma senha bem segura"
              register={register}
              name="password"
              error={errors.password?.message}
            />

            <Button type="Submit">Enviar</Button>
            <p>
              Não tem uma conta? Faça seu <Link to="/signup"> cadastro</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
}

export default Login;
