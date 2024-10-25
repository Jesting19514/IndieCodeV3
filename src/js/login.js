const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita que el formulario recargue la página
  const username = document.getElementById("usernameForm");
  const password = document.getElementById("passwordForm");
  try {
    const responseData = await window.authentication.login(
      username.value,
      password.value
    ); // Hacer la petición
    alert(JSON.stringify(responseData));
  } catch (error) {
    alert(error);
  }
});
