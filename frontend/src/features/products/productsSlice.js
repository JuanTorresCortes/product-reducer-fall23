import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Equivalent to 'get-products'
    getProducts: (state, action) => {
      return action.payload;
    },

    // Equivalent to 'delete'
    deleteProduct: (state, action) => {
      return state.filter((element) => element.id !== action.payload.id);
    },

    // Equivalent to 'edit'
    editProduct: (state, action) => {
      return state.map((element) =>
        element.id === action.payload.id ? action.payload : element
      );
    },

    // Equivalent to 'add-product'
    addProduct: (state) => {
      const newProduct = {
        id: uuidv4(),
        type: "",
        title: "",
        publisher: "",
        genre: "",
        price: 0.0,
      };
      state.unshift(newProduct);
    },

    // Equivalent to 'add-API'
    addAPIProducts: (state, action) => {
      const transformedPayload = action.payload.map((element) => ({
        id: element.id,
        type: "game",
        title: element.gameTitle,
        publisher: element.publisherName,
        genre: element.genre,
        price: element.MSRP,
      }));
      return [...transformedPayload, ...state];
    },
  },
});

export const {
  getProducts,
  addProduct,
  deleteProduct,
  editProduct,
  addAPIProducts,
} = productsSlice.actions;

export default productsSlice.reducer;

// import { v4 as uuidv4 } from 'uuid';

// export default function productReducer(state, action) {
//     switch (action.type) {
//         case 'delete':
//             // remove an object from the array
//             // filter the array with the passed id
//             // return the new filtered array
//             // console.log(action.id);
//             // let filteredArr = state.filter(element =>
//             //     // element.id === action.id ? false : true
//             //     element.id !== action.id
//             //     )
//             // return filteredArr
//             return state.filter(element => element.id !== action.id)
//         case 'edit':
//                 // take in the edited object from action.editObj
//                 // and replace the original object in the array with the edited object
//                 // map through the state array find the object that matches the id the edited object
//                 // return the editObj instead of the original element
//                 // console.log(action.editObj);
//                 // let editedArray = state.map(element => {
//                 //     if (element.id === action.editObj.id) {
//                 //         return action.editObj
//                 //     } else {
//                 //         return element
//                 //     }
//                 // })
//                 // return editedArray

//                 // the above into a single line
//                 return state.map(element => element.id === action.editObj.id ? action.editObj : element)
//         case 'get-products':
//             // console.log(...state, ...action.payload)
//             return action.payload
//         // add-product case
//         case 'add-product':
//         // create a new empty product object
//             let newProduct = {
//                 id: uuidv4(),
//                 type: '',
//                 title: "",
//                 publisher: "",
//                 genre: "",
//                 price: 0.00
//             }

//             // inserts the empty product object into the first index of the state array
//             let addArray = [
//                 newProduct,
//                 ...state
//             ]
//             // console.log(addArray);
//             return addArray

//         case 'add-API':
//             let payloadArr = action.payload.map(element => {
//                 return {
//                     id: element.id,
//                     type: 'game',
//                     title: element.gameTitle,
//                     publisher: element.publisherName,
//                     genre: element.genre,
//                     price: element.MSRP
//                 }
//             })
//             // console.log('!@-------payloadArr-------@!')
//             // console.log(payloadArr)
//             return [...payloadArr, ...state]

//         default:
//             return state;
//     }
// }
