const fs = require('fs');

class UserBase {
    count = 0;
    users = {};
// methods

    loadData() {
        try {
          let readData = fs.readFileSync("./src/userBase.json", {encoding: 'utf-8'});
          const json = JSON.parse(readData);
    
          for (let i in json) {
            this.users[i] = json[i];
            this.count++;
          }
          console.log('Users have loaded!');
        } catch (e) {
          console.log('UserBase is empty');
        }    
    }

    saveData() {
        const dataTo = JSON.stringify(this.users, null, 1); 
        fs.writeFileSync('./src/userBase.json', dataTo);
        console.log('Users have saved!');
    }

    setData(data) {
        this.users[this.count] = data;
        this.count++;
        console.log("Data set!");
    }

    removeData(data) {
        let tmp;
        for (let i in this.users) {
            if (data.nickname == this.users[i].nickname) {
                delete this.users[i];
                this.count--;
                
                let shift = false;
                for (let j in this.count) {
                    if (j == i) {
                        shift = true;
                    }
                    if (shift) {
                        tmp[j] = this.users[i + 1];
                    } else {
                        tmp[j] = this.users[i];
                    }
                }
            }
        }
        delete this.users;
        this.users = tmp;
    }

    findNumber(number) {
        for (let i in this.users) {
            if (number == this.users[i].number) {
                console.log('Number found');
                return true;
            }
        }
        return false;
    }

    getNickname(number) {
        for (let i in this.users) {
            if (this.users[i].number == number) {
                return this.users[i].nickname;
            }
        }
        return ' ';
    }
};

module.exports.UserBase = UserBase;
