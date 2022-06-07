
export function sortAsc(a, b) {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0;
};

export function sortDes(a, b) {
    if (a.name > b.name) return -1
    if (a.name < b.name) return 1
    return 0;
};

export function sortAtt(a, b) {
    return b.attack - a.attack;
}

export function isUrl(s) {   //regex de internet.
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/;
    return regexp.test(s);
}

export function onlyLowCaseLetters(s) { //regex de internet.
    let regexp = /^[a-z]+$/g;
    return regexp.test(s);
}