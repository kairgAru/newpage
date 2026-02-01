document.addEventListener("DOMContentLoaded", async () => {
    const authToken = localStorage.getItem("authToken");
    const headerAuth = document.querySelector(".header__auth");

    if (authToken) {
    headerAuth.innerHTML = `<button class="button button--red" onclick="logout()">Выйти</button>`;

    }
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');

    if(categoryId) {
        try {
                
            const response = await fetch(`https://webfinalapi.mobydev.kz/category/${categoryId}`);
            if (response.ok) {
             

            const newsData = await response.json();

            document.querySelector('.name-input').value = newsData.title;
 
            } else {
                alert('Ошибка при загрузке данных');
            }

        } catch (error) {
            console.error('Ошибка', error);

        }
    }
    document.querySelector('.container').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.querySelector('.name-input').value;
  

    if (!title) {
        alert('Пожалуйста запоните все поля');
        return;
    }


  
    try {
        const response = await fetch (`https://webfinalapi.mobydev.kz/category/${categoryId}`, {
            method: 'PUT',
            headers:{
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name})
        
        });
        if (response.ok) {
   
                alert('Новость успешно обновлена!');
                window.location.href = './categories.html';
        } else {
            const errorResponse = await response.json();
            alert("Ошибка при добавлении новости." + (errorResponse.message || 'Проверьте данные.'));
        }
    } catch (error) {
        console.error('Ошибка', error);
    }


    });
    
});