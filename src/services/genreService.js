import {backendUrl} from "../config/default.json";
import httpService from "./httpService";

export function getGenres() {
    return httpService.get(backendUrl + "genres");
}
