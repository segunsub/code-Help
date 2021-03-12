let button = document.getElementById('savedList')
button.addEventListener('click', postAnswer)
console.log(form)
function postAnswer() {
   let answers =  user.getSaveList()
   for (let key in answers) {
    form.innerHTML = `<label id="voiceover">Search Bar 
    <input id="codesearch" type="text" name="search" placeholder="Search Code"></label>`


       console.log(key, answers[key])
       let codebar = document.createElement('div')
       codebar.classList.add('code-toolbar')
       let codetitle = document.createElement('h2')
       codetitle.classList.add('lang')
       let codepre = document.createElement('pre')
       codepre.classList.add('line-numbers','clicker')
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
       form.append(codebar)
   }

}