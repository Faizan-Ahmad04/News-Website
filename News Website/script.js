let API_KEY = "cbbdeefd540b4e128d879baa0c328c3b";
let url = "https://newsapi.org/v2/everything?q=";

// wind load event
window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews (query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

const bindData = (articles) =>{
    const cardsContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML="";
    
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCards(cardClone,article);
        cardsContainer.appendChild(cardClone);

    });
}

const fillDataInCards = (cardClone,article) => {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#new-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src= article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name} - ${date}`;
    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
const onNavItenClick = (id)=> {
    fetchNews(id);  
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');  
}

const searchButton = document.getElementById('button-search');
const searchText = document.getElementById('inpuText');

searchButton.addEventListener('click', ()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);

    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
});




