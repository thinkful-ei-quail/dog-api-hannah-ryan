/* eslint-disable strict */
'use strict';

function howManyDogsToSee(){
  if($('#dogNumber').val() === ''){
    return 3;
  } 
  return $('#dogNumber').val();
} 

function getDogBreed(){
  return $('#breedSearch').val();
}

function getDogImage(number, breed) {
  console.log(number);
  console.log(breed);
  let noBreedSelectedUrl = `https://dog.ceo/api/breeds/image/random/${number}`;
  let breedSelectedUrl = `https://dog.ceo/api/breed/${breed}/images/random/${number}`;

  
  fetch(!breed ? noBreedSelectedUrl : breedSelectedUrl)
    .then(response => {
      if(!response.ok){
        throw new Error(response.message);
      }
      return response.json();
    })
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Error has occurred'));
  
}
  
function displayResults(responseJson) {
  console.log(responseJson);
  
  let arrayOfDogLinks = responseJson.message;
 
  $('.results').html('');
  arrayOfDogLinks.forEach(link =>{
    $('.results').append(
      `<img src="${link}" class="results-img">`
    );
    //display the results section
    $('.results').removeClass('hidden');
  });

  //replace the existing image with the new one

}
  
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let number = howManyDogsToSee();
    let breed = getDogBreed();
    
    getDogImage(number, breed);
    console.log(number, breed);
  });
}
  
$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});

