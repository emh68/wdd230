const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');
const messageDiv = document.querySelector('.message');

// Declare an array named chaptersArray and assign it to the results of a defined function named getChapterList
let chaptersArray = getChapterList() || [];

// Populate the displayed list of chapters
chaptersArray.forEach(chapter => {
    displayList(chapter);
});

// Change the button click event listener
button.addEventListener('click', () => {
    const validInputRegex = /^(\d\s[A-Z][a-z]*\s\d{1,2}|[A-Z][a-z]*\s\d{1,2})$/;
    if (validInputRegex.test(input.value)) {

        if (input.value !== '') {  // Make sure the input is not empty
            displayList(input.value);  // Call the function that outputs the submitted chapter
            chaptersArray.push(input.value);  // Add the chapter to the array
            setChapterList();  // Update the localStorage with the new array
            input.value = '';  // Clear the input
            input.focus();  // Set the focus back to the input
        }
    }
    else {
        messageDiv.textContent = 'Please enter a valid input in the format "Book Chapter" (e.g., "1 Nephi 3" or "Alma 14").';
    }
});

// Create the displayList defined function
function displayList(item) {
    let li = document.createElement('li');
    let deletebutton = document.createElement('button');
    li.textContent = item; // Note the use of the displayList parameter 'item'
    deletebutton.textContent = '❌';
    deletebutton.classList.add('delete'); // This references the CSS rule .delete{width:fit-content;} to size the delete button
    li.append(deletebutton);
    list.append(li);
    deletebutton.addEventListener('click', function () {
        list.removeChild(li);
        deleteChapter(li.textContent); // Note this new function that is needed to remove the chapter from the array and localStorage.
        input.focus(); // Set the focus back to the input
    });
}

// Define the setChapterList function
function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Define the getChapterList function
function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList')) || [];
}

// Define the deleteChapter function
function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}
