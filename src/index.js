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
   let savedsyntaxdiv = document.getElementById('savedAnswers')
   getstartedbtn.addEventListener('click',()=>removepage(getstartedpage)) 
   
   
  //code syntax copy button
    let copybtnsave = document.querySelectorAll('.codeBtn')
    copybtnsave.forEach(btn => {
        btn.addEventListener('click',(e) => copytxtsvc(e.path[2].children[1].innerText,e.target))
    })
    function copytxtsvc(input,target) {
          navigator.clipboard.writeText(input).then(function() {
            target.innerText = 'copied';
            setTimeout(() => {
              target.innerText = 'Copy';
        }, 3000)
          })
    }



    //code syntax delete button
  let delbtnsyn = document.querySelectorAll('.delBtn')
  delbtnsyn.forEach(btn => {
    btn.addEventListener('click',(e) => removesynt(e.path[1].children[1].lang,e.path[2],e.path[1].children[1].index))
  })
  function removesynt(localsave,syntaxdiv,indexls) {
    user.remove(localsave,indexls);
    savedsyntaxdiv.removeChild(syntaxdiv)
  }
})



const user = new Save()
//localStorage populate user save tab
let savedSyntax = user.getSaveList()
if(savedSyntax !== null) {
// console.log(savedSyntax)
for(let keys in savedSyntax) {
  savedSyntax[keys].forEach((txt,index) => {
    user.saveList[keys] = [txt]
    postAnswer(keys,txt,index)
  })
}
}

