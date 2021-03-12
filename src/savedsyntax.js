let button = document.getElementById('savedList')
let searchpage 
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
   answerdiv.style.backgroundColor = 'rgb(228,230,232)'
}

function postAnswer(title,syntax,form) {
   searchpage = form
   console.log(title, syntax)
   // let answers =  user.getSaveList()

      //  console.log(key, answers[key])
       let codebar = document.createElement('div')
       codebar.classList.add('code-toolbar')
       codebar.style.backgroundColor = 'silver'
       let codetitle = document.createElement('h2')
       codetitle.classList.add('lang')
       codetitle.innerText = title
       let codepre = document.createElement('pre')
       codepre.classList.add('line-numbers','clicker')
       codepre.innerHTML = syntax
       let codetoolbar = document.createElement('div')
       codetoolbar.classList.add('toolbar')
       let codetoolbaritem = document.createElement('div')
       codetoolbaritem.classList.add('toolbar-item')
       let codebutton = document.createElement('button')
       codebutton.type = button
       codebutton.innerText = 'Copy'




       codetoolbaritem.append(codebutton)
       codetoolbar.append(codetoolbaritem)
       codebar.append(codetitle,codepre,codetoolbar)
       answerdiv.append(codebar)
   

}