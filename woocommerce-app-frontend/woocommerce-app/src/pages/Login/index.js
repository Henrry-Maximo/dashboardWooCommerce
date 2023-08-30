import React from "react";

const UserPost = () => {
  // React.useState: utilizado para criar uma variável e uma função (variável vazia)
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event) {
    // evitar de re-carregar a página quando o botão for pressionado
    event.preventDefault()

    // por padrão, o fetch trabalha como 'get'. É necessário passar um get
    fetch('https://dogsapi.origamid.dev/json/api/user', {
      // especificar o método utilizado
      method: 'POST',
      // cabeçalhos: informar pro servidor os dados que irão
      headers: {
        'Content-Type': 'application/json',
      },
      // converter qualquer objeto em stringify: JSON.stringifyf (envio de dados)
      body: JSON.stringify({
        username,
        email,
        password
      })
    }).then(response => {
      console.log(response)
      return response.json();
    }).then(json => {
      console.log(json)
      return json;
    })

    // exibir a entrada dos dados
    console.log({
      username,
      email,
      password,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="user"
        value={username}
        onChange={(target) => setUsername(target.value)}
      ></input>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(target) => setEmail(target.value)}
      ></input>
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(target) => setPassword(target.value)}
      ></input>
      <button>Enviar</button>
    </form>
  );
};

export default UserPost;
