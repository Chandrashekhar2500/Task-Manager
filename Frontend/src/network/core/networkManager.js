// Higher Order Class to make all network calls
import { HTTP_METHODS } from "./httpMethods";
import { Response } from "./responseParser";
import { getCookie, clearCookie } from "../../components/Cookie";

export class NetworkManager {

  constructor(endpoint, body = {}, params = {} | []) {
    this.baseUrl = 'http://localhost:5000/api';
    this.endpoint = endpoint.endpoint;
    this.method = endpoint.method;
    this.params = params;
    this.body = body;
    this.headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    };
  }
  async httpRequest(header = true, isMedia = false) {
    let error = "";
    let data = [];
    let success = false;
    let code = 200;
    let message = ""
    const authToken = getCookie('token');

    try {
      const url = `${this.baseUrl}${this.endpoint}${this.requestParams}`;
      const options = {
        method: this.method
      };

      if (authToken) {
        this.headers.authtoken = authToken ?? "";
      }

      if (isMedia) {
        delete this.headers["Content-Type"];
      }

      this.headers["Accept-Language"] = "en";
      options.headers = this.headers;

      if (this.method !== HTTP_METHODS.GET) {
        options.body = isMedia ? this.body : JSON.stringify(this.body);
      }
      // execute fetch call & parse json response
      const res = await fetch(url, options);

      const response = await res.json();
      data = response.data? response.data : null;
      success = response.success ? response.success : null;
      code = response.code ? response.code : null;
      error = response.error ? response.error : null;
      message = response.message ? response.message : null;
      if (code === 401) {
        clearCookie();
        window.location.href = '/';
      }

      if (code >= 400 && code !== 401) {
        // Dispatch common snackbar if there's any api error
      }
    } catch (err) {
      console.log("err ", err);
    } finally {
      // Return whatever is executed and processed
      return new Response(success, data, error, code, message);
    }
  };

  get requestParams() {
    // Prepare url parameters based on type
    let param = "";
    if (this.params !== 0) {
      if (Array.isArray(this.params)) {
        // all params in form of url/id1/id2/id3
        for (let key of this.params) {
          param += `/${key}`;
        }
      } else if (this.params instanceof Object) {
        // all params in form of {param: param1}
        for (let key in this.params) {
          const sectionParam = `${key}=${this.params[key]}`;
          const symbol = param.length > 0 ? "&" : "?";
          param += `${symbol}${sectionParam}`;
        }
      } else {
        param += `/${this.params}`;
      }
    }
    return param;
  }
}
