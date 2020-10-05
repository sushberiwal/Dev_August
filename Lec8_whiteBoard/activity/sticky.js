{/* <div class="stickyPad">
<div class="nav">
    <div class="minimize"></div>
    <div class="close"></div>
</div>
<div class="content">
    <textarea name="" class="sticky" cols="30" rows="10"></textarea>
</div>
</div>  */}

let stickyAdd = document.querySelector("#sticky");


stickyAdd.addEventListener("click" , function(){
    let content = createBox();
    let textarea = document.createElement("textarea");
    textarea.setAttribute("cols" , "30");
    textarea.setAttribute("rows" , "10");
    content.append(textarea);
})



