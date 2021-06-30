import http from './ajax';

class Service {
    static fetchBanks(city, offSet, pageSize) {
        return http
        .get(`/api/banks?city=${city}&offSet=${offSet}&pageSize=${pageSize}`)
        .then((response) => {
            if (response.success) {
            return response.banks;
            } else {
            throw new Error();
            }
        });
    }

    static getBankCount(city) {
        return http
        .get(`/api/banks/count?city=${city}`)
        .then((response) => {
            if (response.success) {
            return response.count;
            } else {
            throw new Error();
            }
        });
    }

    static getBank(ifsc) {
        return http
        .get(`/api/banks/${ifsc}`).then((response) => {
          if (response.success) {
            return response;
          } else if (response.message) {
            return response;
          } else {
            throw new Error();
          }
        });
      }

    static getBranches(city, branch, offSet, pageSize) {
        return http
        .get(`/api/banks/branches/autocomplete?city=${city}&branch=${branch}&offSet=${offSet}&pageSize=${pageSize}`)
        .then((response) => {
            if (response.success) {
            return response.branches;
            } else {
            throw new Error();
            }
        });
    } 

    static SearchBanks(city, offSet, pageSize, key) {
        return http
        .get(`/api/banks/branches?city=${city}&offSet=${offSet}&pageSize=${pageSize}&key=${key}`)
        .then((response) => {
            if (response.success) {
            return response.banks;
            } else {
            throw new Error();
            }
        });
    }

    static getBranchData(city, branch , offSet, pageSize) {
        return http
        .get(`/api/bank/branch?city=${city}&branch=${branch}&offSet=${offSet}&pageSize=${pageSize}`)
        .then((response) => {
            if (response.success) {
                return response.banks;
            } else {
                throw new Error();
            }
        });
    }
}

export default Service;