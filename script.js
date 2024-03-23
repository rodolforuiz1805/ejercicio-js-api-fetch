console.log("Accediste al Api");
const button = document.getElementById('btn');
button.addEventListener("click", solicitudFetch);
let cardRow = document.getElementById("cardRow");
let spinner = document.getElementById("spinner");

const localStorageTimeLimit_s = 60;

function solicitudFetch() {
    cardRow.innerHTML = ""; 
    spinner.style.display = "block"; 

    const users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
    console.log(typeof users);

    if (users && users.time > Date.now()) {
        fetchData(users.data);
        spinner.style.display = "none"; 
    } else {
        fetch("https://reqres.in/api/users?delay=3")
            .then((response) => {
                if (response.status === 200) {
                    console.log("Estado de la petición: Realizada");
                    return response.json();
                }
            })
            .then((users) => {
                const usersData = {
                    data: users.data,
                    time: Date.now() + 60000,
                };
                cardRow.innerHTML = "";
                localStorage.setItem("users", JSON.stringify(usersData));
                fetchData(users.data);
                spinner.style.display = "none"; 
            })
            .catch((err) => {
                console.log("Error en la petición:", err);
                console.warn("Estado de la petición:", err.status);
            });
    }
}

function fetchData(users) {
    users.forEach((user) => {
        cardRow.innerHTML += `
            <div class="col-md-6 mb-3 "> 
                <div class="card">
                    <img src="${user.avatar}" class="card-img-top" alt="${user.first_name}">
                    <div class="card-body">
                        <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
                        <p class="card-text">${user.email}</p>
                    </div>
                </div>
            </div>`;
    });
}