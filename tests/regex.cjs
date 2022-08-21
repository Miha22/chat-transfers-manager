const collect = require('collect.js');

const emoji = "😀";
const sRus = 'Х0 M';
const sEng = 'x1 M';
const strRus = 'х22 Apple iPhone 8 / SE 2020 šleife ar sistēmas konektoru melns';
const strEng = 'x1 Apple iPhone 8 / SE 2020 šleife ar sistēmas konektoru melns';
const strReverseRus = '12х Apple iPhone 8 / SE 2020 LCD displejs ar skārienjūtīgo paneli un ramiti melns (Tianma AAA)';
const strReverseEng = '2x Apple iPhone 8 / SE 2020 LCD displejs ar skārienjūtīgo paneli un ramiti melns (Tianma AAA)';
const strCombined = `Nado: 2x USB flash disks GoodRam UMM3 32GBх3 USB flash disks HOCO UD9 Mini Car Music USB 2.0 64GB`;
const strCombinedRev = `Nado: x2 USB flash disks GoodRam UMM3 32GB3х USB flash disks HOCO UD9 Mini Car Music USB 2.0 64GBx1 iphone XR`;
const strCombined2 = `x1 USB flash disks GoodRam UMM3 32GB или может еще
x2 USB flash disks HOCO UD9 Mini Car Music USB 2.0 64GB
x3 Bazookas for Aleksej`;

//console.log('X'.charCodeAt());// eng 'x' is 120 (hex 78), eng 'X' is 58 (hex 58)
//console.log('Х'.charCodeAt());// rus 'х' is 1093 (hex 445), rus 'Х' is 1061 (hex 425)
//const pattern1 = /((\u0445|\u0425)[1-9][0-9]?.+)|((\u0078|\u0058)[1-9][0-9]?.+)/;
//const patternEng = /.*((\u0078|\u0058)[1-9]\s.+(?=(.*(\u0078|\u0058)[1-9]\s.*)))/;//english xX, Xx, xx and XX
const patternEng = /(.*|\s?)((\u0078|\u0058)[1-9][0-9]?.+(?=((\u0078|\u0058)[1-9][0-9]?)))/;//english xX, Xx, xx and XX
//const patternEngRev = /.*([1-9][0-9]?(\u0078|\u0058).+(?=([1-9][0-9]?(\u0078|\u0058))))/;//english reversed xX, Xx, xx and XX
const patternEngRev = /.*([1-9][0-9]?(\u0078|\u0058).+(?=((\u0078|\u0058)[1-9][0-9]?)))/;
//const patternRus = /.*((\u0445|\u0425)[1-9][0-9]?.+(?=((\u0445|\u0425)[1-9][0-9]?)))/;//russian xX, Xx, xx and XX
//const patternRusRev = /.*([1-9][0-9]?(\u0445|\u0425).+(?=([1-9][0-9]?(\u0445|\u0425))))/;//russian reversed xX, Xx, xx and XX
//const patternUnited = /.*((\u0078|\u0058|\u0445|\u0425)[1-9][0-9]?.+(?=((\u0078|\u0058|\u0445|\u0425)[1-9][0-9]?)))/;
//const patternUnitedRev = /.*([1-9][0-9]?(\u0078|\u0058|\u0445|\u0425).+(?=([1-9][0-9]?(\u0078|\u0058|\u0445|\u0425))))/;
//const pattern = /.*((\u0078|\u0058|\u0445|\u0425)[1-9][0-9]?.+(?=((\u0078|\u0058|\u0445|\u0425)[1-9][0-9]?)))|.*([1-9][0-9]?(\u0078|\u0058|\u0445|\u0425).+(?=([1-9][0-9]?(\u0078|\u0058|\u0445|\u0425))))/;

