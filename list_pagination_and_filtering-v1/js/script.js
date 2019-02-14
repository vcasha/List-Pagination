/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.


   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/
const searchBar = document.createElement('input');//creates element for the searchbar input
const searchButton = document.createElement('button');//button for executing search
let searchText = searchBar.value;//variable for holding the input value of the searchBar
const studentList = document.querySelector('.student-list');//parent element of all the students in the list. Needed for calling to make style changes
const searchableList = document.querySelectorAll('h3');//This stores the name of each list item to which the search can be compared against
const searchableEmails = document.querySelectorAll('.email');//this stores the e-mail of each list item to which the search can be compared against
const studentListItems = document.getElementsByClassName('student-item cf');//This is the master list. When the page loads or an event has occurred to display ALL of the list items, this is what displays.
let matchedSearch = []; //creates array for storing the index of the students that match the search. Will use this array to then pass to the array of the master List to then know the index of the items that should be displayed
const pagination = document.createElement('div');//div for holding the pagination tool
pagination.className = 'pagination';
//constant for identifying the # of pages to be displayed in pagination tool. Can be passed a list as an argument and then calculate the # of pages based on the length of the list
const pages = (list) => {return Math.ceil(list.length/10);}

const page = document.querySelector('.page');
const header = document.querySelector('.page-header');//reference element for appending the search bar
//creating all necessary elements for the pagination options container
const pageList = document.createElement('ul');//const element for the <ul> that will hold the indivdual page elements as <li>
pageList.className = 'pageNumbers';//setting class name for getting proper animation/display
page.appendChild(pagination);
pagination.appendChild(pageList);
//this is the constant for storing reference to the div I will use for displaying the 'No Matches found' text
let pageLinks = '';

//This will introduce all needed constants for the display when there is no match found in the search.
const noMatchDisplay = document.createElement('div');
noMatchDisplay.className = 'noMatch'
const parentDiv = studentList.parentNode;
parentDiv.insertBefore(noMatchDisplay,studentList);
noMatchDisplay.style.display = 'none';
const noMatchImage = document.createElement('img');
noMatchImage.setAttribute('src','images/tryAgain.png');
noMatchImage.setAttribute('height', '300');
noMatchImage.setAttribute('width', '500');
noMatchDisplay.appendChild(noMatchImage);
//function for unhiding the list display and hiding the 'noMatch'div when a matched search is found AFTER the user got to a 'No match' result.
function clearNoMatchDisplay (){
  if (studentList.style.display === 'none'){
    studentList.style.display = '';
    pagination.style.display ='';
    noMatchDisplay.style.display = 'none';
  };
}






//function for displaying the proper items related to the active page, whether it is the entire search list or search results
function showPage(list, pageNumber) {
  //these constants are used to identify the index range that should be displayed (while inversely identifying the index range to not be displayed)
  const listStart = (pageNumber - 1)*10;
  const listEnd = listStart + 9;

  //use this display logic when displaying master list
  if(searchBar.value === ''){
    //based on range above, we will loop through the list that was passed in our argument setting the display (or non-display) accordingly.
    for( let i = 0; i < list.length ; i++){
        if (i < listStart || i > listEnd){
        list[i].style.display = 'none';
      }else{
        list[i].style.display = '';
      };
    };
  }else{
    //creating reference for future logic check
    const listCheck = list[listEnd];
    for (let i = 0; i<studentListItems.length; i ++){
      studentListItems[i].style.display = 'none';
    };
    //Option 1 for displaying the matchedSearch items on the page
    //if this variable is undefined it means the array ends before getting to the listEnd item
    //(aka a page without 10 items) so instead looping unitl i<listEnd we just loop until i<list.length
    if (listCheck === undefined){
      for (let i = listStart;i<list.length; i++){
        const index = list[i];
        studentListItems[index].style.display = '';
      };
      //Option 2 for displaying the matchedSearch items on the page
      //if list is long enough to display all 10 then we will use this for loop logic for getting proper list of elements and setting them to be displayed on the page
    } else {
        for (let i = listStart;i<listEnd; i++){
          const index = list[i];
          studentListItems[index].style.display = '';
      };

    };
  }
}

