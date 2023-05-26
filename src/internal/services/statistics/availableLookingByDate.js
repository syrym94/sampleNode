const BaseService = require("@services/base");
const { formatDateForFilters } = require("../../../helpers/date");

class AvailableLookingByDate extends BaseService {
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
    const countByDate = {};
    const dates = new Set();
    for (let i = 0; i < available.length; i++) {
      dates.add(formatDateForFilters(available[i].createdAt));
      const formattedDate = formatDateForFilters(available[i].createdAt);
      countByDate[formattedDate] = {
        available: countByDate.hasOwnProperty(formattedDate)
          ? countByDate[formattedDate]["available"] + 1
          : 1,
        looking: 0,
      };
    }
    const looking = await this.postRepo.getAllByStatus(states, 'looking', null, date, options);
    for (let i = 0; i < looking.length; i++) {
      dates.add(formatDateForFilters(looking[i].createdAt));
      const formattedDate = formatDateForFilters(looking[i].createdAt);
      countByDate[formattedDate] = {
        looking: countByDate.hasOwnProperty(formattedDate)
          ? countByDate[formattedDate]["looking"] + 1
          : 1,
        available: countByDate.hasOwnProperty(formattedDate)
          ? countByDate[formattedDate]["available"] + 0
          : 0,
      };
    }

    const byDate = {
      countByDate: countByDate,
      dates: [...dates].sort(function (a, b) {
        return new Date(a) - new Date(b);
      }),
    };
    return byDate;
  }
}

module.exports = AvailableLookingByDate;
