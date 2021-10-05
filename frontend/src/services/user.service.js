import { httpService } from './http.service'

const STORAGE_KEY = 'loggedinUser'

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser
}

window.userService = userService;

async function login(credentials) {
    const user = await httpService.post('auth/login', credentials)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
}

async function signup(credentials) {
    const user = await httpService.post('auth/signup', credentials)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
}

async function logout() {
    await httpService.post('auth/logout')
    sessionStorage.removeItem(STORAGE_KEY)
}

async function getLoggedinUser() {
    return Promise.resolve(JSON.parse(sessionStorage.getItem(STORAGE_KEY)));
}