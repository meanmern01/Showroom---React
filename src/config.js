const dev = {
  ideal_api_url: "http://localhost:8080/api/company",
};

// Put production api url below!
const prod = {
  ideal_api_url: "http://localhost:8080/api/company",
};

const config = process.env.REACT_APP_STAGE == "dev" ? dev : prod;

export default config;
