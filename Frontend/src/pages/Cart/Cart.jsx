import  { useContext, useState, useEffect , useRef} from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  // Add state for NGO dropdown
  const [showNGODialog, setShowNGODialog] = useState(false);
  const [selectedNGO, setSelectedNGO] = useState("");
  const dialogRef = useRef(null);

  // Sample NGO data - replace with your actual data source
  const ngoList = [
    {
      id: 1,
      name: "Feeding India",
      details: "Fighting hunger across the US",
    },
    {
      id: 2,
      name: "Food for Life",
      details: "Providing plant-based meals globally",
    },
    {
      id: 3,
      name: "World Food Program",
      details: "Largest humanitarian organization fighting hunger",
    },
    { id: 4, name: "No Kid Hungry", details: "Ending child hunger in America" },
  ];

  // Function to handle NGO selection
  const selectNGO = (ngo) => {
    setSelectedNGO(ngo.name);
    setShowNGODialog(false);
  };
  // Close dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setShowNGODialog(false);
      }
    };

    if (showNGODialog) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNGODialog]);
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                {" "}
                {/* ✅ Added a unique key here */}
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="promo-ngo">
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Promo-code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you want to Donate NGOs</p>
              <div className="cart-promocode-input">
                <div className="ngo-dropdown-container">
                  <input
                    type="text"
                    placeholder="Select NGOs"
                    value={selectedNGO}
                    onClick={() => setShowNGODialog(true)}
                    readOnly
                  />
                  
                </div>
                <button>Submit</button>
              </div>
            </div>
            {showNGODialog && (
        <div className="ngo-dialog-overlay">
          <div className="ngo-dialog" ref={dialogRef}>
            <div className="ngo-dialog-header">
              <h3>Select an NGO to Donate</h3>
              <button 
                className="ngo-dialog-close" 
                onClick={() => setShowNGODialog(false)}
              >
                ×
              </button>
            </div>
            <div className="ngo-dialog-content">
              {ngoList.map((ngo) => (
                <div
                  key={ngo.id}
                  className="ngo-option"
                  onClick={() => selectNGO(ngo)}
                >
                  <h4>{ngo.name}</h4>
                  <p>{ngo.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
          </div>
        </div>
      </div>
   
  );
};

export default Cart;
