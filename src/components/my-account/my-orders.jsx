import React, { useState } from "react";
import Modal from "react-modal";
import dayjs from "dayjs";

// Timeline Component
const Timeline = ({ currentStatus }) => {
  const statuses = [
    { title: "Order Placed", status: "placed" },
    { title: "Accepted", status: "accepted" },
    { title: "Picking", status: "picking" },
    { title: "Packing", status: "packing" },
    { title: "Ready To Deliver", status: "ready to deliver" },
    { title: "Out for Delivery", status: "out for delivery" },
    { title: "Delivered", status: "delivered" },
  ];

  return (
    <div className="timeline-container">
      {statuses.map((status, index) => (
        <div key={index} className="timeline-item">
          <div
            className={`circle ${
              statuses.findIndex((s) => s.status === currentStatus) >= index
                ? "active"
                : ""
            }`}
          ></div>
          <p
            className={`status-text ${
              statuses.findIndex((s) => s.status === currentStatus) >= index
                ? "active-text"
                : ""
            }`}
          >
            {status.title}
          </p>
          {index !== statuses.length - 1 && (
            <div
              className={`line ${
                statuses.findIndex((s) => s.status === currentStatus) > index
                  ? "active-line"
                  : ""
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

const MyOrders = ({ orderData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const handleOpenModal = (status, id) => {
    setSelectedStatus(status);
    setSelectedOrderId(id);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const order_items = orderData?.map((order) => ({
    _id: order.id,
    createdAt: dayjs(order.created_at).format("MMMM D, YYYY, h:mm A"),
    status: order.status,
    quantity: order.products.length,
    orderAmount: order.order_amount,
    products: order.products,
  }));

  return (
    <>
      <style jsx>{`
        .timeline-container {
          display: flex;
          flex-direction: column;
          margin-top: 20px;
          padding: 0 20px;
        }

        .timeline-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #ccc;
          border: 2px solid #ccc;
          margin-bottom: 10px;
        }

        .circle.active {
          background-color: green;
          border-color: green;
        }

        .status-text {
          font-size: 14px;
          color: #ccc;
          margin-left: 30px;
          margin-top: -25px;
        }

        .status-text.active-text {
          color: green;
          font-weight: bold;
        }

        .line {
          width: 2px;
          height: 40px;
          background-color: #ccc;
          margin-left: 9px;
        }

        .line.active-line {
          background-color: green;
        }

        .product-details {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          background-color: #f9f9f9;
        }

        .product-image {
          margin-right: 15px;
        }

        .product-thumb-img {
          width: 60px;
          height: 60px;
          border-radius: 5px;
          object-fit: cover;
          border: 1px solid #ddd;
        }

        .product-info {
          display: flex;
          flex-direction: column;
        }

        .product-name {
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .product-name span:last-child {
          font-size: 12px;
          color: #555;
        }

        .product-pricing {
          font-size: 12px;
          color: #777;
          margin-top: 5px;
        }

        .product-pricing span {
          display: block;
        }
      `}</style>

      <div className="profile__ticket table-responsive">
        {order_items?.length === 0 ? (
          <div
            style={{ height: "210px" }}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="text-center">
              <i
                style={{ fontSize: "30px" }}
                className="fa-solid fa-cart-circle-xmark"
              ></i>
              <p>You Have no order Yet!</p>
            </div>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Order Id</th>
                <th scope="col">Order Time</th>
                <th scope="col">Status</th>
                <th scope="col">Products</th>
                <th scope="col">Quantity</th>
                <th scope="col">Amount</th>
                <th scope="col">Track</th>
              </tr>
            </thead>
            <tbody>
              {order_items.map((item, i) => (
                <tr key={i}>
                  <th scope="row">#{item._id}</th>
                  <td>{item.createdAt}</td>
                  <td>{item.status}</td>
                  <td>
                    {item.products.map((v, j) => (
                      <div key={j} className="product-details">
                        {/* Product Image */}
                        <div className="product-image">
                          {v.images?.[0]?.thumb_image ? (
                            <img
                              src={v.images[0].thumb_image}
                              alt={v.product?.name}
                              className="product-thumb-img"
                            />
                          ) : (
                            <span>No Image</span>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="product-info">
                          <div className="product-name">
                            <span>{v.product?.name}</span>
                            <span>
                              ({v.volume} {v.unit?.name})
                            </span>
                          </div>
                          <div className="product-pricing">
                            <span>
                              ${v.pivot.price} x {v.pivot.qty}
                            </span>
                            <span>Total: ${v.pivot.price * v.pivot.qty}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td>{item.quantity}</td>
                  <td>${item.orderAmount.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleOpenModal(item.status, item._id)
                      }
                    >
                      Track Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Order Timeline"
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "500px",
              width: "90%",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <div className="modal-header">
            <h2>Track Order</h2>
            <p>ID #{selectedOrderId}</p>
          </div>
          <Timeline currentStatus={selectedStatus} />
          <button onClick={handleCloseModal} className="btn btn-secondary">
            Close
          </button>
        </Modal>
      </div>
    </>
  );
};

export default MyOrders;
