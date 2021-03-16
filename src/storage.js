class Save {
    constructor() {
      this.saveList = { } 
    }
  
    getSaveList() {
      return JSON.parse(localStorage.getItem('userSaveList'));
  
    }
  
    setSaveList() {
      localStorage.setItem('userSaveList', JSON.stringify(this.saveList));
    } 
    remove(objectls,index) {
        let save = this.getSaveList()
        if(save[objectls].length === 1) {
          delete save[objectls]
          localStorage.setItem('userSaveList', JSON.stringify(save))
        }else {
          save[objectls].splice(index, 1);
          localStorage.setItem('userSaveList', JSON.stringify(save))
        }
    }
  }