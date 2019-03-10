module.exports = ({ worker: n }) => (...args) =>
  console.log(`receiver=${n} ${args}`)
