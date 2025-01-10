const findStandardDeviation = (array) => {
    const size = array.length;
    const mean = array.reduce((sum, num) => sum + num, 0) / size;
    const squaredDiff = array.map(num => Math.pow(num - mean, 2));
    const variance = squaredDiff.reduce((sum, diff) => sum + diff, 0) / size;
    return Math.sqrt(variance);
};

module.exports = { findStandardDeviation };