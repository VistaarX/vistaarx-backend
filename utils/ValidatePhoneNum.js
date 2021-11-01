module.exports = (phone_num) => {
  const re = /^\+91[0-9]{10}$/
  return re.test(String(phone_num).toLowerCase())
}