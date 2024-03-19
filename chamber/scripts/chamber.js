// Dynamically populate the current year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Dynamically populate the last modified date
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Hamburger navigation button
// Store the selected elements 
const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

// Add click event listener to hamburger button and use callback function to toggle list element's list of classes.
hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});

// Toggle dark mode
const modeButton = document.querySelector('#modeToggle');
const body = document.querySelector('body');
const main = document.querySelector('main');

modeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode', modeButton.checked);
    main.classList.toggle('dark-mode', modeButton.checked);
});


const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');
const display = document.querySelector('article');
const membersData = "https://emh68.github.io/wdd230/chamber/data/members.json";

async function getMembers() {
    const response = await fetch(membersData);
    const data = await response.json();

    // displayMembers(data.members);
    createMemberCard(data.members);
}

// Function to randomly select members with membership level Silver or Gold
function selectRandomSilverGoldMembers(members, count) {
    const silverGoldMembers = members.filter(member => member.membershiplvl === 'Silver' || member.membershiplvl === 'Gold');
    const selectedMembers = [];

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * silverGoldMembers.length);
        selectedMembers.push(silverGoldMembers[randomIndex]);
    }

    return selectedMembers;
}

// Function to display randomly selected members on index.html
async function displayRandomSilverGoldMembers(count) {
    const response = await fetch(membersData);
    const data = await response.json();
    const randomMembers = selectRandomSilverGoldMembers(data.members, count);

    randomMembers.forEach(member => {
        createMemberCard([member]); // Passing as an array to keep the same structure as createMemberCard function
    });
}

// Initialize by displaying random members
async function initialize() {
    await displayRandomSilverGoldMembers(2); // Change the argument to display 2 or 3 members
}

// Call initialize() when the page loads
initialize();

const createMemberCard = (members) => {
    members.forEach((member) => {
        let card = document.createElement('article');
        let image = document.createElement('img');
        let details = document.createElement('div');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let membership = document.createElement('p');
        name.textContent = member.name;
        let addressParts = member.address.split(', ');
        let streetAddress = addressParts[0];
        let cityStateZip = addressParts.slice(1).join(', ');
        address.innerHTML = `${streetAddress}<br>${cityStateZip}`;
        phone.textContent = member.phone;
        website.href = member.websiteURL;
        website.textContent = member.websiteURL;
        membership.textContent = `Membership Level: ${member.membershiplvl}`;
        image.setAttribute('src', member.image);
        image.setAttribute('alt', `Logo of ${member.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '160');

        details.classList.add('member-details');

        details.append(name, address, phone, website, membership);
        card.append(image, details);
        display.appendChild(card);

    });
}

const toggleView = (viewType) => {
    if (viewType === 'list') {
        display.classList.add('membersList');
    } else {
        display.classList.remove('membersList');
    }
}

// Event listeners for grid and list buttons
gridButton.addEventListener('click', () => {
    toggleView('grid');
});

listButton.addEventListener('click', () => {
    toggleView('list');
});

// Initialize with default grid view
getMembers();
toggleView('grid'); // Grid is the default view