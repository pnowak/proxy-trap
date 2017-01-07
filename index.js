//like Object.freeze
let notDeleteProperty = new Proxy(target, {
    deleteProperty(trapTarget, key) {

        if (trapTarget.hasOwnProperty(key)) {
            return false;
        } else {
            return Reflect.deleteProperty(trapTarget, key);
        }
    }
});


//set removes a member
function removeArrayMember(array) {
	if (!Array.isArray(array)) {
		throw new TypeError('Expected an array');
	}

	return new Proxy(array, {
		set: (target, index, member) => {
			index = target.indexOf(member);
			return index > -1 ? target.splice(index, 1) : 'there is no such member';
		}
	});
}


/* 
set insert a member without empty slot

const proxy = insertArrayMember([]);
proxy[0] = 0;
proxy[100] = 100;

proxy object:
...
[[Target]]:Array[2]
0:0
1:100
length:2
*/

function insertArrayMember(array) {
	if (!Array.isArray(array)) {
		throw new TypeError('Expected an array');
	}

	return new Proxy(array, {
		set: (target, index, member) => {
			return target.splice(index, 0, member);
		}
	});
}