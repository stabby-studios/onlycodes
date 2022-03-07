import jwt_decode from 'jwt-decode';

/**
 * Check to see if the token in the storage is still valid, expired or does not match the api
 * @returns {object}
 */
export function validateToken() {
    let token = localStorage.getItem('token');
    let decoded = jwt_decode(token);

    if (!token) {
        return {
            valid: false,
            message: 'No token found in storage'
        };
    }

    if (checkIfTokenExpired(decoded)) {
        return {
            valid: false,
            message: 'Token has expired'
        };
    }

    return {
        valid: true,
        message: 'Token is valid'
    };
}

/**
 * Check to see if the decoded token is expired yet or not
 * @param {string} token 
 * @returns {boolean}
 */
function checkIfTokenExpired(token) {
    return checkIfEpochDateIsPassed(token.exp);
}

function getCurrentEpoch() {
    return dateToEpoch(new Date());
}

function dateToEpoch(date) {
    return (date.getTime() - date.getMilliseconds()) / 1000;
}

function checkIfEpochDateIsPassed(epoch) {
    const currentEpoch = getCurrentEpoch();

    if (currentEpoch > epoch) {
        return true;
    }
    return false;
}

/**
 * check to see if there is a token in the localstorage
 * @returns {string}
 */
export function getTokenFromLocalStorage() {
    return localStorage.getItem('token');
}

/**
 * This is for when the user is logging in to set the token in storage.
 * @param {string} token 
 */
export function setTokenToLocalStorage(token) {
    localStorage.setItem('token', token);
}

/**
 * This is mostly for when logging out of the app.
 */
export function removeTokenFromLocalStorage() {
    localStorage.removeItem('token');
}

export function createDummyToken() {
    if (localStorage.getItem('token') === null) {
        localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2NDY2ODc0MjgsImV4cCI6MTY3ODIyMzQyOCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.Bmql3P8fHmkXUR_e3sJmuEvv9VONIkZOqaVANHz8nXs')
    }
}