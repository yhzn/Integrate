let filterTime = (start,end,now) => {

  if(((new Date(now.replace(/-/g,"\/")))>=(new Date(start.replace(/-/g,"\/"))))&&((new Date(now.replace(/-/g,"\/")))<=(new Date(end.replace(/-/g,"\/"))))){
    console.log('f')
    return true;
  }
  return false;
}
let isBasic = (it) => {
  return it===null || (typeof it !=='array' && typeof it !== 'object' );
}
let clone = function (it) {
  if(isBasic(it)){
    return it;
  }
  let result=Array.isArray(it)?[]:{};
  for(let i in it){
    result[i]=clone(it[i]);
  }
  return result;
}

export {filterTime,clone}
