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
