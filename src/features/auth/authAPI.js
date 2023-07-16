// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise(async (resolve) => {
    const reponse = await fetch('http://localhost:8080/cart');
    const data = await reponse.json();
    resolve({ data });
  }

  );
}