srhchoice.addEventListener('click', (e) => {
  console.log(srhchoice.value)
})
let check = true
//Start page
let startpage = document.getElementById('getstarted')
let mainpage = document.getElementById('search')
let slider = document.querySelector('#slider').children
let startp = document.querySelector('#descript').children
let startcircle = document.getElementById('circle')
startpage.addEventListener("touchstart", startTouch, false);
startpage.addEventListener("touchmove", moveTouch, false);
let slidedisable = document.getElementById('slide')
slidedisable.addEventListener('click', () => {
  if(slidedisable.checked) {
   check = false
   }else {
    check = true
   }
})
//beta fix
window.addEventListener("touchstart", startTouch, false);
window.addEventListener("touchmove", moveTouch, false);
// mainpage.selector.style['touchAction'] = 'pan-y'
// savedAnswers.addEventListener("touchstart", startTouch, false);
// savedAnswers.addEventListener("touchmove", moveTouch, false);
let slidtrck = 0
let startx = null;
let starty = null;
function startTouch(e) {
  
  startx = e.touches[0].clientX;
  starty = e.touches[0].clientY;
}
let move = -170
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
          //sidebar menu close
        if(check) {
            let bar = document.getElementById('sidebar')
            if(bar.style.width === '50vw') {
              closenav()
            }
        }
      if(slidtrck >= 3)return
      // swiped left

      slidtrck++
      
      //circle movement to simulate different pages
      // move += 110
      // startcircle.style.top = `${move}px`

      


      let arr = Array.from(slider)
      arr.forEach((x,y) => {
        x.style.width = '10%'
        x.style.backgroundColor = 'black'
        startp[y].style.display = 'none'
        startp[y].children[0].style.fontSize = 'xx-large'
      })
      slider[slidtrck].style.width = '30%'
      slider[slidtrck].style.backgroundColor = 'gold'
      startp[slidtrck].style.display = 'block'
    } else {
      if(check) {
        if(getstarted.style.display === 'none') {
          sideload()
        }
    }
      if(slidtrck <= 0)return
      // swiped right 
      slidtrck--
      
      //circle movement to simulate different pages
      // move -= 110
      // startcircle.style.top = `${move}px`
      
      


      let arr = Array.from(slider)
      arr.forEach((x,y) => {
        x.style.width = '10%'
        x.style.backgroundColor = 'black'
        startp[y].style.display = 'none'
      })
      slider[slidtrck].style.width = '30%'
      slider[slidtrck].style.backgroundColor = 'gold'
      startp[slidtrck].style.display = 'block'
    }  
  } else {
    if ( diffY > 0 ) {
        /* up swipe */ 
        console.log('up')
       
    } else { 
        /* down swipe */
        console.log('down')
        
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
  if(e !== undefined){
    e.target.style.display = 'none'
  }else {
    document.getElementById('menuimg').style.display = 'none'
  }
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
form.addEventListener('click',() => {
  let bar = document.getElementById('sidebar')
  if(bar.style.width === '50vw') {
    closenav()
  }
})
let search
let first
function grepper(e) { 
let answerdiv = document.getElementById('savedAnswers')
answerdiv.style.display = 'none'
  amtclick()
 e.preventDefault()
 e.target.style.height = '90vh'
 e.target[0].style.height = '7%'
 search = document.getElementById('codesearch').value
 searchapi(search,srhchoice.value)
 .then(val => {
   first = val
   process(val)})
 e.target[0].value = ''
 form.innerHTML = `<label id="voiceover">Search Bar 
                <input id="codesearch" type="text" name="search" placeholder="Search Code"></label>`
}
let timer = 0
function process(obj) {
  console.log(obj)
 if (first.answers.length == 0) {
 timer ++
 alt(search)
 .then(val => {
   console.log(val, 'hey')
   if(val.answers.length == 0){
    return form.innerHTML = `<label id="voiceover">Search Bar
    <input id="codesearch" type="text" name="search" placeholder="Search Code"></label>
    <h1>NO Answer Available At The Moment</h1>`
   }
   if(val.answers.length == 0 && first.answers.length == 0 && first.more_answers.length == 0) {
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
let savebutton = document.createElement('button')
     savebutton.type = 'button'
     savebutton.classList.add('svbtn')
     savebutton.innerText = 'Save'
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
 toolbaritem.style.display = 'flex'
 toolbaritem.append(savebutton,barbutton)
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
  let savebutton = document.createElement('button')
  savebutton.type = 'button'
  savebutton.classList.add('svbtn')
  savebutton.innerText = 'Save'
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
 toolbaritem.style.display = 'flex'
 toolbaritem.append(savebutton,barbutton)
 searchcontain.append(h2,pre,toolbar)
form.append(searchcontain)
})
}



function copytxt(clck,input) {
  console.log(input)
  if(clck.classList[0] == 'svbtn') {
    if(clck.innerText !== 'Saved') {
      if(user.saveList[input.classList[2]] === undefined){
        user.saveList[input.classList[2]] = [input.innerHTML]
        postAnswer(input.classList[2],input.innerHTML)
      }else {
        user.saveList[input.classList[2]].push(input.innerHTML)
        postAnswer(input.classList[2],input.innerHTML)
      }

      user.setSaveList()
      clck.innerText = 'Saved';
  }
    

  return
  }

  let code = input.innerText;
 navigator.clipboard.writeText(code).then(function() {
   clck.innerText = 'copied';
   setTimeout(() => {
    clck.innerText = 'copy';
}, 3000)
 }, function(err) {
   console.error('Could not copy text: ', err);
 });
 }
let timerchange = 0
function amtclick(){
let clickamt = setInterval(() => {
  let copybtn = document.querySelectorAll('.toolbar-item')
  let clickchange = document.querySelectorAll('.clicker')
clickchange.forEach((clc,index) => {
  copybtn[index].addEventListener('click',(e) => copytxt(e.target,clc))
  Prism.highlightElement(clc)
  clc.addEventListener('click', () => {
    clc.style.height = 'auto'
  })
  clc.addEventListener('dblclick', () => {
    clc.style.height = '250px'
  })
})
timerchange++


if(clickchange.length > 0 || timerchange >= 5)clearInterval(clickamt)
}, 1000);
}






async function searchapi(input,bysearch) {
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
    let res = await fetch(`https://www.codegrepper.com/api/search.php?q=${input} ${bysearch}&search_options=search_titles`)
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

result save 
https://www.codegrepper.com/api/get_answers_2.php?v=2

results: ["https://www.w3schools.com/js/js_loop_for.asp", "https://www.w3schools.com/jsref/jsref_forin.asp",…]
0: "https://www.w3schools.com/js/js_loop_for.asp"
1: "https://www.w3schools.com/jsref/jsref_forin.asp"
2: "https://beginnersbook.com/2017/08/cpp-for-loop/"
3: "https://support.khanacademy.org/hc/en-us/articles/203327020-When-do-I-use-a-for-loop-and-when-do-I-use-a-while-loop-in-the-JavaScript-challenges-"
4: "https://en.wikipedia.org/wiki/For_loop"
5: "https://www.w3schools.com/python/python_for_loops.asp"
6: "https://www.w3schools.com/java/java_for_loop.asp"
7: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for"
8: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration"
9: "https://www.programiz.com/c-programming/c-for-loop"
10: "https://www.mathworks.com/help/matlab/ref/for.html"
11: "https://wiki.python.org/moin/ForLoop"
search: "for loop"
user_id: 214760


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




rating feedback post
https://www.codegrepper.com/api/feedback.php?vote=1&search_answer_id=38287&search_answer_result_id

vote: 1
search_answer_id: 38287
search_answer_result_id: 23185238
u: 214760
{id: 37427, term: "for loop",…}
id: 37427
results: ["https://www.w3schools.com/js/js_loop_for.asp", "https://www.w3schools.com/jsref/jsref_forin.asp",…]
term: "for loop"
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
