const BaseService = require("@services/base");
const { formatDateForFilters } = require("../../../helpers/date");
const { median, average } = require("../../../helpers/misc");

class RateMaxMedianAverage extends BaseService {
  get parsedRepo() {
    return this.deps.parsedRepo;
  }

  async call(date) {
    const result = await this.parsedRepo.getBasedOnDate(date);
    const rateByDate = {};
    const dates = new Set();
    for (let i = 0; i < result.length; i++) {
      const formattedDate = formatDateForFilters(result[i].createdAt);
      dates.add(formattedDate);
      rateByDate[formattedDate] = result[i].rates
        ? [
            ...(rateByDate[formattedDate] || []),
            Number.parseInt(result[i].rates),
          ]
        : [0];
    }

    for (const date in rateByDate) {
      rateByDate[date] = {
        max: Math.max(...rateByDate[date]),
        median: median(rateByDate[date]),
        average: average(rateByDate[date]),
      };
    }

    const byRate = {
      rateByDate: rateByDate,
      dates: [...dates].sort(function (a, b) {
        return new Date(a) - new Date(b);
      }),
    };

    return byRate;
  }
}

module.exports = RateMaxMedianAverage;
