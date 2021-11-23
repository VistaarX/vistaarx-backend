module.exports = (phone_num) => {
  const re = /^[0-9]{10}$/
  return re.test(String(phone_num).toLowerCase())
}