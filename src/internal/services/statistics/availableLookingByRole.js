const BaseService = require("@services/base");

class AvailableLookingByRole extends BaseService {
  get parsedRepo() {
    return this.deps.parsedRepo;
  }  
  get postRepo() {
    return this.deps.postRepo;
  }

  async call(date) {
    const states = ["unparsed", "parsed", "selected", "rejected"]
    const options = { raw: true };
    const available = await this.postRepo.getAllByStatus(states, 'available', null, date, options);
    const countByRole = {};
    const roles = new Set();
    for (let i = 0; i < available.length; i++) {
      const parsedsRoles = available[i]?.["Parseds.roles"] || [];
      parsedsRoles.forEach(parsedRole => {
        roles.add(...parsedRole);
        countByRole[parsedRole] = {
          available: countByRole.hasOwnProperty(parsedRole)
            ? countByRole[parsedRole]["available"] + 1
            : 1,
          looking: 0,
        };
      })
    }
    const looking = await this.postRepo.getAllByStatus(states, 'looking', null, date, options);
    for (let i = 0; i < looking.length; i++) {
      const parsedsRoles = available[i]?.["Parseds.roles"] || [];
      parsedsRoles.forEach(parsedRole => {
        roles.add(...parsedRole);
        countByRole[parsedRole] = {
          looking: countByRole.hasOwnProperty(parsedRole)
            ? countByRole[parsedRole]["looking"] + 1
            : 1,
          available: countByRole.hasOwnProperty(parsedRole)
            ? countByRole[parsedRole]["available"] + 0
            : 0,
        };
      })
    }

    const byRole = {
      countByRole: countByRole,
      roles: [...roles],
    };

    return byRole;
  }
}

module.exports = AvailableLookingByRole;
