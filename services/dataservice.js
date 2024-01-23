const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class dataService {
  constructor(datafile) {
    this.datafile = datafile;
  }
  async getList() {
    const data = await this.getData();
    return data;
  }
  async edit(olddata, email, password, age) {
    const data = (await this.getData()) || [];
    data.forEach(function (item) {
      if (item.password == olddata) {
        item.email = email;
        item.password = password;
        item.age = age;
        return email, password, age;
      }
    });
    if (!data) return [];

    return writeFile(this.datafile, JSON.stringify(data, null, 2));
  }
  async del(olddata) {
    const old = await this.getOne(olddata);
    const data = (await this.getData()) || [];
    var i = 0;
    var indexof = data.find(function (item, i) {
      if (item.password === old.password) {
        return i;
      }
    });
    delete indexof.email;
    delete indexof.password;
    delete indexof.age;

    return writeFile(this.datafile, JSON.stringify(data, null, 2));
  }

  async addEntry(email, password, age) {
    const data = (await this.getData()) || [];
    data.unshift({ email, password, age });
    return writeFile(this.datafile, JSON.stringify(data, null, 2));
  }

  async getOne(password) {
    const data = await this.getData();
    const speaker = data.find((elm) => {
      return elm.password === password;
    });
    if (!speaker) return [];
    return {
      email: speaker.email,
      password: speaker.password,
      age: speaker.age,
    };
  }

  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = dataService;
