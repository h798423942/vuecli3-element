export const commonUtils = {
    isEmail(email) {
        const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        return reg.test(email);
    },
    validatePassword(password) {
        const reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,18}$/;

        return reg.test(password);
    }
};

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
