const BaseService = require("@services/base");

class GeneralAvailableLookingRatio extends BaseService {
  get parsedRepo() {
    return this.deps.parsedRepo;
  }  
  get postRepo() {
    return this.deps.postRepo;
  }

  async call(date) {
    const states = ["unparsed", "parsed", "selected", "rejected"]
    const countAvailable = await this.postRepo.getCountByStatus(states, 'available', null, date)
    const countLooking = await this.postRepo.getCountByStatus(states, 'looking', null, date)
    return { available: countAvailable, looking: countLooking };
  }
}

module.exports = GeneralAvailableLookingRatio;
