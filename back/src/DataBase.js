const fs = require('fs');

class DataBase {
    count = 0;
    posts = {};
// methods

    loadData() {
        try {
          let readData = fs.readFileSync("./src/dataBase.json", {encoding: 'utf-8'});
          const json = JSON.parse(readData);
    
          for (let i in json) {
            this.posts[i] = json[i];
            this.count++;
          }

          console.log('Data has loaded!');
        } catch (e) {
          console.log('DataBase is empty');
        }    
    }

    saveData() {
        const dataTo = JSON.stringify(this.posts, null, 1); 
        fs.writeFileSync('./src/dataBase.json', dataTo);
        console.log('Data has saved!');
    }

    setData(data) {
        this.posts[this.count] = data;
        this.count++;
        console.log("Data set!");
    }

    removeData(data) {
        let tmp;
        for (let i in this.posts) {
            if (data.id == this.posts[i].id) {
                delete this.posts[i];
                this.count--;
                let shift = false;
                for (let j in this.count) {
                    if (j == i) {
                        shift = true;
                    }
                    if (shift) {
                        tmp[j] = this.posts[i + 1];
                    } else {
                        tmp[j] = this.posts[i];
                    }
                }
            }
        }
        delete this.posts;
        this.posts = tmp;
    }

    findNumber(number) {
        for (let i in this.posts) {
            if (number == this.posts[i].number) {
                console.log('Number found');
                return true;
            }
        }
        return false;
    }
};

module.exports.DataBase = DataBase;
