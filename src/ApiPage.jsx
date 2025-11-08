import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ApiPage() {
  const [products, setProducts] = useState([]);
  let productsList = products.map((el) => {
    return (
      <div key={el.id} className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={el.image} alt="Shoes" className="h-[300px]" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{el.title}</h2>
          <p>{el.category}</p>
          <p>{el.description}</p>
          <span>{el.price}</span>
          <span>
            {el.rating.rate} {el.rating.count}
          </span>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    );
  });
  let url = "https://fakestoreapi.com/products";
  axios
    .get(url)
    .then((res) => {
      let data = res.data;
      setProducts(data);
    })
    .catch((rej) => {});
  return (
    <section className="py-10">
      <div className="container px-6 lg:px-8 mx-auto">
        <div className="mb-4">
          <Link to="/dashboard" className="btn btn-info">
            Go to Dashboard
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-y-4">{productsList}</div>;
      </div>
    </section>
  );
}
