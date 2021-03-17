class API {

   async searchapi(input,bysearch) {
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
  async alt(input) {
    let res = await fetch(`https://www.codegrepper.com/api/search.php?q=${input}`)
    let data = await res.json()
    return data
  }
  async Mdnapi(query) {
    let res = await fetch(`https://developer.mozilla.org/api/v1/search?q=${query}`)
    let data = await res.json()
    return data
  }
  
}