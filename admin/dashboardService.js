// Validar token
const token = localStorage.getItem("token");
if (!token) {
    alert("Token inválido. Inicia sesión nuevamente.");
    window.location.href = "../index.html";
}

function inicio() {
    document.getElementById("contenido").innerHTML = "<h3>Página de inicio del dashboard</h3>";
}

async function usuarios() {
    try {
        const res = await fetch("https://reqres.in/api/users?page=1");
        const data = await res.json();

        let html = "<h3>Usuarios</h3><ul class='list-group'>";
        data.data.forEach(user => {
            html += `<li class='list-group-item'>${user.first_name} ${user.last_name} - ${user.email}</li>`;
        });
        html += "</ul>";

        document.getElementById("contenido").innerHTML = html;
    } catch (err) {
        console.error("Error cargando usuarios:", err);
    }
}

async function productos() {
    try {
        const res = await fetch("https://reqres.in/api/products?page=1");
        const data = await res.json();

        let html = "<h3>Productos</h3><ul class='list-group'>";
        data.data.forEach(prod => {
            html += `<li class='list-group-item'>${prod.name} - ${prod.color}</li>`;
        });
        html += "</ul>";

        document.getElementById("contenido").innerHTML = html;
    } catch (err) {
        console.error("Error cargando productos:", err);
    }
}

function salir() {
    localStorage.removeItem("token");
    window.location.href = "../index.html";
}
