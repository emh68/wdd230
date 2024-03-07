const baseURL = "https://emh68.github.io/wdd230/";
const linksURL = "https://emh68.github.io/wdd230/data/links.json";
const learningActivitiesSection = document.querySelector('.learning-activities ul');

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    // console.log(data);
    displayLinks(data.lessons);
}

function displayLinks(weeks) {
    weeks.forEach(week => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `Week ${week.lesson}: `

        week.links.forEach((link, index) => {
            let linkElement = document.createElement('a');
            linkElement.href = `${baseURL}${link.url}`;
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

getLinks();