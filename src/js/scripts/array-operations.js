import _ from 'lodash';

function addUniqueItem(item, array) {
    if (array.indexOf(item) === -1) {
        array.push(item);
    }
}

export default function buildNewArray(array, oldArray) {
    while (array.length < 3) {
        addUniqueItem(_.sample(oldArray), array);
    }
}
