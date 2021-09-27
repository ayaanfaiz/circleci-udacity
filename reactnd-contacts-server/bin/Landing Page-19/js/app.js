/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
//--------------- GET ALL SECTION IN PAGE
sectionsList = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//--------------- ADD ONCLICK EVENT
makeNavLiActive = (element)=>{
    (()=>{
        var clickElement = element;
        clickElement.onclick = (event)=> {
            var coloRedElems = document.querySelectorAll(".colorRed");
            [].forEach.call(coloRedElems, function(el) {
                el.classList.remove("colorRed");
            });
            clickElement.classList.add("colorRed");
        }
    })(element)
}

//--------------- CHECK THAT ELEMENT IN THE VIEW PORT
function elementInViewport (el) {
    var rect = el.getBoundingClientRect();
    return (
        
            rect.top <= 150  
            &&
            rect.bottom > 0.5 * rect.height
        )
    
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav
//--------------- ADD SECTIONS TO NAV BAR
sectionsList.forEach(element => {
    let ul = document.getElementById("navbar__list");
    let li = document.createElement("li");
    li.innerHTML = `<a href="${"#"+element.id}" class="nav_link" >${element.children[0].children[0].innerHTML}</a>`;
    ul.appendChild(li);
});

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event


let scrollPosition = 0;
let scrolling = false;

function makeSectionActive(scrollPos) {
    sectionsList.forEach((section)=>{
       let inPortView = elementInViewport (section);
        if(inPortView == true)
        {
            let liLink = document.querySelectorAll(`[href="${"#"+section.id}"]`)[0];
            var coloRedElems = document.querySelectorAll(".colorRed");
            [].forEach.call(coloRedElems, function(el) {
                el.classList.remove("colorRed");
            });
            liLink.classList.add("colorRed");

            var elems = document.querySelectorAll(".active");

            [].forEach.call(elems, function(el) {
                el.classList.remove("active");
            });

            section.classList.add("active");
          
        }
    })
}



/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
//---------------  ADD EVENT ON EVERY LIST ITEM
let nav_links = document.getElementsByClassName("nav_link");
for(element of nav_links)
{  
    makeNavLiActive(element);
}

// Set sections as active
//--------------- ON SCROLL MAKE SECTIONS ACTIVE
document.addEventListener('scroll', function(e) {
    scrollPosition = window.scrollY;
  
    if (!scrolling) {
      window.requestAnimationFrame(function() {
          makeSectionActive(scrollPosition);
          scrolling = false;
      });
  
      scrolling = true;
    }
  });


