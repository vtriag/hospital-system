export function carregarUsuario() {
  const usuario = localStorage.getItem("usuario");
  return usuario ? JSON.parse(usuario) : null;
}

export function salvarUsuario(dados) {
  localStorage.setItem("usuario", JSON.stringify(dados));
}