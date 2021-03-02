document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById('search')
   form.addEventListener("submit", grepper);
   document.getElementById('menubar').addEventListener('click', sideload)
   let buttonbar = document.getElementById('barbtn')
   buttonbar.addEventListener('click', closenav)
   let reveal = document.getElementById('reveal')
   let headbar = document.getElementById('headerbar')
   let getstartedpage = document.getElementById('getstarted')
   let getstartedbtn = document.getElementById('getstartedbtn')
   getstartedbtn.addEventListener('click',()=>removepage(getstartedpage))
   
})
//Start page
let startpage = document.getElementById('getstarted')
let slider = document.querySelector('#slider').children
let startp = document.querySelector('#descript').children
startpage.addEventListener("touchstart", startTouch, false);
startpage.addEventListener("touchmove", moveTouch, false);
let slidtrck = 0
let startx = null;
let starty = null;
function startTouch(e) {
  startx = e.touches[0].clientX;
  starty = e.touches[0].clientY;
}
function moveTouch(e) {
  if (startx === null)return; 
  if (starty === null)return;
 
  let currentX = e.touches[0].clientX;
  let currentY = e.touches[0].clientY;
 
  let diffX = startx - currentX;
  let diffY = starty - currentY;
 
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0) {
      if(slidtrck <= 0)return
      // swiped left
      slidtrck--
   
      let arr = Array.from(slider)
      arr.forEach((x,y) => {
        x.style.width = '10%'
        x.style.backgroundColor = 'black'
        startp[y].style.display = 'none'
      })
      slider[slidtrck].style.width = '40%'
      slider[slidtrck].style.backgroundColor = 'gold'
      startp[slidtrck].style.display = 'block'
    } else {
      if(slidtrck >= 3)return
      // swiped right 
      slidtrck ++
      
      let arr = Array.from(slider)
      arr.forEach((x,y) => {
        x.style.width = '10%'
        x.style.backgroundColor = 'black'
        startp[y].style.display = 'none'
      })
      slider[slidtrck].style.width = '40%'
      slider[slidtrck].style.backgroundColor = 'gold'
      startp[slidtrck].style.display = 'block'
    }  
  }
 
  startx = null;
  starty = null;
   
  e.preventDefault();
}
function removepage(page) {
  page.style.display = 'none'
}
//SideBar function
function sideload(e) {
  setTimeout(() =>{
    reveal.style.display = 'block' 
 }, 300)
  let bar = document.getElementById('sidebar')
  bar.style.width = '50vw'
  // bar.style.paddingTop = "60px"
 e.target.style.display = 'none'
}
function closenav() {
  reveal.style.display = 'none' 
  document.querySelector('#menubar').firstChild.style.display = 'block'
  let bar = document.getElementById('sidebar')
  bar.style.width = '0vw'
  bar.style.paddingTop = "0px"
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(registration => {
    console.log("SW Registered!");
    console.log(registration)
  }).catch(error => {
   console.log("SW Registeration Failed!");
   console.log(error)
  })
} else {
 alert(`browser not supported`)
}

let form = document.getElementById('search')
let search
let first
function grepper(e) { 
  amtclick()
 e.preventDefault()
 search = document.getElementById('codesearch').value
 searchapi(search)
 .then(val => {
   first = val
   process(val)})
 e.target[0].value = ''
 form.innerHTML = `<label id="voiceover">Search Bar 
                <input id="codesearch" type="text" name="search" placeholder="Search Code"></label>`
}
let timer = 0
function process(obj) {
 if (first.answers.length == 0) {
 timer ++
 alt(search)
 .then(val => {
   if(first.answers.length == 0 && val.answers.length == 0 && first.more_answers.length == 0) {
     return form.innerHTML = `<label id="voiceover">Search Bar
                               <input id="codesearch" type="text" name="search" placeholder="Search Code"></label>
                               <h1>NO Answer Available At The Moment</h1>`
                               //probably add an action to post. if reached there are no answer
   }
   altprocess(val)
 })
}
obj.answers.forEach((each) => {
 if(each.language == 'whatever') {
   each.language = 'English'
 }
 if(each.video_name !== null && each.video_name !== '' ) {
   console.log(each.video_name)
 }
 let toolbar = document.createElement('div')
 toolbar.classList.add('toolbar')
 let toolbaritem = document.createElement('div')
 toolbaritem.classList.add('toolbar-item')
 let barbutton = document.createElement('button')
    barbutton.type = 'button'
    barbutton.innerText = 'Copy'
 let searchcontain = document.createElement('div')
    searchcontain.classList.add('code-toolbar')
 let pre = document.createElement('pre')
 let classesToAdd = [ 'line-numbers', `language-${each.language}`, 'clicker'];
 pre.classList.add(...classesToAdd);
 pre.style.paddingLeft = '10px'
 pre.style.paddingRight = '10px'
 let view = document.createElement('code')
 view.classList.add(`language-${each.language}`);
 let h2 = document.createElement('h2')
 h2.classList.add('lang')
 let p = document.createElement('p')
 p.classList.add('answer')
 let langtitle = document.getElementById('rmcodename')
 if(!langtitle.checked) {
  h2.innerText = `${each.language}`
 }
 view.append(h2)
 view.innerHTML = `${each.answer}`
 pre.append(view)
 toolbar.append(toolbaritem)
 toolbaritem.append(barbutton)
 searchcontain.append(h2,pre,toolbar)
form.append(searchcontain)
})


}
function altprocess(obj) {
console.log(obj)
obj.answers.forEach((each) => {
 if(each.language == 'whatever') {
   each.language = 'English'
 }
 if(each.video_name !== null && each.video_name !== '' ) {
   console.log(each.video_name)
 }


 let toolbar = document.createElement('div')
 toolbar.classList.add('toolbar')
 let toolbaritem = document.createElement('div')
 toolbaritem.classList.add('toolbar-item')
 let barbutton = document.createElement('button')
    barbutton.type = 'button'
    barbutton.innerText = 'Copy'
 let searchcontain = document.createElement('div')
    searchcontain.classList.add('code-toolbar')
 let pre = document.createElement('pre')
 let classesToAdd = [ 'line-numbers', `language-${each.language}`, 'clicker'];
 pre.classList.add(...classesToAdd);
 pre.style.paddingLeft = '10px'
  pre.style.paddingRight = '10px'
 let view = document.createElement('code')
 view.classList.add(`language-${each.language}`);
 let h2 = document.createElement('h2')
 h2.classList.add('lang')
 let p = document.createElement('p')
 p.classList.add('answer')
 let langtitle = document.getElementById('rmcodename')
 if(!langtitle.checked) {
  h2.innerText = `${each.language}`
 }
 view.append(h2)
 view.innerHTML = `${each.answer}`

 pre.append(view)
 toolbar.append(toolbaritem)
 toolbaritem.append(barbutton)
 searchcontain.append(h2,pre,toolbar)
form.append(searchcontain)
})
}