//const str = strCombinedRev.replace(/х/g, "x").replace(/Х/g, "x");
const message = "NadoNadoNadoNado: NadoNadoNado Nado 2x USB flash disks GoodRam UMM3 32GBx3 USB flash disks HOCO UD9 Mini Car Music USB 2.0 64GBx1iphone xRx5 Redmi Note 10sx2 Original USB Cable - HUAWEI HL-1289 (AP-71) USB-C 3.1 vads baltsx1 Portatīvo story displays 350mm Matte OPS 30pin Slim 15.6 1920x1080 x1 Cooler Master MPE-4001-ACABW 400 Wx1Huawei Mate 20 Lite kameras stikliņšx1Ugreen USB 3.0 pagarinājuma vads, 2mx1 AData XPG SX6000 Pro PCIe M.2 Gen3x4 NVME 256GB SSD";
//const regex = /(.*|\s?)((\u0078|\u0058)[1-9][0-9]?.+(?=((\u0078|\u0058)[1-9][0-9]?)))/;

console.log(getTransfers(message));

function getTransfers(str) {
    const message = normalizeMessage(str);
    console.log(message);
    const regQuantity = /x[1-9]{1,2}(?![0-9]{1,2})/g;
    const quantitiesCollection = collect(message.match(regQuantity));//quantities
    const namesCollection = collect(message.split(regQuantity)
        .filter(item => item.length > 2)
        .map(item => item.trim())
    );

    return namesCollection.combine(quantitiesCollection).all();
}

function getItems(str) {
    let s = strCombinedRev;
    s = clearX(s);
    const re = /[1-9]{1,3}x/g;
    while ((match = re.exec(s)) != null) {
        s = swapChars(s, match.index, match.index + 1);
    }
    console.log(s);
    const matches = s.split(patternEng);
    const items = matches.filter((item, index, array) => {
        if(typeof item !== 'undefined' && item.length > 3) {
            return true;
        }
        return false;
    }).filter((item, index, array) => {
        const re = /\u0078[1-9]\s/g;
        const regIndex = indexOfRegex(item, re);

        if(regIndex > 0) {
            const s = item.substring(regIndex);
            
            return false;
        }
        return true;
    });

    return items;
}

class Item {
    constructor(name, quantity) {
      this.name = name;
      this.quantity = quantity;
    }

    getName() {
        return this.name;
    }
    getQuantity() {
        return this.quantity;
    }
}

function clearX(str) {
    return replaceAll(replaceAll(str, 'х', 'x'), 'Х', 'x');
}

function clearBefore(str) {
    const re = /x[1-9]{1,2}/g;
    const regIndex = indexOfRegex(str, re);

    if(regIndex > 0) {
        const s = str.substring(regIndex);
        return s;
    }

    return str;
}

function indexOfRegex(str, regex) {
    return regex.exec(str).index;
}

function nextIndexOfRegex(str, regex, count) {
    let i = 0;
    while ((match = regex.exec(str)) != null) {
        if(count == ++i) {
            return match.index;
        }
    }

    return -1;
}

function normalizeMessage(str) {
    let message = clearX(str);
    const re = /[1-9]{1,2}x/g;
    while ((match = re.exec(message)) != null) {
        if(isNumeric(match.index + 1)) {
            message = swapChars(message, match.index + 1, match.index + 2);
        }
        message = swapChars(message, match.index, match.index + 1);
    }

    return clearBefore(message);
}

function isNumeric(c){
    return /^\d$/.test(c);
}

function swapChars(str, index1, index2) {
    if(index1 > str.length - 1 || index2 > str.length - 1) {
        throw new Error("Index(-es) out of bounds");
    }
    const c1 = str[index1];
    const c2 = str[index2];

    return replaceAt(replaceAt(str, index1, c2), index2, c1);
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function replaceAt(str, index, replacement) {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}

// insert 2 chars
function isValidStart(str) {
    const code0 = str.charCodeAt();
    const code1 = str.charCodeAt(1);

    return (isValidX(code0) && isValidNum(code1)) || (isValidNum(code0) && isValidX(code1));
}

// insert 1 char
function isValidX(char) {
    const code = char.charCodeAt();
    return code == 120 || code == 1093;// rus X or eng X
}

// insert 1 char
function isValidNum(char) {
    const code = char.charCodeAt();
    return code > 47 && code < 58; //48 is 0, 57 is 9
}
