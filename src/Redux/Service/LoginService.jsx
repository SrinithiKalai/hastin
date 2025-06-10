import axios from "axios";
import { Hastin } from "../URL/LoginUrl";

export function loginService(payload) {
  return axios({
    method: "POST",
    url: Hastin + "app/auth/login",
    data: payload
  })
}

export function apiService(payload) {
  const token = payload.jwt;
  localStorage.setItem("jwt", token);
  console.log("token", token);
  return axios({
    method: "POST",
    url: Hastin + "app/auth/access-code/validate",
    data: payload,
    headers: {
      Authorization: "BslogiKey " + payload.jwt
    }
  });
}

export function tableService(payload) {
  const token = localStorage.getItem("jwt")
  return axios({
    method: "PUT",
    url: Hastin + "api/vendor/search/active",
    data: payload,
    headers: {
      Authorization: `BslogiKey ${token}`
    }
  });
}

export function countryService(payload) {
  const token = localStorage.getItem("jwt");
  return axios({
    method: "GET",
    url: Hastin + "api/meta/country",
    params: payload,
    headers: {
      Authorization: `BslogiKey ${token}`
    }
  });
}

export function currencyService(payload) {
  const token = localStorage.getItem("jwt");
  return axios({
    method: "GET",
    url: Hastin + "api/meta/currencies",
    params: payload,
    headers: {
      Authorization: `BslogiKey ${token}`
    }
  });
}

export function cityService() {
  const token = localStorage.getItem("jwt");
  return axios({
    method: "GET",
    url: Hastin + "api/countryCities/get",
    headers: {
      Authorization: `BslogiKey ${token}`
    }
  });
}

export function createService(payload) {
  const token = localStorage.getItem("jwt");
  return axios({
    method: "POST",
    url: Hastin + "api/vendor/create",
    data: payload,
    headers: {
      Authorization: `BslogiKey ${token}`
    }
  });
}

export function getIdService(id) {
  const token = localStorage.getItem("jwt");
  return axios({
    method: "GET",
    url: Hastin + "api/vendor/get/" + id,
    headers: {
      Authorization: `BslogiKey ${token}`
    }
  })
}

export function updateService(id, payload) {
  const token = localStorage.getItem("jwt");
  return axios({
    method: "PUT",
    url: Hastin + "api/vendor/update/" + id,
    data: payload,
    headers: {
      Authorization: `BslogiKey ${token}`
    }
  });
}

