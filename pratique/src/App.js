

export default function App(){
  const products = [
    {
    id: 1,
    title: 'PC Portable Gamer HP VICTUS',
    price: '7490 DH',
    thumbnail : 'Screenshot 2024-11-11 220028.jpg'
    },
    {
    id: 2,
    title: 'PC Portable Gamer HP VICTUS',
    price: '2190 DH',
    thumbnail : 'HP14424U3EA.jpg'
    },
    {
    id: 3,
    title: 'Pc Portable Chromebook Acer',
    price: '3640 DH',
    thumbnail: 'NXATHEF002.jpg'
    },
    {
    id: 4,
    title: 'PC Portable - HUAWEI',
    price: '1270 DH',
    thumbnail: 'HUA6901443442959.jpg'
    },
    ];
  return (
    <>
           { products.map((product) => 
        
        <Products key={product.id} className="product">
          <img src={product.thumbnail} alt={product.title}/>
          <h2>{product.title}</h2><br/>
          <p>{product.price}</p><br/>
        </Products>
           )}
    </>
  );
}

function Products({children}) {
  return (
    <div className="product">
      {children}
      <button>Ajouter au panier</button>
    </div>
  );
}