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