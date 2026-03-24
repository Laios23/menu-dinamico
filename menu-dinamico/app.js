let data = [];

fetch('menu.json')
  .then(res => res.json())
  .then(json => {
    data = json.menu;
    renderMenu();
  });

function renderMenu() {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  const ul = document.createElement("ul");

  data.forEach(item => {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.textContent = item.nombre;
    a.href = item.enlace || "#";

    li.appendChild(a);

    // Submenú
    if (item.submenu) {
      const subUl = document.createElement("ul");

      item.submenu.forEach(sub => {
        const subLi = document.createElement("li");
        const subA = document.createElement("a");

        subA.textContent = sub.nombre;
        subA.href = sub.enlace;

        subLi.appendChild(subA);
        subUl.appendChild(subLi);
      });

      li.appendChild(subUl);
    }

    ul.appendChild(li);
  });

  menu.appendChild(ul);
}

// Agregar opción dinámica
function agregarOpcion() {
  const nombre = document.getElementById("nombre").value;
  const enlace = document.getElementById("enlace").value;

  if (!nombre || !enlace) {
    alert("Completa todos los campos");
    return;
  }

  const nuevo = {
    id: Date.now(),
    nombre,
    enlace
  };

  data.push(nuevo);
  renderMenu();
}