const authToken = localStorage.getItem("authToken");

const headerAuth = document.querySelector(".header__auth");
if (authToken) {
    headerAuth.innerHTML = `<button class="button button--red" onclick="logout()">Выйти</button>`;

}

document.querySelector('.button--blue').addEventListener('click', async (event) => {
    event.preventDefault();

    const name = document.querySelector('.name-input').value;
    


    if (!name) {
        alert('Пожалуйста запоните все поля');
        return;
    }

  


    try {
        const response = await fetch ('https://webfinalapi.mobydev.kz/category', {
            method: 'POST',
            headers:{
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json",

                // 'Accept': 'application/json',

            },
            body: JSON.stringify({name})
        
        });
        if (response.ok) {

    //         for (let pair of formData.entries()) {
    // console.log(pair[0], pair[1]);

                alert('Категория успешно добавлена!');
                window.location.href = './categories.html';
        } else {
            alert("Ошибка при добавлении категории.");
        }
    } catch (error) {
        console.error('Ошибка', error);
    }


});