// type ProductType = {
//   title: string,
//   imageUrl: string,
//   price: number
// }

// function ProductItem(props: ProductType){ // react compnent
//   // console.log(props);

//   return(
//     <>
//       <h1>{props.title}</h1>
//       <img id="image" className="" style={{height: '100px'}} src={props.imageUrl} alt="" />
//       <h3>{props.price} vnđ</h3>
//       <button onDoubleClick={()=>{
//         console.log(props.title)
//       }}>Mua ngay</button>
//     </>
//   )
// }

// function MyComponent(){
//   const litsProduct: ProductType[] = [
//     {
//       title:"Sản phẩm 1",
//       imageUrl: "https://studiovietnam.com/wp-content/uploads/2022/08/background-chup-anh-san-pham-02.jpg",
//       price: 1000
//     },
//     {
//       title:"Sản phẩm 2",
//       imageUrl: "https://studiovietnam.com/wp-content/uploads/2022/08/background-chup-anh-san-pham-02.jpg",
//       price: 2000
//     },
//     {
//       title:"Sản phẩm 3",
//       imageUrl: "https://studiovietnam.com/wp-content/uploads/2022/08/background-chup-anh-san-pham-02.jpg",
//       price: 3000
//     }
//   ]

//   return (
//     <>
//       {
//         litsProduct.map((item: ProductType,index:number)=>{
//           return (
//             <ProductItem
//               key={index}
//               title= {item.title}
//               imageUrl= {item.imageUrl}
//               price={item.price}
//             />
//           )
//         })
//       }
//       {/* <ProductItem
//         title="Sản phẩm 1"
//         imageUrl="https://studiovietnam.com/wp-content/uploads/2022/08/background-chup-anh-san-pham-02.jpg"
//         price={1000}
//       /> */}
//     </>
//   )
// }

// export default MyComponent;
