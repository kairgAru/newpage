const BASE_URL = "https://webfinalapi.mobydev.kz";
async function deleteNews(id) {
    const authToken = localStorage.getItem("authToken")

    if (!authToken) {
        alert("Авторизуйтесь для удаления");
        return

    }

    const isConfirmed = confirm("Вы уверены что хотите удалить данную новость? ")
    if (!isConfirmed) return;

    try {
        const response = await fetch(`${BASE_URL}/news/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Barer ${authToken}`
            }
        });

        if (response.ok) {
            alert('Новость успешно удалена.');
            fetchAndRenderNews();
        } else {
            alert('Ошибка при удалении новости.');
        }


    } catch (error) {
        console.error('Ошибка', error);
    }
    
}



async function fetchAndRenderNews() {
    try {
        const response = await fetch(`${BASE_URL}/news`);
        if (!response.ok) throw new Error (`Ошибка HTTP: ${response.status}`);

        const newsArray = await response.json();
        document.querySelector('.news-grid').innerHTML = newsArray.map(news =>`
                        <article class="news-card">
                <div class="news-card__image">
                    <img
                        src="${BASE_URL}${news.thumbnail.startsWith('/')? '' : '/' }${news.thumbnail}"
                        alt="${news.title}"
                    />
                </div>

                <div class="news-card__content">
                    <a class="news-card__link" href="./news.html?id=${news.id}">
                        <h2 class="news-card__title">${news.title}</h2>

                        <p class="news-card__attributes">
                            ${news.createdAt} • ${news.category.name}
                        </p>
                    </a>
                </div>

                <div class="news-card__author">
                    <div class="user">
                        <div class="user__avatar">
                            <img
                                src="https://i.pravatar.cc/150?u=admin@admin.com"
                                alt="Аватар"
                            />
                        </div>
                        <p class="user__name">${news.author.name || 'Неизвестный автор'}</p>
                    </div>
                </div>

                <div class="news-card__actions">
                    <a
                        href="./edit.html?id=${news.id}"
                        class="button button--blue button--small"
                    >
                        Редактировать
                    </a>

                    <button
                        type="button"
                        class="button button--red button--small"
                        onclick="deleteNews(${news.id})"
                    >
                        Удалить
                    </button>
                </div>
            </article>
            `).join('');
    } catch (error) {
        console.error('Ошибка при получении новостей:', error);

    }
}
document.addEventListener('DOMContentLoaded', fetchAndRenderNews);


function setupActionButtons() {
    const authToken = localStorage.getItem("authToken");

    const headerAuth = document.querySelector(".header__auth");
    if (authToken) {
        headerAuth.innerHTML = `<button class="button button--blue" onclick="logout()">Выйти</button>` ;
    }

    document.querySelectorAll(".news-card__actions a.button--blue").forEach(link => {
        link.addEventListener("click", event => {
            if (!authToken) {
                event.preventDefault();
                alert ("Авторизуйтесь для редактирования.");
            }
        });
    });

    document.querySelectorAll(".news-card__actions button.button--red"). forEach(button => {
        button.addEventListener("click", () => {
            if (!authToken) return alert ("Авторизуйтесь для удаления.");
            // deleteNews(button.getAttribute("onclick").match(/\d+/)[0]);
        });
    });

}

function displayCreateButton() {
    if (localStorage.getItem("authToken")) {
        const createButton = document.createElement("button");
        createButton.className = "button button--green";
        createButton.textContent = "+";
        createButton.onclick = () => (window.location.href = "./create.html");
        document.querySelector('.news-grid').before(createButton);

    }

}

function logout() {
    localStorage. removeItem("authToken");
    window. location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderNews ();
    displayCreateButton();
    setupActionButtons();


});