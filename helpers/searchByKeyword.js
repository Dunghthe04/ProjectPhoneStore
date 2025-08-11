module.exports=(query)=>{
  //tìm kiếm = keyword
  //mặc định sẽ có keyword để truyền về
  let objectSearch={
    keyword:"",
  }
  if(query.keyword){
    objectSearch.keyword=query.keyword;
    const regrex = new RegExp(objectSearch.keyword,"i");// tìm dữ liệu chứa keyword, ko phan biet hoa thuong
    objectSearch.regex=regrex;
  }
  return objectSearch;
}