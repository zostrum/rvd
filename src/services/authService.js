import { backendUrl } from "../config/default.json";
import httpService from "./httpService";
import jwtDecode from "jwt-decode";

function url(id = "") {
    return `${backendUrl}auth/${id}`;
}

const tokenKey = "token";

httpService.setJwtHeader(getJwt());

export async function login(email, password) {
    const { data: jwt } = await httpService.post(url(), { email, password });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const token = localStorage.getItem(tokenKey);
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
}
export function isAdmin() {
    const user = getCurrentUser();
    return user ? !!user.isAdmin : false;
}
export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    isAdmin,
    getJwt,
};
