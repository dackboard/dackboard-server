/** Helps filtering properties of an object */
class PropFilter {

    /**
     * Returns an object with a list of keys from an old object (first dimension only)
     * 
     * @param inputObject {object} - Any object
     * @param propertyList {array<string>} - A list of key the new object should keep
     */
    public static filter(inputObject, propertyList: Array<string>) {
        let newObject = {};
        for(let property of propertyList) {
            newObject[property] = inputObject[property];
        }
        return newObject;
    }

}

export default PropFilter;