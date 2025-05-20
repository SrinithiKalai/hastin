import axios from "axios";
import { baseUrl } from "../URL/Api";

export function loginService(payload){
    return axios({
        method : "POST",
        url : baseUrl + "app/auth/login",
        data : payload
    })
}

export function validService(payload){
  const token = payload?.jwt;
  localStorage.setItem("jwt", token);
    return axios({
      method: "POST",
      url: baseUrl + "app/auth/access-code/validate",
      data: payload,
      headers: {
        Authorization: "BslogiKey" + " " + payload?.jwt
      }
    });
  }

  export function activeService(payload){
    const token = localStorage.getItem("jwt");
    return axios({
      method: "PUT",
      url: baseUrl + "api/vendor/search/active",
      data: payload,
      headers: {
        Authorization: `BslogiKey ${token}`
      }
    })
  }

  export function countryService(payload){
    const token = localStorage.getItem("jwt");
    return axios({
         method: "GET",
         url: baseUrl + "api/meta/country",
         params: payload,
         headers: {
          Authorization: `BslogiKey ${token}`
        }
    })
  }

  export function currencyService(payload){
    const token = localStorage.getItem("jwt");
    return axios({
         method: "GET",
         url: baseUrl + "api/meta/currencies",
         params: payload,
         headers: {
          Authorization: `BslogiKey ${token}`
        }
    })
  }

  export function cityService(payload){
  const token = localStorage.getItem("jwt");
  return axios({
    method: "GET",
    url: baseUrl + "api/countryCities/get",
    params: payload,
    headers: {
      Authorization: `BslogiKey ${token}`
    } 
  });
}

export function createService(payload){
  console.log("Payload for createService:", payload);

  const token = localStorage.getItem("jwt");
  return axios({
    method: "POST",
    url: baseUrl + "api/vendor/create",
    data: payload,
    headers: {
      Authorization: `BslogiKey ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

  