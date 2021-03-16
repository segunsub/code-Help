








let button = document.getElementById('savedList')
// let searchpage 
button.addEventListener('click', revealdiv)
let answerdiv = document.getElementById('savedAnswers')
answerdiv.style.display = 'none'
// console.log(form)
function revealdiv() {
   form.innerHTML = `<label id="voiceover">Search Bar 
   <input id="codesearch" type="text" name="search" placeholder="Search Code"></label>`
   form.style.height = '9vh'
   form.firstChild.style.height = "70%"   
   answerdiv.style.display = 'block'
   // answerdiv.style.backgroundColor = 'rgb(228,230,232)'
}
function postAnswer(title,syntax,arrindex) {

       let codebar = document.createElement('div')
       codebar.classList.add('codeToolBar')
       let codetitle = document.createElement('h2')
       codetitle.classList.add('codeLang')
       codetitle.lang = title
       codetitle.index = arrindex
       codetitle.innerText = title.slice(9, 19)
       let codepre = document.createElement('pre')
       codepre.classList.add('codeBox')
       codepre.innerHTML = syntax
       let codetoolbar = document.createElement('div')
       codetoolbar.classList.add('toolBar')
       let codebutton = document.createElement('button')
       codebutton.classList.add('codeBtn')
       codebutton.innerText = 'Copy'
       let codebuttondel = document.createElement('button')
       codebuttondel.classList.add('delBtn')
       codebuttondel.innerText = 'Delete'
       codetoolbar.append(codebuttondel,codetitle,codebutton)
       codebar.append(codetoolbar,codepre)
       answerdiv.append(codebar)
}