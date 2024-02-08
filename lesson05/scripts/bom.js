const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');
const messageDiv = document.querySelector('.message');

button.addEventListener('click', function addChapter() {
    const validInputRegex = /^[a-zA-Z]+\s\d{1,2}$/;
    if (validInputRegex.test(input.value)) {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');
        li.textContent = input.value;
        deleteButton.textContent = '❌';
        li.append(deleteButton);
        list.append(li);

        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });

        input.focus();
        input.value = '';
        messageDiv.textContent = '';
    }
    else {
        messageDiv.textContent = 'Please enter a valid input in the format "Book Chapter" (e.g., "Helaman 5" or "Alma 14").';
    }
});
