import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './ProductCard.css'
import { editProduct, deleteProduct } from '../features/products/productsSlice';

function ProductCard(props) {
    const defaultProduct = {
        id: props.id ,
        title: props.title ,
        type: props.type ,
        publisher: props.publisher,
        genre: props.genre ,
        price: props.price 
    };

    const [isEditing, setIsEditing] = useState(!props.title);
    const [editedProduct, setEditedProduct] = useState(defaultProduct);
    const dispatch = useDispatch();

    const handleEditToggle = () => {
        setIsEditing(prevState => !prevState);
    }

    const handleSave = () => {
        dispatch(editProduct(editedProduct));
        setIsEditing(false);
    }

    const handleChange = (e, field) => {
        setEditedProduct(prevState => ({
            ...prevState,
            [field]: e.target.value
        }));
    }

    const handleDelete = () => {
        dispatch(deleteProduct({ id: props.id }));
    }

    return (
        <div className="product-card">
            {isEditing ? (
                <div>
                    <label>Title:</label>
                    <input value={editedProduct.title} onChange={e => handleChange(e, 'title')} />
                    
                    <label>Type:</label>
                    <input value={editedProduct.type} onChange={e => handleChange(e, 'type')} />
                    
                    <label>Publisher:</label>
                    <input value={editedProduct.publisher} onChange={e => handleChange(e, 'publisher')} />
                    
                    <label>Genre:</label>
                    <input value={editedProduct.genre} onChange={e => handleChange(e, 'genre')} />
                    
                    <label>Price:</label>
                    <input value={editedProduct.price} onChange={e => handleChange(e, 'price')} />

                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleEditToggle}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>Title: {props.title}</p>
                    <p>Type: {props.type}</p>
                    <p>Publisher: {props.publisher}</p>
                    <p>Genre: {props.genre}</p>
                    <p>Price: {props.price}</p>

                    <button onClick={handleEditToggle}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}


// const ProductCard = (props) => {
//     // const [editBtn, setEditBtn] = useState(props.title ? false : true)
//     const [editBtn, setEditBtn] = useState(props.price === 0 ? true : false)

//     const [editProductObj, setEditProductObj] = useState({
//         id: props.id,
//         title: props.title,
//         type: props.type,
//         publisher: props.publisher,
//         genre: props.genre,
//         price: props.price
//     })
    
//     // const [editBtn, setEditBtn] = useState(editProductObj.price === 0 ? true : false)

// const onChangeHandler = event => {
//     setEditProductObj({
//         ...editProductObj,
//         [event.target.name]: event.target.value
//     })
// }

// const saveProduct = () => {
//     if (editProductObj.price == 0) {
//         alert("Please enter a non-zero price")
//         return
//     }
//     // let priceFixed = Number.parseFloat(editProductObj.price).toFixed(2)
//     let priceFixed = (Math.round(Number.parseFloat(editProductObj.price) * 100) / 100).toFixed(2)
//     // console.log(typeof priceFixed);
//     setEditProductObj({
//         ...editProductObj,
//         price: priceFixed
//     })
//     props.editProduct({
//         ...editProductObj,
//         price: priceFixed
//     })
//     setEditBtn(!editBtn)
// }


// const capitolize = (inputString) => {
//     // function to capitolize a string of words
//     // get the first character of each word and make it capitol
//     // you can assume each word is separated by a single space - ' '
//     let result = inputString.split(' ')
    
//     result.forEach((e, i) => {
//         result[i] = e.charAt(0).toUpperCase() + e.slice(1)
//     });
    
//     return result.join(' ');
//     // Default String
// }

// const makeOption = (param, type) => {
//     let returnOption = type === param ?<><option selected value={param}>{capitolize(param)}</option></> : <><option value={param}>{capitolize(param)}</option></>
//     return returnOption
// }

//   return (
//     <div className='product-card'>
//           <h2>{props.title}</h2>
//           <h3>{capitolize(props.type)}</h3>
//           {
//             editBtn ? 
//             (   
//             <div>
//                 <label htmlFor='title'>Title: </label>
//                 <input
//                     id='title'
//                     name='title'
//                     type='text'
//                     value={editProductObj.title}
//                     onChange={onChangeHandler}
//                 /><br />
//                 <label htmlFor='type'>Type: </label>
//                 <select id='type' name='type' onChange={onChangeHandler} value={editProductObj.type}>
//                     <option value="game">Game</option>
//                     <option value="movie">Movie</option>
//                     <option value="book">Book</option>
//                 </select><br />
//                 {/* <select name='type' onChange={onChangeHandler}>
//                     {makeOption('game', editProductObj.type)}
//                     {makeOption('movie', editProductObj.type)}
//                     {makeOption('book', editProductObj.type)} */}
//                     {/* {editProductObj.type === "game" ? <option selected value="game">Game</option> : <option value="game">Game</option>}
//                     {editProductObj.type === "movie" ? <option selected value="movie">Movie</option> : <option value="movie">Movie</option>}
//                     {editProductObj.type === "book" ? <option selected value="book">Book</option> : <option value="book">Book</option>} */}
//                 {/* </select><br /> */}
//                 <label htmlFor='publisher'>Publisher: </label>
//                 <input
//                     id='publisher'
//                     name='publisher'
//                     type='text'
//                     value={editProductObj.publisher}
//                     onChange={onChangeHandler}
//                 /><br />
//                 <label htmlFor='genre'>Genre: </label>
//                 <input
//                     id='genre'
//                     name='genre'
//                     type='text'
//                     value={editProductObj.genre}
//                     onChange={onChangeHandler}
//                 /><br />
//                 <label htmlFor='price'>Price: </label>
//                 <input
//                     id='price'
//                     name='price'
//                     type='number'
//                     step='.01'
//                     min='0.01'
//                     value={editProductObj.price}
//                     onChange={onChangeHandler}
//                 /><br />

//             <br />
//                 {/* <button onClick={() => {
//                     props.editProduct(editProductObj)
//                     setEditBtn(!editBtn)
//                     }
//                     }>Save Edits!</button> */}
//                 {/* same as above */}
//                 <button onClick={saveProduct}>Save Edits!</button>
//                 <button onClick={() => setEditBtn(!editBtn)}>Cancel</button>
//             </div>
//             )
//             :
//             (
//                 <React.Fragment>
//                     <p>Publisher: {props.publisher}</p>
//                     <p>Genre: {props.genre}</p>
//                     <p>Price: ${props.price}</p>
//                     <button onClick={() => {
//                         //resets edit state from props
//                         setEditProductObj({
//                             id: props.id,
//                             title: props.title,
//                             type: props.type,
//                             publisher: props.publisher,
//                             genre: props.genre,
//                             price: props.price
//                         })
//                         setEditBtn(!editBtn)
//                         }}>Edit</button>
//                 </React.Fragment>
//             )
//           }
         

// {/* 
//           <button onClick={() => props.editProduct(
//                 {
//                     id: props.id,
//                     title: "Edited",
//                     publisher: "Penguin Classics",
//                     genre: "Action/Adventure",
//                     price: 20.99     
//                 }
//           )}>Edit</button> */}

//     {/* <button onClick={() => setEditBtn(!editBtn)}>{editBtn ? <>True</> : <>False</>}</button> */}
//           <button onClick={()=>props.deleteProduct(props.id)}>Delete</button>
//     </div>
//   )
// }
