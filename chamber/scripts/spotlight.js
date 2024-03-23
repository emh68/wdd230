const display = document.querySelector('.membersGrid');
const membersData = "https://emh68.github.io/wdd230/chamber/data/members.json";

// Function to fetch members data
async function getMembers() {
    const response = await fetch(membersData);
    const data = await response.json();
    return data.members;
}

// Randomly select members with membership level Silver or Gold
function selectRandomSilverGoldMembers(members, count) {
    const silverGoldMembers = members.filter(member => member.membershiplvl === 'Silver' || member.membershiplvl === 'Gold');
    const selectedMembers = [];

    // Ensure that selected members are unique
    while (selectedMembers.length < count && silverGoldMembers.length > 0) {
        const randomIndex = Math.floor(Math.random() * silverGoldMembers.length);
        const selectedMember = silverGoldMembers[randomIndex];
        if (!selectedMembers.some(member => JSON.stringify(member) === JSON.stringify(selectedMember))) {
            selectedMembers.push(selectedMember);
        }
        // Remove selected member to avoid duplication
        silverGoldMembers.splice(randomIndex, 1);
    }

    return selectedMembers;
}


// Display randomly selected members
async function displayRandomSpotlightMembers(count) {
    const members = await getMembers();
    const selectedMembers = selectRandomSilverGoldMembers(members, count);

    // Display the selected members
    createMemberCard(selectedMembers);
}

// Initialize by displaying random members
async function initialize() {
    await displayRandomSpotlightMembers(2); // Number of members to display
}

// Create member article
const createMemberCard = (members) => {
    // Clear existing cards
    display.innerHTML = '';

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

// Call initialize() when the page loads
initialize();
