const baseURL = "https://emh68.github.io/wdd230/";
const linksURL = "https://emh68.github.io/wdd230/data/links.json";
const learningActivitiesSection = document.querySelector('.learning-activities ul');

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    console.log(data);
}

getLinks();

function displayLinks(weeks) {
    weeks.forEach(week => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `${week.week}: `

        week.links.forEach(link => {
            let linkElement = document.createElement('a');
            linkElement.href = `${baseURL}${linksURL}`;
            linkElement.target = '_blank';
            linkElement.textContent = link.title;
            const separator = document.createTextNode(' | ');

            listItem.appendChild(linkElement);
            listItem.appendChild(separator);
        });

        listItem.lastChild.remove();
        learningActivitiesSection.appendChild(listItem);

    });
}