//function for resetting active page to 1 to handle multiple scenarios that occur during search being active
function resetActivePage(){
  const pageOne = pageLinks[0];
  pageOne.className = 'active';
  for (let i = 1; i<pageLinks.length; i++){
    pageLinks[i].className = '';
  };
}

//event handler for running search as a user types into search bar
searchBar.addEventListener('keyup', (e) => {


  searchText += '';
  searchText.toUpperCase();
  if (searchText !== ''){
    if (searchButton.textContent === 'Clear'){
      searchButton.textContent = 'Search';
    };
    resetActivePage();
    clearNoMatchDisplay();
    findAndDisplay();
  } else if (searchText === '') {
    clearNoMatchDisplay();
    matchedSearch =[];
    resetActivePage();
    showPage(studentListItems,1);
    displayPagination (studentListItems, 1);
    }

});

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

//Contains all logic for how many items to displa, which page should be active and has the event handler for the pagination options
function displayPagination (list, pageNumber){
    //function for creating the initial number of page elements for the master list and setting the proper class.
  function createPages(i){
    const li = document.createElement('li');
    const a = document.createElement('a');
    pageList.appendChild(li);
    li.appendChild(a);
    a.href = '#'
    a.textContent = i;
    if (i === pageNumber){
      a.className = 'active';
    } else {
      a.className = '';
    };
  }
  //when a search is ran I call the DisplayPagination function. With this if statement, I can hide/displayed
  //the proper number of existing pagination items based on search results or to display all pages again if user clears search box
  function updatePageDisplay () {
    //constant to hold the count of li for hiding and showing
    const pageItems = document.querySelectorAll('.pageNumbers li');
    //defines the current # of pages displayed which will be used for display logic below
    const currentPages = () => {
      let count = 0;
      for (let i = 0; i<pageItems.length; i++){
        if (pageItems[i].style.display === ''){
          count += 1;
        };
      };
      return count;
    }

    let newPages;//stores the number of pages now visible after search content has changed
    //logic for defining if we are coming from a search list to a new search list or coming from a search list back to master list. Based on that, the display for the pagination goes different paths below
    if (matchedSearch.length === 0){
      newPages = pages(studentListItems);
    } else {
      newPages = pages(matchedSearch);
    }
    /* As the pagination list changes throughout user behavior (especially with a live search function), we need to be
    handle a jump between any number of pages and properly display the right number of available pages. This
    statement below does just that by calculating the change between currentPages and newPages and then acting accordingly
    */
    const pagesDifference = newPages - currentPages();
      if (pagesDifference>0){
        for (let i = currentPages(); i< newPages; i++){
          pageItems[i].style.display = '';
        };
      } else if (pagesDifference<0){
        const pagestoHide = Math.abs(pagesDifference);
        for (let i = (newPages); i<pageItems.length; i++){
          pageItems[i].style.display = 'none';
        };
      };
  }
  let activeElement = document.activeElement;
  if(matchedSearch.length !== 0 || activeElement === searchBar){
    updatePageDisplay();
  }
  // this else statement is pretty much used for when the page is first loaded and we have our initial list of students
  // and is also used for creating the master # of pagination options that could be hidden/unhidden based on search results

  else if(activeElement === searchButton){
      updatePageDisplay();
    }
    // this else statement is pretty much used for when the page is first loaded and we have our initial list of students
    // and is also used for creating the master # of pagination options that could be hidden/unhidden based on search results
     else {
        for (i = 1; i <= pages(list); i++){
          createPages(i);
        };
    };
  //creates reference for all of the pages so that I can assign the active page class for proper highlighting
  pageLinks = document.querySelectorAll('a');

    //Event handler for when user interacts with the pagination tool. Gets the text content (aka pageNumber) from the target element
    // and passes it to the ShowPage function to display the proper content and then sets the proper active class for highligting the active page
    pagination.addEventListener('click', (e) => {
        e.preventDefault();
        let pageNumber = e.target.textContent;
        pageNumber = parseInt(pageNumber);
        if (searchText === ''){
          showPage(studentListItems, pageNumber);
        } else {
            showPage(matchedSearch,pageNumber);
        };
        for(let i = 0; i<pageLinks.length; i++){
          if(i === (pageNumber-1)){
            const activePage = pageLinks[i];
            activePage.className = 'active';
          }else{
            const inactivePage = pageLinks[i];
            inactivePage.className = '';
        };
      };

    });

}
//Adding search bar to the pages
function displaySearch(){
  //set HTML header element to variable & create/add Div that will hold search bar and search buttons
  const searchDiv = document.createElement('div');
  searchDiv.className = 'student-search';
  header.appendChild (searchDiv);

  //append search button to Div and apply needed properties
  searchDiv.appendChild(searchButton);
  searchButton.className = 'student-search';
  searchButton.textContent = 'Search';

  //append the search bar to Div and apply needed properties
  searchDiv.appendChild(searchBar);
  searchBar.className = 'student-search';
  searchBar.placeholder = 'Search student name...';


  //****Event Handlers for Search functionality***//

  //event handler for executing search on each keystroke by the user
  searchBar.oninput = searchInput;

  //the function that runs when the user adds text to the searchBar
  function searchInput(e) {
      searchText = e.target.value.toUpperCase();

      }

  }
  //function for going through array of students and matching the searchText to the <h3>.textContent. It will then push the value of i-- which relates to the index of the student in the StudentListItems.-- to the matchedSearch array
  function findMatches(text) {

    for (let i = 0; i<searchableList.length; i++) {
      const name = searchableList[i].textContent.toUpperCase();
      const email = searchableEmails[i].textContent.toUpperCase();
      if (name.indexOf(text) !== -1 || email.indexOf(text) !== -1) {
          matchedSearch.push(i);
      };
    };

  }

