class Render {
     constructor() {
         this.query = ''
         this.clickfunc = null
     }
    rendermh(objs,query,parent) {
            let link = document.createElement('a')
            link.classList.add('mainLink')
            link.innerText = `Mdn Search For ${query}`
            link.target = '.blank'
            link.href = `https://developer.mozilla.org/en-US/search?q=${query}`
            parent.appendChild(link)
            this.helpBox(objs,parent)
    }
    altprocess(obj) {
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
          //More Help Page
          if(mrHelp.checked) {
            this.moreHelpFunc(moreHelp.value,e.target[0].value)
        }
        }
    process(obj) {
            let timer = 0
            console.log(obj)
           if (first.answers.length == 0) {
           timer ++
           Apicall.alt(search)
           .then(val => {
             console.log(val, 'hey')
             if(val.answers.length == 0){

              form.innerHTML = `<label id="voiceover">Search Bar
              <input id="codesearch" type="text" name="search" placeholder="Search Code"></label>
              <h1>More Help</h1>
              <br>`
              this.moreHelpFunc('ALL',this.query)
              return
             }
             if(val.answers.length == 0 && first.answers.length == 0 && first.more_answers.length == 0) {
                form.innerHTML = `<label id="voiceover">Search Bar
                                         <input id="codesearch" type="text" name="search" placeholder="Search Code"></label>
                                         <h1>More Help</h1>
                                         <br>`
                                         //probably add an action to post. if reached there are no answer
                                         this.moreHelpFunc('ALL',this.query)
                                        return
                                        }
             this.altprocess(val)
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
                //More Help Page
                if(mrHelp.checked) {
                    this.moreHelpFunc(moreHelp.value,this.query)
                }
          }
    //Mdn More Help
    moreHelpFunc(input,evnt) {
        console.log(input)
        if(input === 'ALL') {
            Apicall.Mdnapi(evnt).then(res => newrend.rendermh(res.documents,evnt,form))
        }else if(input === 'Mdn') {
          Apicall.Mdnapi(evnt).then(res => newrend.rendermh(res.documents,evnt,form))
        }else {
      
        }
      }
    helpBox(input,parent) {
        input.forEach(val => {
            let codebar = document.createElement('div')
            codebar.classList.add('mdnBar')
            codebar.style.padding = '0.5em'
            let codetitle = document.createElement('div')
            codetitle.classList.add('titleCap')
            codetitle.innerHTML = `<h2>${val.title}</h2>
            <button class="codeBtn"><a href="https://developer.mozilla.org${val.mdn_url} " style="color: wheat" target=".blank">Link</a></button>`
            let codepre = document.createElement('div')
           codepre.classList.add('mdnSummary')
           codepre.innerHTML = val.summary
           codebar.append(codetitle,codepre)
           parent.append(codebar)
           this.clickfunc(codepre)
        })

    }
  }