const apiKey = "5b26701f9a41474fb447748a348bf24c";

const blogContainer = document.getElementById("blog-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


async function fetchRandomNews(){
    try{
        // const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pagesize=12&apikey=${apiKey}`;
        const apiUrl = `https://newsapi.org/v2/everything?q=tesla&pagesize=12&sortBy=publishedAt&apiKey=${apiKey}`;
        // const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error){
        console.error("Error fetching random news",error);
        return[];

    }
}

searchButton.addEventListener("click", async ()=>{
    const query = searchInput.value.trim();
    if(query != ""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);

        } catch(error){
            console.log("error fetching data by query",error);

        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pagesize=12&sortBy=publishedAt&apiKey=${apiKey}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error){
        console.error("Error fetching random news",error);
        return[];

    }

}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article)=>{
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;

        const title = document.createElement("h2")
        
        const truncatedTitle = article.title.length > 30? 
        article.title.slice(0,30) + "..." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDescription = article.description.length > 150? 
        article.description.slice(0,150) + "..." : article.description;
        description.textContent = truncatedDescription;
        
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.addEventListener("click", ()=>{
            window.open(article.url, "_blank")
        })

        blogContainer.appendChild(blogCard);

})
}
(async ()=>{
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);

    } catch(error){
        console.error("Error fetching random news",error);
    }
})();