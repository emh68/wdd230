// Directory toggle between grid and list view
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

// Randomly select members with membership level Silver or Gold
function selectRandomSilverGoldMembers(members, count) {
    const silverGoldMembers = members.filter(member => member.membershiplvl === 'Silver' || member.membershiplvl === 'Gold');
    const selectedMembers = [];

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * silverGoldMembers.length);
        selectedMembers.push(silverGoldMembers[randomIndex]);
    }

    return selectedMembers;
}

// Display randomly selected members
async function displayRandomSpotlightMembers(count) {
    const response = await fetch(membersData);
    const data = await response.json();
    const spotlightMembers = data.members.filter(member => member.membershiplvl === 'Silver' || member.membershiplvl === 'Gold');
    const selectedMembers = [];

    // Randomly select unique members until count is reached
    while (selectedMembers.length < count && spotlightMembers.length > 0) {
        const randomIndex = Math.floor(Math.random() * spotlightMembers.length);
        const selectedMember = spotlightMembers[randomIndex];

        // Check if selected member is not already in selectedMembers array
        if (!selectedMembers.includes(selectedMember)) {
            selectedMembers.push(selectedMember);
        }

        // Remove selected member from spotlightMembers array to avoid selecting it again
        spotlightMembers.splice(randomIndex, 1);
    }

    // Display the selected members
    selectedMembers.forEach(member => {
        createMemberCard([member]);
    });
}

// Initialize by displaying random members
async function initialize() {
    await displayRandomSpotlightMembers(2); // Number of members to display
}

// Call initialize() when the page loads
initialize();

// Create member article
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