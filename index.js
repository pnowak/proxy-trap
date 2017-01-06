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


//create a new array method that removes a member
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