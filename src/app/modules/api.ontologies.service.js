import axios from 'axios';
import queryString from 'query-string';

export default class OntologiesService {
  static baseUrl = 'https://www.ebi.ac.uk/ols/api/ontologies/efo/terms';

  static fetch(params = {}) {
    const query = queryString.stringify(params);
    return axios.get(`${this.baseUrl}?${query}`);
  }
}
