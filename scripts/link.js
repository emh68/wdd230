// Dynamically populate Learning Activity links
const baseURL = "https://emh68.github.io/wdd230/";
const linksURL = "https://emh68.github.io/wdd230/data/links.json";
const learningActivitiesSection = document.querySelector('.learning-activities ul');

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    console.log(data);
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

// Dynamically populate weather info.



// Dynamically populate iframe map
// function loadMap() {
//     let mapContainer = document.querySelector('#map-container');
//     let iframe = document.createElement('iframe');
//     iframe.src = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13693.115600552277!2d-111.79146195040659!3d43.82217967670141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1706422928546!5m2!1sen!2sus';
//     iframe.width = 400;
//     iframe.height = 250;
//     iframe.title = 'Google Map of Rexburg, ID';
//     iframe.allowfullscreen = true;
//     iframe.referrerpolicy = 'no-referrer-when-downgrade';
//     iframe.loading = 'lazy';
//     mapContainer.appendChild(iframe);
// }

// // Load the map after the page has loaded
// window.addEventListener('load', loadMap);