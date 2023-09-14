/**
 * 获取range值
 *   - 格式为：[start, end]
 * @param {*} range string
 * @returns 
 */
const gerRange = function(range) {
  return range.slice(6).split('-').map(byte => +byte)
}


module.exports = {
  gerRange
}