//function for executing the search
function findAndDisplay () {
    matchedSearch = []; // need this for resetting the matchedSearch array whenever a user has already ran a search but is now running a new one
    findMatches(searchText);//function defined above for determing the matched items.
//Case 1: No Matches on the search
    if (matchedSearch.length === 0 && searchText !== ''){
      //need to add content to page for stating no matches found
      studentList.style.display = `none`;
      pagination.style.display ='none'

    // Adding a class that I added to CSS that defines an animation
      searchBar.classList.add('error');

        // remove the class after the animation completes
      setTimeout(function() {
          searchBar.classList.remove('error');
        }, 300);


      noMatchDisplay.style.display = '';
      //noMatchDisplay.textContent = `No matches. Please adjust your search value.`;
      searchButton.textContent = 'Clear'


//Case 2: user clicked search with no search text entered
  } else if (searchBar.value === ''){
    searchBar.classList.add('error');

        // remove the class after the animation completes
        setTimeout(function() {
            searchBar.classList.remove('error');
        }, 300);
//Case 3: Take the matchedSearch contents, display the proper pagination options based on it and display the proper items, all starting on page 1.
    } else {
      displayPagination(matchedSearch,1);
      showPage(matchedSearch,1);

    };
  }
  //event handler for running searchBar when user clicks
  searchButton.addEventListener('click', ()=>{
    if (searchButton.textContent === 'Search'){
      findAndDisplay;
    } if (searchButton.textContent === 'Clear'){
      //function for resetting studentListItems display in the event the list was filtered before going to
      for (i=0; i<studentListItems.length; i++){
        studentListItems[i].style.display = 'none';
      };
        searchButton.textContent = 'Search';
        searchBar.value = '';
        searchText = '';
        clearNoMatchDisplay();
        matchedSearch = [];
        resetActivePage();
        showPage(studentListItems, 1);
        displayPagination(studentListItems,1);






  }
  });
  //event handler for running searchBar when user presses ENTER while active in the searchBar
  searchBar.addEventListener("keyup", (e) => {
    if (e.keyCode === 13 || e.which === 13) {
    // Trigger the button element with a click
      searchButton.click();
    };
  });

/*

use element.innerHTML for applying the error text when no match is found within the header container
*/

showPage(studentListItems,1);
displaySearch();
displayPagination(studentListItems,1);
