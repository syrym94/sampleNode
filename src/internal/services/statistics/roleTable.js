const BaseService = require("@services/base");
const { median, average } = require("../../../helpers/misc");

class RoleTable extends BaseService {
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
    for (let i = 0; i < available.length; i++) {
      const parsedsRoles = available[i]?.["Parseds.roles"] || [];
      const parsedsRate = available[i]["Parseds.rates"];
      parsedsRoles.forEach((role) => {
        countByRole[role] = {
          available: countByRole.hasOwnProperty(role)
            ? countByRole[role]["available"] + 1
            : 1,
          looking: 0,
          rate: [
            ...((countByRole[role] || [])["rate"] || []),
            Number.parseInt(parsedsRate),
          ],
          level: available[i]?.["Parseds.level"]?.[0] || "",
        };
      });
    }
    const looking = await this.postRepo.getAllByStatus(states, 'looking', null, date, options);
    for (let i = 0; i < looking.length; i++) {
      const parsedsRoles = looking[i]?.["Parseds.roles"] || [];
      const parsedsRate = looking[i]["Parseds.rates"];
      parsedsRoles.forEach((role) => {
        countByRole[role] = {
          looking: countByRole.hasOwnProperty(role)
            ? countByRole[role]["looking"] + 1
            : 1,
          available: countByRole.hasOwnProperty(role)
            ? countByRole[role]["available"] + 0
            : 0,
          rate: [
            ...((countByRole[role] || [])["rate"] || []),
            Number.parseInt(parsedsRate),
          ],
          level: looking[i]?.["Parseds.level"]?.[0] || "",
        };
      });
    }
    for (const role in countByRole) {
      countByRole[role] = {
        looking: countByRole[role].looking,
        available: countByRole[role].available,
        level: countByRole[role]?.level,
        max: Math.max(...countByRole[role].rate),
        median: median(countByRole[role].rate),
        average: average(countByRole[role].rate),
      };
    }

    return countByRole;
  }
}

module.exports = RoleTable;
