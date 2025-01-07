import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../Hooks/CartContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export const CheckoutCart = () => {
  const { cartItems, setCartItems, totalPrice, totalQuantity } =
    useContext(CartContext);
  console.log(cartItems);

  const [couponApplied, setCouponApplied] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState();
  const [show, setShow] = useState(false); // to show pop up
  const navigate = useNavigate();

  // ------- thank u page ------
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
    setCartItems([]);
  };
  const handleClose = () => {
    setShow(false);
    navigate("/");
  };

  // redeem button function
  const handleCouponApply = (e) => {
    e.preventDefault();
    // setCoupon -- we are targetiing setcoupon value by e.target.value in the input field of redeem button
    if (totalPrice() >= 20 && coupon === "EXAMPLECODE 10%") {
      setDiscount((totalPrice() * 0.1).toFixed(2)); //apply 10% discount
      setCouponApplied(true);
    } else {
      setDiscount(0);
      setCouponApplied("false");
    }
  };

  // Calculating total price after applying discount
  const calculateTotalPrice = () => {
    let discountedPrice = totalPrice() - discount;
    return discountedPrice < 0 ? 0 : discountedPrice;
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <div className="container">
        <div style={{ margin: "3px" }}>
          <h3>Checkout form</h3>
        </div>

        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span
                className="badge badge-secondary badge-pill"
                style={{ color: "black" }}
              >
                {totalQuantity()}
              </span>
            </h4>

            <ul className="list-group mb-3">
              {cartItems.map((el) => (
                <div key={el.id}>
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">{el.title}</h6>
                    </div>
                    <span className="text-muted">{el.price}</span>
                  </li>
                </div>
              ))}

              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Promo code on $20 and above</h6>
                  <small>EXAMPLECODE 10%</small>
                </div>
                {/* {couponApplied ?  <span className="text-success" >-${discount}</span> : <span >-$0</span>
             }   */}
                <span className="text-success">
                  {couponApplied ? `-$${discount}` : "-$0"}
                </span>
              </li>

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${calculateTotalPrice().toFixed(2)}</strong>
              </li>
            </ul>

            <form className="card p-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    type="submit"
                    className="btn"
                    onClick={handleCouponApply}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" onSubmit={handleShow}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input
                    style={{ border: "1px solid" }}
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    style={{ border: "1px solid" }}
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="username">Username</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                  </div>
                  <input
                    style={{ border: "1px solid" }}
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    required
                  />
                  <div className="invalid-feedback">
                    Your username is required.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email">
                  Email <span className="text-muted">(Optional)</span>
                </label>
                <input
                  style={{ border: "1px solid" }}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                />
                <div className="invalid-feedback">
                  Please enter a valid email address htmlFor shipping updates.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  style={{ border: "1px solid" }}
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="address2">
                  Address 2 <span className="text-muted">(Optional)</span>
                </label>
                <input
                  style={{ border: "1px solid" }}
                  type="text"
                  className="form-control"
                  id="address2"
                  placeholder="Apartment or suite"
                />
              </div>

              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="country">Country</label>
                  <select
                    className="custom-select d-block w-100"
                    id="country"
                    required
                  >
                    <option value="">Choose...</option>
                    <option>United States</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <select
                    className="custom-select d-block w-100"
                    id="state"
                    required
                  >
                    <option value="">Choose...</option>
                    <option>California</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    style={{ border: "1px solid" }}
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>
              <hr className="mb-4" />
              <div className="custom-control custom-checkbox">
                <input
                  style={{ border: "1px solid" }}
                  type="checkbox"
                  className="custom-control-input"
                  id="same-address"
                />
                <label className="custom-control-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  style={{ border: "1px solid" }}
                  type="checkbox"
                  className="custom-control-input"
                  id="save-info"
                />
                <label className="custom-control-label" htmlFor="save-info">
                  Save this information htmlFor next time
                </label>
              </div>
              <hr className="mb-4" />

              <h4 className="mb-3">Payment</h4>

              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    style={{ border: "1px solid" }}
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    required
                  />
                  <label className="custom-control-label" htmlFor="credit">
                    Credit card
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    style={{ border: "1px solid" }}
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    required
                  />
                  <label className="custom-control-label" htmlFor="debit">
                    Debit card
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    style={{ border: "1px solid" }}
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    required
                  />
                  <label className="custom-control-label" htmlFor="paypal">
                    Paypal
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-name">Name on card</label>
                  <input
                    style={{ border: "1px solid" }}
                    type="text"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    required
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-number">Credit card number</label>
                  <input
                    style={{ border: "1px solid" }}
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration</label>
                  <input
                    style={{ border: "1px solid" }}
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">CVV</label>
                  <input
                    style={{ border: "1px solid" }}
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div>
              <hr className="mb-4" />

              <button
                className="btn btn-lg btn-block"
                type="submit"
                // onClick={ handleShow}
              >
                Continue to checkout
              </button>

              <div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Body>
                    <h2>Thanku you for shoping with us!</h2>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
