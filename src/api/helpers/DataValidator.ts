import config from '../../../config/config';

/**
 * Validates user-input data
 */
class DataValidator {

    /**
     * Returns true if the string is a valid email address
     * @param email {string} - The email to be checked
     */
    public static isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * Checks if the whole string is aplhanumeric
     * 
     * @param text {string} - The string to check
     * @param doAllowSpaces {boolean} - Allow spaces too
     */
    public static isAlphaNumeric(text: string, doAllowSpaces: boolean = false) {
        let anumDictionary: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        if (doAllowSpaces) { anumDictionary += " "; }
        return this.isInDictionary(text, anumDictionary);
    }

    /**
     * Checks if a string is included in a dictionary completely
     * 
     * @param text {string} - The string to check
     * @param dictionary {string} - The dictionary as string (list of allowed characters)
     */
    public static isInDictionary(text: string, dictionary: string): boolean {
        let isOk: boolean = true;

        for (let i: number = 0; i < text.length; i++) {
            if (!dictionary.includes(text[i])) {
                isOk = false;
            }
        }
        return isOk;
    }

    /**
     * Checks if the string length is between two values
     * 
     * @param text {string} - The text to check
     * @param minLength {Number} - The minimum length allowed
     * @param maxLength {Number} - The maximum length allowed
     */
    public static isLengthBetween(text: string, minLength: Number, maxLength: Number): boolean {
        return ((text.length > minLength) && (text.length < maxLength));
    }

    /**
     * Checks if a password meets the minimum requirements for security as defined
     * in the config file
     * 
     * @param password {string} - The password to be checked
     */
    public static isSecurePassword(password: string): boolean {
        return this.isLengthBetween(
            password,
            config.passwordRequirements.minLength,
            config.passwordRequirements.maxLength
        );
    }

}

export default DataValidator;