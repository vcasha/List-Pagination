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
const studentList = document.querySelector('.student-list');//parent node of each student in the list
let searchText = searchBar.value;
let matchedSearch = []; //creates array for storing the index of the students that match the search
const searchableList = document.querySelectorAll('h3');
const studentListItems = document.getElementsByClassName('student-item cf');//constant to hold ALL of the students in the list.
const pagination = document.createElement('div');//div for holding the pagination tool
pagination.className = 'pagination';
const pages = (list) => {
  return Math.ceil(list.length/10);
} //constant for identifying the # of pages to be displayed in pagination tool. Can be passed an array as an argument so this can be used for calculating # for any array list it is passed
const page = document.querySelector('.page');
//creating all necessary elements for the pagination options container
const pageList = document.createElement('ul');//const element for the <ul> that will hold the indivdual page elements as <li>
pageList.className = 'pageNumbers';
page.appendChild(pagination);
pagination.appendChild(pageList);








//function for displaying the proper items related to the active page.
function showPage(list, pageNumber) {
  const listStart = (pageNumber - 1)*10;
  const listEnd = listStart + 10;


  for( let i = 0; i < list.length ; i++){
      if (i < listStart || i > listEnd){
      list[i].style.display = 'none';
    }else{
      list[i].style.display = '';
    };
  };
}

function showSearch(list, pageNumber) {
  //listStart and listEnd are used for defining where in the array of students to start displaying based on pageNumber.
  const listStart = (pageNumber - 1)*10;
  const listEnd  = listStart + 10;
  //creating reference for future logic check
  const listCheck = list[listEnd];
  //this will remove the existing pagination elements since we will be creating a new one based on the length of the matchedSearch list
  while (pageList.firstChild) {
    pageList.removeChild(pageList.firstChild);
  };


  for (let i = 0; i<studentListItems.length; i ++){
    studentListItems[i].style.display = 'none';
  };
  //if this variable is undefined it means the array ends before getting to the listEnd item (aka a page without 10 items) so instead of going to listEnd we just go to list length
  if (listCheck === undefined){
    for (let i = listStart;i<list.length; i++){
      const index = list[i];
      studentListItems[index].style.display = '';
    };
    //if list is long enough to display all 10 then we will use this for loop logic for getting proper list of elements and setting them to be displayed on the page
  } else {
      for (let i = listStart;i<listEnd; i++){
        const index = list[i];
        studentListItems[index].style.display = '';
    };

  };

  //run this function to create the proper pagination numbers based on the matchedSearch length
  displayPagination(list,pageNumber);
}



/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

//function for adding pagination <div> to the page and adding the <ul> to to the div
function displayPagination (list, pageNumber){
    //this loop will create the <li> and <a> items for displaying the proper amount of page numbers. The number of items to create
    //is based on the value in the global constant 'pages'. It will also set the proper <a> element to active so that it is properly
    //styled to indicate it is selected.
    for (i = 1; i <= pages(list); i++){
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
    //Event handler for when user interacts with the pagination tool. Gets the text content (aka pageNumber) from the target element
    // and passes it to the ShowPage function to display the proper content. Then I go through the
    pagination.addEventListener('click', (e) => {
        e.preventDefault();
        const pageLinks = document.querySelectorAll('a');
        let pageNumber = e.target.textContent;
        pageNumber = parseInt(pageNumber);
        if (searchText === ''){
          showPage(studentListItems, pageNumber);
        } else {
          while (pageList.firstChild) {
            pageList.removeChild(pageList.firstChild);
          };
            showSearch(matchedSearch,pageNumber);
          };
        for(let i = 0; i<pageLinks.length; i++){
          if(i === (pageNumber-1)){
            const activePage = pageLinks[i];
            activePage.className = 'active';
          } else{
            const inactivePage = pageLinks[i];
            inactivePage.className = '';
        };
      };

    });
}
//contains an array of the <li> contained in the Pagination tools  <ul>


//working on method for iterating over the page numbers to set the active page to the newly selected page
// and remove it from the old page.










// Remember to delete the comments that came with this file, and replace them with your own code comments.


//Adding search bar to the pages
function displaySearch(){
  //set HTML header element to variable & create/add Div that will hold search bar and search buttons
  const header = document.querySelector('.page-header');
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

  /*This event handler will update the searchText variable whenever it is changed, so that
  it can be passed as an argument in the function that will search the list.*/
  searchBar.oninput = searchInput;

  //the function that runs when the above event occurs
  function searchInput(e) {
      searchText = e.target.value.toUpperCase();

      }

  }
  //function for going through array of students and matching the searchText to the <h3>.textContent. It will then log the i variable which relates to the index of the student in the StudentListItems.
  function findAndDisplay(text) {

    for (let i = 0; i<searchableList.length; i++) {
      const name = searchableList[i].textContent.toUpperCase();
      if (name.indexOf(text) !== -1) {
          matchedSearch.push(i);
      };
    };
    showSearch(matchedSearch,1);

  }

  //event handler for running searchBar
  searchButton.addEventListener('click', () =>{
    matchedSearch = []; // need this for resetting the matchedSearch array whenever a user has already ran a search but is now running a new one
    findAndDisplay(searchText);

});



/*

use element.innerHTML for applying the error text when no match is found within the header container
*/

showPage(studentListItems,1);
displaySearch();
displayPagination(studentListItems,1);
