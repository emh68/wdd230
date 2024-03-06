const baseURL = "https://www.github.io/emh68/wdd230/";
const linksURL = "https://www.github.io/emh68/wdd230/data/links.json";

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    console.log(data);
}

getLinks();