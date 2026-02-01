function getNewsIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}
const categoryId = getNewsIdFromUrl();

const BASE_URL = "https://webfinalapi.mobydev.kz";

async function fetchAndRenderNewsById(categoryId)  {
    try {
        const response = await fetch(`${BASE_URL}/category/${categoryId}`);
        if (!response.ok) throw new Error(`ошибка HTTP: ${response.status}`);

        const category = await response.json();

        document.querySelector('.categoryName').textContent = categoryName;
        }catch (error) {
        console.error(`Ошибка при получении новости:`, error);

    }
}

document.addEventListener('DOMContentLoaded', () => {
    const categoryId = getNewsIdFromUrl();
    if (categoryId) {
    fetchAndRenderNewsById(categoryId);
    } else {
        console.error('ID новости не найден в URL');

    }
});