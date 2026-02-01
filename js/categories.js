const BASE_URL = "https://webfinalapi.mobydev.kz";

async function deleteCategories(id) {
    const authToken = localStorage.getItem("authToken")

    if (!authToken) {
        alert("Авторизуйтесь для удаления");
        return

    }

    const isConfirmed = confirm("Вы уверены что хотите удалить данную новость? ")
    if (!isConfirmed) return;

    try {
        const response = await fetch(`${BASE_URL}/category/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (response.ok) {
            console.log(id)
            alert('Новость успешно удалена.');
            fetchAndRenderCategories();
        } else {
            alert('Ошибка при удалении новости.');
        }


    } catch (error) {
        console.error('Ошибка', error);
    }
    
}



async function fetchAndRenderCategories() {
    try {
        const response = await fetch(`${BASE_URL}/categories`);
        if (!response.ok) throw new Eror (`Ошибка HTTP: ${response.status}`);

        const newsArray = await response.json();
        document.querySelector('.categories').innerHTML = newsArray.map(categories =>`
            <div class="category">
            <a class="news-card__link" href="./categorID.html?id=${categories.id}">
                <span class="name">${categories.name}</span>
                </a>
                <div class="actions">
                    <a
                        href="./edit2.html"
                        class="button button--blue button--small"
                        >
                        Редактировать
                    </a>
                    <button
                        type="button"
                        class="button button--red button--small"
                        onclick="deleteCategories(${categories.id})"
                        >
                        Удалить
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Ошибка при получении новостей:', error);

    }
}
document.addEventListener('DOMContentLoaded', fetchAndRenderCategories);






function setupActionButtons() {
    const authToken = localStorage.getItem("authToken");

    const headerAuth = document.querySelector(".header__auth");
    if (authToken) {
        headerAuth.innerHTML = `<button class="button button--blue" onclick="logout()">Выйти</button>` ;
    }

    document.querySelectorAll(".actions a.button--blue").forEach(link => {
        link.addEventListener("click", event => {
            if (!authToken) {
                event.preventDefault();
                alert ("Авторизуйтесь для редактирования.");
            }
        });
    });

    document.querySelectorAll(".actions button.button--red"). forEach(button => {
        button.addEventListener("click", () => {
            if (!authToken) return alert ("Авторизуйтесь для удаления.");
            deleteCatedories(button.getAttribute("onclick").match(/\d+/)[0]);
        });
    });

}

function displayCreateButton() {
    if (localStorage.getItem("authToken")) {
        const createButton = document.createElement("button");
        createButton.className = "button button--green";
        createButton.textContent = "+";
        createButton.onclick = () => (window.location.href = "./create2.html");
        document.querySelector('.categories').before(createButton);

    }

}

function logout() {
    localStorage. removeItem("authToken");
    window. location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderCategories();
    displayCreateButton();
    setupActionButtons();


});