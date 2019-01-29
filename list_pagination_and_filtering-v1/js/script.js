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
const searchBar = document.createElement('input');
const searchButton = document.createElement('button');//button for
const pagination = document.createElement('div');//div for holding the pagination tool
const studentList = document.querySelector('.student-list');//parent node of each student in the list
const studentListItems = document.getElementsByClassName('student-item cf');
const pages = Math.ceil(studentListItems.length/10);
const pageList = document.createElement('ul');






//function for displaying only the proper proper items for each page.
function showPage(pageNumber) {
  const listStart = (pageNumber - 1)*10;
  const listEnd = listStart + 9;

  for( let i = 0; i < studentListItems.length ; i++){
    if (i < listStart || i > listEnd){
      studentListItems[i].style.display = 'none';
    };
  };
}

showPage(1);

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

//function for adding pagination <div> to the page and adding the <ul> to to the div
function displayPagination (pageNumber){
    const page = document.querySelector('.page');
    pagination.className = 'pagination';
    page.appendChild(pagination);
    pagination.appendChild(pageList);
    //this loop will create the <li> and <a> items for displaying the proper amount page numbers. The number of items to create
    //is based on the value in the global constant 'pages'
    for (i = 1; i <= pages; i++){
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
}

const paginationElements = pageList.childNodes;

pagination.addEventListener('click', (e) => {
    const pageNumber = event.target.textContent;
    for(i = 0; i<paginationElements; i++){
      if(i === pageNumber){
        const activePage = paginationElements[i].childNodes;
        activePage.className = 'active';
      } else {
        paginationElements[i].childNodes.className = '';
    };
  }
});







// Remember to delete the comments that came with this file, and replace them with your own code comments.


//Adding search bar to the pages
function displaySearch(){
  //set HTML header element to variable && create/add Div that will hold search bar and search buttons
  const header = document.querySelector('.page-header');
  const searchDiv = document.createElement('div');
  searchDiv.className = 'student-search';
  header.appendChild (searchDiv);
  //append search button to Div
  searchDiv.appendChild(searchButton);
  searchButton.className = 'student-search';
  searchButton.textContent = 'Search';
  //append the search bar to Div
  searchDiv.appendChild(searchBar);
  searchBar.className = 'student-search';
  searchBar.placeholder = 'Search student name...';


}


displaySearch();
displayPagination(1);
