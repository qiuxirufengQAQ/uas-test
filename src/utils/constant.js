// 常量
const constants = {
  AdminStatus: [
    { value: "NORMAL", text: "正常" },
    { value: "LOCKED", text: "冻结" }
  ],
  AdminType: [
    { value: "SUPER", text: "超级管理员" },
    { value: "NORMAL", text: "普通账户" }
  ]
};

export default constants;

export function getConstantText(name, value) {
  const enumConstants = constants[name];
  if (!enumConstants) {
    return null;
  }
  const enumObject = enumConstants.filter(e => e.value == value);
  return enumObject[0] ? enumObject[0].text : null;
}

export function getConstantList(constantName, value) {
  var array = value.replace(/\[|]|\s+/g, "").split(",");
  const mappedList = array.map(v => getConstantText(constantName, v));
  return mappedList.join("，");
}
