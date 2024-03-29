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