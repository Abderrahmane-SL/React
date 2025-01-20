import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import React, { useState } from 'react';
// import ReactDOM from 'react-dom/client';
// import StartRating from './StartRating'; // Ensure this path is correct

// function Test() {
//   const [MovieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StartRating color="blue" maxRating={10} onsetRating={setMovieRating} />
//       <StartRating  maxRating={5} onsetRating={setMovieRating} messages={["Terrible", 'Naah', 'Okey', 'Good', 'Amazing']} 
//       defaultRating={3}  />
      
//       <p>This movie was rated {MovieRating} stars</p>
//     </div>
//   );
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     {/* <App /> */}
    
   
//     <Test />
//   </React.StrictMode>
// );