import { useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Yellow Onion 50lbs',
      category: 'Vegetable',
      price: '$12.00',
      image: '',
      description: 'Premium quality yellow onions, 50lb sack.'
    },
    {
      id: 2,
      name: 'Fuji Apple',
      category: 'Fruit',
      price: '$18.00',
      image: '',
      description: 'Crisp and sweet Fuji apples in bulk pack.'
    }
  ]);
  const [search, setSearch] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cart, setCart] = useState([]);

  const handleLogin = () => {
    if (username && password) setLoggedIn(true);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleImageUpload = (event, id) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, image: reader.result } : item
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!loggedIn) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Client Login</h1>
        <input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>MG Produce Client Portal</h1>
      <input
        placeholder='Search produce...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <table border='1' cellPadding='10'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Upload</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((item) => (
            <tr key={item.id}>
              <td>
                {item.image ? (
                  <img src={item.image} alt={item.name} width='50' />
                ) : (
                  'No image'
                )}
              </td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <input type='file' accept='image/*' onChange={(e) => handleImageUpload(e, item.id)} />
              </td>
              <td>
                <button onClick={() => handleAddToCart(item)}>Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 20 }}>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.name} - {item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
