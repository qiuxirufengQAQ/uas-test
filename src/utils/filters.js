import constant from './constant';
import moment from 'moment';

export function enumFilter(value, typeName){
  var enums = constant[typeName];
  
  var target = enums.find((v) => {
    return v.value === value;
  });
  
  if(target === undefined){
    return '';
  }else {
    return target.text;
  }
}

export function dateFilter(v){
  return moment(v).format('YYYY-MM-DD');
}

export function dateTimeFilter(v){
  return moment(v).format('YYYY-MM-DD HH:mm:ss');
}