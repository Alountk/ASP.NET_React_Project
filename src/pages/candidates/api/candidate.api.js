import Api from "../../../api";

class CandidatesRepository extends Api {
  constructor() {
    super();
    this.api.defaults.baseURL += "dcandidate";
  }

  // Get Candidates List
  getListCandidates = async () => {
    return await this.api.get();
  };
  // Get Candidate by ID
  getListCandidatesById = async (id) => {
    return await this.api.get(id);
  };
  // Create a new Candidate
  createCandidate = async ({
    fullName,
    mobile,
    email,
    age,
    bloodGroup,
    address,
  }) => {
    try {
      return await this.api.post("", {
        fullName,
        mobile,
        email,
        age,
        bloodGroup,
        address,
      });
    } catch (error) {
      return { messageError: error };
    }
  };
  // Update a Candidate
  updateCandidate = async (data) => {
    try {
      const {id} = data;
      return await this.api.put("/"+id,data);
    } catch (error) {
      throw error;
    }
  };
  // DElete a Candidate
  deleteCandidate = async (id) => {
    console.log(id);
    return await this.api.delete("/"+id);
  };
}
export default new CandidatesRepository();
