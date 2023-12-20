const fs = require('fs');
const validator = require('validator');

//buat folder data kalau belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
};

//buat file contacts.json kalau belum ada
const dataPath = './data/address.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
};

// ambil semua data di address.json
const loadAddress = () => {
    const file = fs.readFileSync('data/address.json', 'utf-8');
    const address = JSON.parse(file);
    return address;
};

// cari address berdasarkan nama
const findAddress = (name) => {
    const addresses = loadAddress();

    const address = addresses.find(
        (address) => address.name.toLowerCase() === name.toLowerCase()
    );

    return address;
};

// menuliskan/menimpa file address.json dengan data baru
const saveAddress = (addresses) => {
    fs.writeFileSync('data/address.json', JSON.stringify(addresses));
};

// menambahkan data address baru
const addAddress = (address) => {
    const addresses = loadAddress();
    addresses.push(address);
    saveAddress(addresses);
};

// cek nama yang duplikat
const cekDuplikat = (name) => {
    const addresses = loadAddress();
    return addresses.find((address) => address.name === name);
}

module.exports = { loadAddress, findAddress, addAddress, cekDuplikat };