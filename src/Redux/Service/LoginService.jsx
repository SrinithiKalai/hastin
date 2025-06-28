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
  return axios({
    method: "POST",
    url: Hastin + "app/auth/access-code/validate",
    data: payload,
    headers: {
      Authorization: "BslogiKey " + payload.jwt
    }
  });
}

export function resendService(payload) {
  const token = payload.jwt;
  localStorage.setItem("jwt", token);
  return axios({
    method: "POST",
    url: Hastin + "app/auth/access-code/resend",
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

export function inactiveService(payload) {
  const token = localStorage.getItem("jwt")
  return axios({
    method: "PUT",
    url: Hastin + "api/vendor/search/inactive",
    data: payload,
    headers: {
      Authorization: `BslogiKey ${token}`
    }
  });
}

export function tableIdService(id) {
  const token = localStorage.getItem("jwt")
  return axios({
    method: "PUT",
    url: Hastin + "api/vendor/active/" + id,
    headers: {
      Authorization: `BslogiKey ${token}`
    }
  });
}

export function inactiveIdService(id) {
  const token = localStorage.getItem("jwt")
  return axios({
    method: "PUT",
    url: Hastin + "api/vendor/inactive/" + id,
    headers: {
      Authorization: `BslogiKey ${token}`
    }
  });
}

export function currencyService() {
  const token = localStorage.getItem("jwt");
  return axios({
    method: "GET",
    url: Hastin + "api/meta/currencies",
    headers: {
      Authorization: `BslogiKey ${token}`,
    },
  });
}

export function countryService() {
  const token = localStorage.getItem("jwt");
  return axios({
    method: "GET",
    url: Hastin + "api/meta/country",
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
      Authorization: `BslogiKey ${token}`,
    },
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
    url: Hastin + "api/vendor/update",
    data: payload,
    headers: {
      Authorization: `BslogiKey ${token}`
    }
  });
}

export function tickService(payload) {
  const token = localStorage.getItem("jwt");
  return axios({
    method: "PUT",
    url: Hastin + "api/vendor/contact/update",
    data: payload,
    headers: {
      Authorization: `BslogiKey ${token}`
    }
  });
}

export function contactService(payload) {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("JWT token missing in localStorage");
  }

  return axios({
    method: "POST",
    url: Hastin + "api/vendor/contact/create",
    data: payload,
    headers: {
      Authorization: "BslogiKey " + token
    }
  });
}
