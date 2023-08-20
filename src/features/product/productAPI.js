// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //Not hard-code
    const response = await fetch('http://localhost:8080/products');
    const data = await response.json();
    resolve({ data });
  }

  );
}


export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    //Not hard-code
    const response = await fetch('http://localhost:8080/products/'+id);
    const data = await response.json();
    resolve({ data });
  }

  );
}

export function fetchProdutsByFilters(filter,sort,pagination) {

  //filter: {"category":["smartphone","laptops"]}

  //sort : {_sort:"price",_order:"desc"}

  //multiple value krna h abhi sirf last value le rha h
  let queryString='';
  for(let key in filter){
    const categoryValues=filter[key];
    if(categoryValues.length>0){
      const lastCategoryValue=categoryValues[categoryValues.length-1];
      queryString +=`${key}=${ lastCategoryValue}&`;
    }
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }


  return new Promise(async (resolve) => {
    //Not hard-code
    const response = await fetch('http://localhost:8080/products?'+queryString);
    const data = await response.json();
    const totalItems= await response.headers.get('X-Total-Count')
    resolve({ data:{products:data,totalItems:totalItems} });
  }

  );
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    //Not hard-code
    const response = await fetch('http://localhost:8080/brands');
    const data = await response.json();
    resolve({ data });
  }

  );
}

export function fetchCategory() {
  return new Promise(async (resolve) => {
    //Not hard-code
    const response = await fetch('http://localhost:8080/category');
    const data = await response.json();
    resolve({ data });
  }

  );
}