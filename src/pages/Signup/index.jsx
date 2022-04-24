import { AnimationContainer, Background, Container, Content } from "./styles";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "../../services/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

function Signup({ authenticated }) {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório!"),
    email: yup.string().email("Email inválido").required("Campo obrigatório!"),
    password: yup
      .string()
      .min(8, "Minimo de 8 digitos")
      .required("Campo Obrigatório"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes")
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

  const onSubmitFucntion = ({ name, email, password }) => {
    const user = { name, email, password };
    api
      .post("/user/register", user)
      .then((response) => {
        toast.success("Sucesso ao criar a conta!");
        return history.push("/login");
      })
      .catch((err) => toast.error("Erro ao criar a conta, tente outro email!"));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFucntion)}>
            <h1>Cadastro</h1>
            <Input
              icon={FiUser}
              label="Name"
              placeholder="Seu nome"
              register={register}
              name="name"
              error={errors.name?.message}
            />
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
            <Input
              icon={FiLock}
              label="Confirmação da senha"
              placeholder="Confirmação da senha"
              type="password"
              register={register}
              name="passwordConfirm"
              error={errors.passwordConfirm?.message}
            />
            <Button type="Submit">Enviar</Button>
            <p>
              Ja tem uma conta? Faça seu <Link to="/login"> Login</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
}

export default Signup;
