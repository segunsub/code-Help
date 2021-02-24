document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById('search')
   form.addEventListener("submit", grepper);
   let searchcontain = document.getElementById('container')

   let search
   let first
   function grepper(e) {
    searchcontain.innerText = ''
    e.preventDefault()
    search = document.getElementById('codesearch').value
    searchapi(search)
    .then(val => {
      first = val
      process(val)})
    e.target[0].value = ''
}
let timer = 0
function process(obj) {
    if (first.answers.length == 0) {
    timer ++
    alt(search)
    .then(val => {
      if(first.answers.length == 0 && val.answers.length == 0 && first.more_answers.length == 0) {
        return searchcontain.innerHTML = `<h1>NO Answer Available At The Moment</h1>` //probably add an action to post. if reached there are no answer
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
    let view = document.createElement('div')
    let h2 = document.createElement('h2')
    h2.classList.add('lang')
    let p = document.createElement('p')
    p.classList.add('answer')
    h2.innerText = `Language: ${each.language}`
    p.innerText = `${each.answer}`
    view.append(h2,p)
   searchcontain.append(view)
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
    let view = document.createElement('div')
    let h2 = document.createElement('h2')
    h2.classList.add('lang')
    let p = document.createElement('p')
    p.classList.add('answer')
    h2.innerText = `Language: ${each.language}`
    p.innerText = `${each.answer}`
    view.append(h2,p)
   searchcontain.append(view)
  })
}
})
async function searchapi(input) {
    let res = await fetch(`https://www.codegrepper.com/api/get_answers_1.php?v=2&s=${input}`)
    let data = await res.json()
    return data
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