import { backendUrl } from "../config/default.json";
import httpService from "./httpService";

function url(id = "") {
    return `${backendUrl}users/${id}`;
}

export function register(user) {
    return httpService.post(url(), {
        email: user.username,
        password: user.password,
        name: user.name,
    });
}
