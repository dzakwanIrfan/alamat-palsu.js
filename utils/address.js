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
};

// hapus address
const deleteAddress = (name) => {
    const addresses = loadAddress();
    const filteredAddresses = addresses.filter(
        (address) => address.name !== name
    );
    saveAddress(filteredAddresses);
};

// mengubah address
const updateAddresses = (newAddress) => {
    const addresses = loadAddress();
    // hilangkan address lama yang namanya sama dengan oldName
    const filteredAddresses = addresses.filter((address) => address.name !== newAddress.oldName);
    delete newAddress.oldName;
    filteredAddresses.push(newAddress);
    saveAddress(filteredAddresses);
}


module.exports = { loadAddress, findAddress, addAddress, cekDuplikat, deleteAddress, updateAddresses };