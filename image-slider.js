var slideIndex = []; // This will be automatically populated
var slideId = ["slide-1", "slide-2", "slide-3", "slide-4", "slide-5", "slide-6", "slide-7", "slide-8", "slide-9", "slide-10", "slide-11", "slide-12", "slide-13", "slide-14", "slide-15", "slide-16", "slide-17", "slide-18", "slide-19", "slide-20", "slide-21", "slide-22", "slide-23", "slide-24", "slide-25", "slide-26", "slide-27", "slide-28"];
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);
showSlides(1, 3);
showSlides(1, 4);
showSlides(1, 5);
showSlides(1, 6);
showSlides(1, 7);
showSlides(1, 8);
showSlides(1, 9);
showSlides(1, 10);
showSlides(1, 11);
showSlides(1, 12);
showSlides(1, 13);
showSlides(1, 14);
showSlides(1, 15);
showSlides(1, 16);
showSlides(1, 17);
showSlides(1, 18);
showSlides(1, 19);
showSlides(1, 20);
showSlides(1, 21);
showSlides(1, 22);
showSlides(1, 23);
showSlides(1, 24);
showSlides(1, 25);
showSlides(1, 26);
showSlides(1, 27);


// Initalise all starting slide indexes
function initialiseSlides(){
   for (var i = 0; i < slideId.length; i++){
      slideIndex[i] = 1;
   }
}

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);
  if (typeof slideIndex[no] === 'undefined') {slideIndex[no] = 1;}
  if (n > x.length) {slideIndex[no] = 1}    
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex[no]-1].style.display = "block"; 
}
