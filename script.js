
console.log("JS funcionando correctamente");

function generar() {
  let longitud = document.getElementById("longitud").value;
  let caracteres = "";

  if (document.getElementById("mayus").checked)
    caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (document.getElementById("minus").checked)
    caracteres += "abcdefghijklmnopqrstuvwxyz";

  if (document.getElementById("numeros").checked)
    caracteres += "0123456789";

  if (document.getElementById("simbolos").checked)
    caracteres += "!@#$%^&*()_+[]{}";

  if (caracteres === "") {
    alert("Selecciona al menos una opción");
    return;
  }

  let contraseña = "";

  for (let i = 0; i < longitud; i++) {
    let random = Math.floor(Math.random() * caracteres.length);
    contraseña += caracteres[random];
  }

  document.getElementById("resultado").innerText = contraseña;

  // 🔥 NUEVA LÓGICA INTELIGENTE
  let password = contraseña;
  let fuerza = 0;

  // Longitud
  if (password.length >= 8) fuerza++;
  if (password.length >= 12) fuerza++;
  if (password.length >= 16) fuerza++;

  // Tipos de caracteres
  if (/[A-Z]/.test(password)) fuerza++;
  if (/[a-z]/.test(password)) fuerza++;
  if (/[0-9]/.test(password)) fuerza++;
  if (/[^A-Za-z0-9]/.test(password)) fuerza++;

  // Penalizaciones
  if (/123|abc|qwerty/i.test(password)) fuerza--;
  if (/(.)\1\1/.test(password)) fuerza--;

  // Limitar rango
  if (fuerza < 0) fuerza = 0;
  if (fuerza > 6) fuerza = 6;

  let barra = document.getElementById("fuerza");
  let nivelTexto = document.getElementById("nivel");

  // 🎨 RESULTADO VISUAL (solo UNA vez)
  if (fuerza <= 2) {
    barra.style.width = "25%";
    barra.style.background = "#ef4444";
    nivelTexto.innerText = "🔴 Débil";
  } 
  else if (fuerza <= 4) {
    barra.style.width = "60%";
    barra.style.background = "#f59e0b";
    nivelTexto.innerText = "🟡 Media";
  } 
  else {
    barra.style.width = "100%";
    barra.style.background = "#22c55e";
    nivelTexto.innerText = "🟢 Fuerte";
  }
}

function copiar() {
  let texto = document.getElementById("resultado").innerText;
  let boton = document.getElementById("btnCopiar");

  if (!texto) {
    boton.innerText = "⚠️ Nada que copiar";
    return;
  }

  navigator.clipboard.writeText(texto)
    .then(() => {
      boton.innerText = "✔ Copiado";
      boton.classList.add("copiado");

      setTimeout(() => {
        boton.innerText = "📋 Copiar";
        boton.classList.remove("copiado");
      }, 2000);
    })
    .catch(() => {
      let textarea = document.createElement("textarea");
      textarea.value = texto;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      boton.innerText = "✔ Copiado";
      boton.classList.add("copiado");

      setTimeout(() => {
        boton.innerText = "📋 Copiar";
        boton.classList.remove("copiado");
      }, 2000);
    });
}

