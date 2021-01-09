import { backendUrl } from "../config/default.json";
import httpService from "./httpService";

function url(id = "") {
    return `${backendUrl}movies/${id}`;
}

export function getMovies() {
    return httpService.get(url());
}

export function getMovie(id) {
    return httpService.get(url(id));
}

export async function saveMovie(movie) {
    if (movie._id) {
        const body = { ...movie };
        delete body._id;
        return httpService.put(url(movie._id), body);
    }
    return httpService.post(url(), movie);
}

export async function deleteMovie(id) {
    return httpService.delete(url(id));
}