function copytxt(clck,input) {
  let code = input;
 navigator.clipboard.writeText(code).then(function() {
   clck.innerText = 'copied';
   setTimeout(() => {
    clck.innerText = 'copy';
}, 3000)
 }, function(err) {
   console.error('Could not copy text: ', err);
 });
 }

function amtclick(){
let clickamt = setInterval(() => {
  let copybtn = document.querySelectorAll('.toolbar-item')
  let clickchange = document.querySelectorAll('.clicker')
clickchange.forEach((clc,index) => {
  copybtn[index].addEventListener('click',(e) => copytxt(e.target,clc.innerText))
  Prism.highlightElement(clc)
  clc.addEventListener('click', () => {
    clc.style.height = 'auto'
  })
  clc.addEventListener('dblclick', () => {
    clc.style.height = '250px'
  })
})


if(clickchange.length > 0)clearInterval(clickamt)
console.log(clickchange)
}, 1000);
}






async function searchapi(input) {
  let bycode = document.getElementById('bycode')
  let bytitle = document.getElementById('bytitle')
  if (bycode.checked && bytitle.checked) {
    let res = await fetch(`https://www.codegrepper.com/api/search.php?q=${input}&search_options=search_titles,search_code`)
    let data = await res.json()
    return data
  }else if(bycode.checked) {
    let res = await fetch(`https://www.codegrepper.com/api/search.php?q=${input}&search_options=search_code`)
    let data = await res.json()
    return data
  }else if (bytitle.checked) {
    let res = await fetch(`https://www.codegrepper.com/api/search.php?q=${input}&search_options=search_titles`)
    let data = await res.json()
    return data
  }else{
    let res = await fetch(`https://www.codegrepper.com/api/get_answers_1.php?v=2&s=${input}`)
    let data = await res.json()
    return data
  }
}
async function alt(input) {
  let res = await fetch(`https://www.codegrepper.com/api/search.php?q=${input}`)
  let data = await res.json()
  return data
}
//video tutorial
// https://www.codegrepper.com/video_uploads/3412_ztzlstaFheod3t8IZWxMtV31xqoEJ0VfGVHqWfJCEWdVrIno8PGi4vS.mp4


/* get api
https://www.codegrepper.com/api/get_answers_1.php?v=2&s=${input}
https://www.codegrepper.com/api/search.php?q=${input}
*/
/* post api
https://www.codegrepper.com/api/save_answer.php

update
https://www.codegrepper.com/api/update_answer.php
 */

// alt search
/*
https://www.codegrepper.com/api/search.php?q=code&search_options=search_titles,search_code
https://www.codegrepper.com/api/search_term_alternatives.php?q=code
https://www.codegrepper.com/api/search.php?q=array&search_options=search_titles,search_code

query parameters
q: array
search_options: search_titles,search_code
*/




// :authority: www.codegrepper.com
// :method: POST
// :path: /api/save_answer.php
// :scheme: https
// accept: */*
// accept-encoding: gzip, deflate, br
// accept-language: en-US,en;q=0.9
// content-length: 166
// content-type: text/plain;charset=UTF-8
// origin: https://www.google.com
// referer: https://www.google.com/
// sec-ch-ua: "Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"
// sec-ch-ua-mobile: ?0
// sec-fetch-dest: empty
// sec-fetch-mode: cors
// sec-fetch-site: cross-site
// user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36
// x-auth-id: 214760
// x-auth-token: ecb0354b25f4db5b3a53910596b3d89f76cf2fad5fa8b5c4dd43084b283e51acacfddfe99af80dca15dec3c1f517851856bcf44947589d693a104419dec6e19e
// {answer: "", user_id: 214760, codeSearch: {results: [], search: ".includes javascript"}, source: 2,…}
// answer: ""
// codeSearch: {results: [], search: ".includes javascript"}
// language: "javascript"
// source: 2
// source_url: ""
// uploaded_video_name: ""
// user_id: 214760
