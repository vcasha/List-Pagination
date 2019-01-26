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
const searchButton = document.createElement('button');



/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/




/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/





// Remember to delete the comments that came with this file, and replace them with your own code comments.


//Adding search bar to the pages
function displaySearch (){

  //set Header and create Div that will hold search bar and search buttons
  const header = document.querySelector ('.page-header');
  const searchDiv = document.createElement('div');
  searchDiv.ClassName = 'student-search';
  header.appendChild (searchDiv);
  //append the search bar to Div
  searchDiv.appendChild(searchBar);
  searchBar.className = 'student-search';
  searchBar.value = 'Search student name...';
  //append search button to Div
  searchDiv.appendChild(searchButton);
  searchButton.className = 'student-search';
  searchButton.textContent = 'Search';


}

displaySearch();
