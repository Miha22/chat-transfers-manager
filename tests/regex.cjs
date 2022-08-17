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
let s = strCombinedRev;
s = clearX(s);
const re = /[1-9]x\s/g;
while ((match = re.exec(s)) != null) {
    console.log("match found at " + match.index);
    s = swapChars(s, match.index, match.index + 1);
}
console.log(s);
const matches = s.split(patternEng);
const garbage = [];
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

console.log(items);

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
    return replaceAll(replaceAll(replaceAll(str, 'X', 'x'), 'х', 'x'), 'Х', 'x');
}

function clearBefore(str) {
    const re = /\u0078[1-9]\s/g;
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

function getItem(str) {
    console.log(str.codePointAt());
}

function findItems(str) {
    const items = [];


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
