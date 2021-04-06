const maps = require('./maps');

exports.getCatid = () => {
    let catIdList = [];
    maps.optionList.forEach((element, index) => {
        catIdList.push(index);
    });
    return catIdList;
}

exports.printList = (catid) => {
    let listOption = [];
    maps.optionList.forEach((element, index) => {
        (+catid === index) ? listOption.push({catid: index, title: element[1], select: 'selected'}) : listOption.push({catid: index, title: element[1], select: ''});
    });
    return listOption;
};