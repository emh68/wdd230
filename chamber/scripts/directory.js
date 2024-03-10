const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');
const display = document.querySelector('article');
const membersData = "https://emh68.github.io/wdd230/chamber/data/members.json";
const article = document.querySelector('.article');


async function getMembers() {
    const response = await fetch(membersData);
    const data = await response.json();

    /* ---- Remove after testing ---- */
    console.log(data);
    /* ------------------------------*/
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
        // image.src = member.image;
        // image.alt = member.name;
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
        image.setAttribute('width', '400');
        image.setAttribute('height', '400');

        card.classList.add('member-card');
        details.classList.add('member-details');

        details.append(name, address, phone, website, membership);
        card.append(image, details);
        display.appendChild(card);

    });
}

getMembers();


// function displayMembers(members) {
//     members.forEach(member => {
//         const card = createMemberCard(member);
//         membersGrid.appendChild(card);

//         const listItem = document.createElement('li');
//         listItem.textContent = member.name;
//         membersList.appendChild(listItem);
//     });
// }

// function toggleView(viewType) {
//     display.classList.toggle('grid', viewType === 'grid');
//     display.classList.toggle('list', viewType === 'list');
// }

// gridButton.addEventListener('click', () => toggleView('grid'));
// listButton.addEventListener('click', () => toggleView('list'));