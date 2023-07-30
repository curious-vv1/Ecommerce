// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //Not hard-code
    const reponse = await fetch('http://localhost:8080/products');
    const data = await reponse.json();
    resolve({ data });
  }

  );
}

export function fetchProdutsByFilters(filter) {

  //multiple value krna h abhi sirf last value le rha h
  let queryString='';
  for(let key in filter){
    queryString=`${key}=${filter[key]}&`
  }


  return new Promise(async (resolve) => {
    //Not hard-code
    const reponse = await fetch('http://localhost:8080/products?'+queryString);
    const data = await reponse.json();
    resolve({ data });
  }

  );
}