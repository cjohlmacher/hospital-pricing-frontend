import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const GEOLOCATION_API_KEY = process.env.REACT_APP_GEOLOCATION_API_KEY || '';
console.log('env variables: ', process.env);

class HospitalApi {

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
        }

  /** Get details on a hospital by handle. */
    static async getHospital(handle) {
        let res = await this.request(`hospitals/${handle}`);
        return res.hospital;
    };

  /** Get list of hospitals based on search term */

    static async getHospitals(searchTerm) {
        let query = {};
        if (searchTerm) {
            query.name = searchTerm;
        };
        let res = await this.request(`hospitals`,query);
        return res.hospitals;
    };

  /** Get details on a hospital by handle. */
    static async getProcedure(code) {
        let res = await this.request(`procedures/${code}`);
        return res.procedure;
    };

  /** Get list of procedures based on search term */
    static async getProcedures(searchTerm) {
        let query = {};
        if (searchTerm) {
            query.description = searchTerm;
        };
        let res = await this.request(`procedures`,query);
        return res.procedures;
    }

  /** Get geolocation data for a given address */
    static async getGeolocation({address,city,state}) {
        let res = await axios({
            url: `https://api.radar.io/v1/geocode/forward?query=${address.split(' ').join('+')}+${city}+${state}`, 
            method: 'GET', 
            params: {
              address,
            },
            headers: {
                'Authorization': GEOLOCATION_API_KEY,
            }
        });
        return res.data.addresses;
    }
};

export default HospitalApi;