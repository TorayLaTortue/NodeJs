import React from 'react';
import { useStore } from 'react-redux';

interface Product {
  title: string;
  price: number;
}

const Cart: React.FC = () => {
  const store = useStore();
  const productList: Product[] = (store.getState() as { list: Product[] }).list;

  return (
    <div className="Selection">
      <h1>Liste de produits sélectionnés</h1>
      {productList.map((item, index) => (
        <span key={index} className="SelectedProduct">
          {item.title} {item.price} €
        </span>
      ))}
    </div>
  );
};

export default Cart;
