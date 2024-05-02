import React from 'react';
import { useNavigate } from 'react-router-dom';

const handleClick = () => {
    console.log('✨ Ceci est un clic ✨')
}

const RedirectButton: React.FC<{ route: string }> = ({ route }) => {
    const navigate = useNavigate();
  
    const redirectToPage = () => {
      navigate(route);
    };
  
    return (
      <button onClick={redirectToPage}>
        Go to {route}
      </button>
    );
};

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert((e.target as HTMLFormElement).my_input.value);
}

export { handleSubmit, handleClick, RedirectButton };
