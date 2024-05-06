import React from 'react';
import { useStore } from 'react-redux';

interface Product {
  userName: string;
  counter: number;
}

const Cart: React.FC = () => {
  const store = useStore();
  const productList: Product[] = (store.getState() as { list: Product[] }).list;

  return (
    <div className="Selection">
      <h1>Liste de produits sélectionnés</h1>
      {productList.map((item, index) => (
        <span key={index} className="SelectedProduct">
          {item.userName} {item.counter} €
        </span>
      ))}
    </div>
  );
};

export default Cart;
