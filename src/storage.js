class Save {
    constructor() {
      this.saveList = { } 
      // || this.getWatchList();
    }
  
    getSaveList() {
      return JSON.parse(localStorage.getItem('userSaveList'));
  
    }
  
    setSaveList() {
      localStorage.setItem('userSaveList', JSON.stringify(this.saveList));
    } 
//   reset() {
//       this.watchList.tv = {}
//       this.watchList.movie = {}
//   }
//     clearUserData() {
//       localStorage.clear();
//       this.getWatchList();
//     }
  }