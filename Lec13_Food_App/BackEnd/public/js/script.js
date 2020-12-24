let names = ["EVERYONE" , "DEVELOPERS" , "FITNESS FREAKS" , "VEGANS"];            
let changingText = document.querySelector("#changing-text");
let idx = 0;
let word = names[idx];
let text = "";
let isDeleting = false;
let showcase = document.querySelector(".showcase");
let navlinks = document.querySelector(".navlinks");
window.addEventListener("load" , function(){
    typeWords();
    window.addEventListener("scroll" , function(){
        let {bottom} = showcase.getBoundingClientRect();
        if(bottom <= 0 ){
            navlinks.classList.add("fixed");
        }else{
            if(navlinks.classList.contains("fixed")){
                navlinks.classList.remove("fixed");
            }
        }
    })



})
function typeWords(){
    if(isDeleting && text.length ==0){
        idx = (idx+1) % names.length;
        word = names[idx];
        isDeleting = false;
    }

    if(text.length == word.length){
        isDeleting = true;
    }
      
    text = isDeleting ? word.substring(0 , text.length-1) : word.substring(0 , text.length+1);
    changingText.innerHTML = text;
    setTimeout(typeWords ,  text.length == word.length ? 1000 : 100);
}


