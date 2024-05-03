import React, { useState, FormEvent } from 'react';

interface Owner {
  firstName: string;
}

const Register: React.FC = () => {
  const [owner, setOwner] = useState<Owner | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const firstName = (event.target as HTMLFormElement).firstName.value;
    setOwner({ firstName });
  };

  return (
    <div>
      <h2>Register</h2>
      <div id="header">
        {owner ? `Le propriétaire du restaurant est ${owner.firstName}` : 'Aucun propriétaire configuré'}
      </div>
      <form onSubmit={handleSubmit}>
        <input name="firstName" />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default Register;
