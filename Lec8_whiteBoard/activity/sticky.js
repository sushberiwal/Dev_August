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
    let stickyPad =  document.createElement("div");
    let nav = document.createElement("div");
    let minimize = document.createElement("div");
    let closeBtn = document.createElement("div");
    let content = document.createElement("div");
    let textarea = document.createElement("textarea");
    textarea.setAttribute("cols" , "30");
    textarea.setAttribute("rows" , "10");
    
    stickyPad.setAttribute("class" , "stickyPad");
    nav.setAttribute("class" , "nav");
    minimize.setAttribute("class" , "minimize");
    closeBtn.setAttribute("class","close");
    content.setAttribute("class" , "content");
    
    
    stickyPad.append(nav);
    stickyPad.append(content);
    nav.append(minimize);
    nav.append(closeBtn);
    content.append(textarea);
    
    document.body.append(stickyPad);
})


