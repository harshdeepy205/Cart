import React,{useState,useEffect} from 'react'
import { useGetAllProductsQuery } from "../features/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"


const Home = () => {
    const {data,error,isLoading}=useGetAllProductsQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [sliceQuant,setSliceQuant]=useState(0)
    const [cheesePrice,setCheesePrice]=useState(30)
    const [checked, setChecked] = useState(false);



    const handleDecreaseQuant=()=>{
        if (sliceQuant > 1){
            const count = sliceQuant - 1
            setSliceQuant(count)
        }
        else if( sliceQuant === 1){
            setSliceQuant(0)
        }
    }

    const handleIncreaseQuant = () => {
        if (sliceQuant >= 0){
            const count = sliceQuant + 1
            setSliceQuant(count)
        }
    }

    const handleAddToCart = (product)=>{
        if(localStorage.getItem('token') == null){
            toast.error("Please Login First", {
                position: 'top-right'
            })
        }
        else{
        const newSlice={
            id:product.id,
            name:product.name,
            image:product.image,
            desc:product.desc,
            price:product.price + (50*sliceQuant) + (checked === true ? cheesePrice : 0),
            slice:sliceQuant,
        }
        console.log(newSlice,"op")
        dispatch(addToCart(newSlice))
        console.log(product,"popo")
        navigate('/cart')
        }
    }

   

    useEffect(()=>{
        console.log("lldd",sliceQuant)
    },[sliceQuant])

    return ( 
    <>
        <div className="home-container">
            { isLoading ? <p>Loading...</p> : error ? <p>An error occured...</p> :
            <>
                <h2>New Arrivals</h2>
                <div className="d-flex flex-lg-row flex-md-column justify-content-evenly flex-wrap gap-3  products">
                    {data?.map(product=><div key={product.id} className="card product" style={{width:"24rem",alignItems:"center"}}>
                        <div className="card-body text-align-center">
                        <h3>{product.name}</h3>
                        <img src={product.image} width="285" height="300"/>
                        <div className="details">
                            <span>Calories</span>
                            <span className="price float-end">{product.desc}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Extra Aloo Tikki</span>
                            <div className='extra-slice d-flex'>
                                <button onClick={()=>handleDecreaseQuant()}>-</button>
                                <div className='count'>{sliceQuant}</div>
                                <button onClick={()=>handleIncreaseQuant()}>+</button>
                                <span className='count-price'>₹{sliceQuant!=0 ? (50 * sliceQuant) : 50}</span>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <span>Extra Chesses</span>
                            <div className='price-content'>
                                <span className='price-span'>₹{cheesePrice}</span>
                                <input type="checkbox" defaultChecked={checked} onChange={()=>setChecked(!checked)}/>
                            </div>
                        </div>

                        <div className="details">
                            <span>Amount</span>
                            <span className="price float-end">₹{product.price}</span>
                        </div>
                        </div>
                        <button className="btn btn-secondary" onClick={()=>handleAddToCart(product,1)}>Add To Cart</button>

                    </div>)}
                </div>
            </> 
            }
        </div>
    </> 
    );
}
 
export default Home;