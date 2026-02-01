function getNewsIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}
const newsId = getNewsIdFromUrl();

const BASE_URL = "https://webfinalapi.mobydev.kz";

async function fetchAndRenderNewsById(newsId)  {
    try {
        const response = await fetch(`${BASE_URL}/news/${newsId}`);
        if (!response.ok) throw new Error(`ошибка HTTP: ${response.status}`);

        const news = await response.json();

        document.querySelector('.news-title').textContent = news.title;
        document.querySelector('.news-author').textContent = news.author.name;
        document.querySelector('.news-date').textContent = new Date (news.createdAt).toLocaleDateString();
        document.querySelector('.news-category').textContent = news.category.name;
        document.querySelector('.news-image' ) .src = `${BASE_URL}${news.thumbnail}`;
        document.querySelector('.news-content').textContent = news.content;
    }catch (error) {
        console.error(`Ошибка при получении новости:`, error);

    }
}

document.addEventListener('DOMContentLoaded', () => {
    const newsId = getNewsIdFromUrl();
    if (newsId) {
    fetchAndRenderNewsById(newsId);
    } else {
        console.error('ID новости не найден в URL');

    }
});