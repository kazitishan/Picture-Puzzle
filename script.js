let currentImageNum = null;
let lastImageNum = null;
// reference of the order of the images
let pictures = [
   "1", "2", "3", "4",
   "5", "6", "7", "8",
   "9", "10", "11", "12",
   "13", "14", "15", "16"
];
let shuffled = false;

// adds event listeners to each image
function addClickListenerToImage() {
   const images = document.querySelectorAll('img');

   images.forEach(function(image){
    image.addEventListener('click', function(){
        selectImage(image.id);
    });
   });
}

// selects an image
function selectImage(imageNumber) {
   lastImageNum = currentImageNum;
   currentImageNum = imageNumber;




   // set opacity for previously selected image
   if (lastImageNum !== null) {
       document.getElementById(lastImageNum).style.opacity = '1'; // reset opacity
       document.getElementById(lastImageNum).classList.remove('selected');
   }




   // set opacity for the currently selected image
   if (currentImageNum !== null) {
       document.getElementById(currentImageNum).style.opacity = '0.5';
       document.getElementById(currentImageNum).classList.add('selected');
   }




   if (lastImageNum !== null) {
       swapImages();
   }
}




// swaps the current image selected and the previous image selected
function swapImages() {
   if (currentImageNum !== null && lastImageNum !== null) {
       const currentImgElement = document.getElementById(currentImageNum);
       const lastImgElement = document.getElementById(lastImageNum);


       // get the indices of lastImage and currentImage in the pictures array
       const lastIndex = pictures.indexOf(lastImageNum);
       const currentIndex = pictures.indexOf(currentImageNum);


       // swapping in the pictures array (https://stackoverflow.com/questions/872310/swap-array-elements-in-javascript)
       [pictures[lastIndex], pictures[currentIndex]] = [pictures[currentIndex], pictures[lastIndex]];


       // swapping here
       const tempSrc = currentImgElement.src;
       const tempId = currentImgElement.id;
       currentImgElement.src = lastImgElement.src;
       currentImgElement.id = lastImgElement.id;
       lastImgElement.src = tempSrc;
       lastImgElement.id = tempId;


       // remove border from both images after swapping
       currentImgElement.classList.remove('selected');
       lastImgElement.classList.remove('selected');


       // reset opacity for both images after swapping
       currentImgElement.style.opacity = '1';
       lastImgElement.style.opacity = '1';


       // after swapping, make these null
       currentImageNum = null;
       lastImageNum = null;


       // check if the puzzle is solved after swapping
       if (isSorted() && shuffled) {
           alert('Congratulations! You solved the puzzle!');
           shuffled = false;
           currentImageNum = null;
           lastImageNum = null;
       }
   }
}


// shuffles the pictures around
function shuffleImages() {
   shuffled = true;
   currentImageNum = null;
   lastImageNum = null;


   //shuffle pictures array (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
   for (let i = pictures.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [pictures[i], pictures[j]] = [pictures[j], pictures[i]];
   }


   // set the images in the html according to the arrangement of the pictures array
   const images = document.querySelectorAll('img');
   images.forEach((image, index) => {
       image.src = 'images/' + pictures[index] + '.jpeg';
       image.id = "" + pictures[index] + "";
   });


   // remove any selected border and reset opacity
   images.forEach(image => {
       image.classList.remove('selected');
       image.style.opacity = '1';
   });
}


// check if the puzzle is sorted
function isSorted() {
   for (let i = 0; i < pictures.length; i++) {
       const pictureNumber = parseInt(pictures[i]);
       if (pictureNumber !== i + 1) {
           return false;
       }
   }
   return true;
}


addClickListenerToImage();
