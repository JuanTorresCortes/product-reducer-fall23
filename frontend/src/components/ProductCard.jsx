import React, {useState} from 'react'
import './ProductCard.css'

const ProductCard = (props) => {
    const [editBtn, setEditBtn] = useState(false)

    const [editProductObj, setEditProductObj] = useState({
        id: props.id,
        title: props.title,
        type: props.type,
        publisher: props.publisher,
        genre: props.genre,
        price: props.price
    })

const onChangeHandler = event => {
    setEditProductObj({
        ...editProductObj,
        [event.target.name]: event.target.value
    })
}

const saveProduct = () => {
    // let priceFixed = Number.parseFloat(editProductObj.price).toFixed(2)
    let priceFixed = (Math.round(Number.parseFloat(editProductObj.price) * 100) / 100).toFixed(2)
    // console.log(typeof priceFixed);
    setEditProductObj({
        ...editProductObj,
        price: priceFixed
    })
    props.editProduct({
        ...editProductObj,
        price: priceFixed
    })
    setEditBtn(!editBtn)
}


const capitolize = (inputString) => {
    // function to capitolize a string of words
    // get the first character of each word and make it capitol
    // you can assume each word is separated by a single space - ' '
    let result = inputString.split(' ')
    
    result.forEach((e, i) => {
        result[i] = e.charAt(0).toUpperCase() + e.slice(1)
    });
    
    return result.join(' ');
    // Default String
}

const makeOption = (param, type) => {
    let returnOption = type === param ?<><option selected value={param}>{capitolize(param)}</option></> : <><option value={param}>{capitolize(param)}</option></>
    return returnOption
}

  return (
    <div className='product-card'>
          <h2>{props.title}</h2>
          <h3>{capitolize(props.type)}</h3>
          {
            editBtn ? 
            (   
            <div>
                <label htmlFor='title'>Title: </label>
                <input
                    id='title'
                    name='title'
                    type='text'
                    value={editProductObj.title}
                    onChange={onChangeHandler}
                /><br />
                <label htmlFor='type'>Type: </label>
                <select id='type' name='type' onChange={onChangeHandler} value={editProductObj.type}>
                    <option value="game">Game</option>
                    <option value="movie">Movie</option>
                    <option value="book">Book</option>
                </select><br />
                {/* <select name='type' onChange={onChangeHandler}>
                    {makeOption('game', editProductObj.type)}
                    {makeOption('movie', editProductObj.type)}
                    {makeOption('book', editProductObj.type)} */}
                    {/* {editProductObj.type === "game" ? <option selected value="game">Game</option> : <option value="game">Game</option>}
                    {editProductObj.type === "movie" ? <option selected value="movie">Movie</option> : <option value="movie">Movie</option>}
                    {editProductObj.type === "book" ? <option selected value="book">Book</option> : <option value="book">Book</option>} */}
                {/* </select><br /> */}
                <label htmlFor='publisher'>Publisher: </label>
                <input
                    id='publisher'
                    name='publisher'
                    type='text'
                    value={editProductObj.publisher}
                    onChange={onChangeHandler}
                /><br />
                <label htmlFor='genre'>Genre: </label>
                <input
                    id='genre'
                    name='genre'
                    type='text'
                    value={editProductObj.genre}
                    onChange={onChangeHandler}
                /><br />
                <label htmlFor='price'>Price: </label>
                <input
                    id='price'
                    name='price'
                    type='number'
                    step='.01'
                    min='0.01'
                    value={editProductObj.price}
                    onChange={onChangeHandler}
                /><br />

            <br />
                {/* <button onClick={() => {
                    props.editProduct(editProductObj)
                    setEditBtn(!editBtn)
                    }
                    }>Save Edits!</button> */}
                {/* same as above */}
                <button onClick={saveProduct}>Save Edits!</button>
                <button onClick={() => setEditBtn(!editBtn)}>Cancel</button>
            </div>
            )
            :
            (
                <React.Fragment>
                    <p>Publisher: {props.publisher}</p>
                    <p>Genre: {props.genre}</p>
                    <p>Price: ${props.price}</p>
                    <button onClick={() => {
                        //resets edit state from props
                        setEditProductObj({
                            id: props.id,
                            title: props.title,
                            type: props.type,
                            publisher: props.publisher,
                            genre: props.genre,
                            price: props.price
                        })
                        setEditBtn(!editBtn)
                        }}>Edit</button>
                </React.Fragment>
            )
          }
         

{/* 
          <button onClick={() => props.editProduct(
                {
                    id: props.id,
                    title: "Edited",
                    publisher: "Penguin Classics",
                    genre: "Action/Adventure",
                    price: 20.99     
                }
          )}>Edit</button> */}

    {/* <button onClick={() => setEditBtn(!editBtn)}>{editBtn ? <>True</> : <>False</>}</button> */}
          <button onClick={()=>props.deleteProduct(props.id)}>Delete</button>
    </div>
  )
}

export default ProductCard