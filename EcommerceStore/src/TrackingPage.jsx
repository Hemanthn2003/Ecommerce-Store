import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import './TrackingPage.css';
import Header from './components/Header';

const TrackingPage = ({ cart }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    axios.get(`/api/orders/${orderId}?expand=products`)
      .then((res) => {
        setOrder(res.data);
      });
  }, [orderId]);

  useEffect(() => {
    if (!order) return;

    const start = dayjs(order.createdAt);
    const end = dayjs(order.estimatedDeliveryDate || dayjs().add(5, 'day'));
    const now = dayjs();

    const total = end.diff(start);
    const done = now.diff(start);

    let percent = Math.min(100, Math.max(5, Math.floor((done / total) * 100)));

    setAnimatedProgress(0);

    setTimeout(() => {
      setAnimatedProgress(percent);
    }, 200);
  }, [order]);

  const getStatus = () => {
    if (animatedProgress < 25) return "Order Placed";
    if (animatedProgress < 50) return "Dispatched";
    if (animatedProgress < 75) return "Left Warehouse";
    if (animatedProgress < 100) return "At Your Hub";
    return "Delivered";
  };

  if (!order) return <div>Loading...</div>;

  return (
    <>
      <Header cart={cart} />

      <div className="tracking-wrapper">
        <div className="tracking-card">

          <h2>Track Package</h2>

          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {getStatus()}</p>

          {/* 🔥 WRAPPER */}
          <div className="progress-wrapper">

            {/* BAR */}
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${animatedProgress}%` }}
              >
                <div className="shine"></div>
              </div>
            </div>

            {/* 🚚 TRUCK OUTSIDE BAR */}
            <div
              className="truck"
              style={{ left: `${animatedProgress}%` }}
            >
              🚚
            </div>

          </div>

          <div className="progress-labels">
            <span>Placed</span>
            <span>Dispatched</span>
            <span>Warehouse</span>
            <span>Hub</span>
            <span>Delivered</span>
          </div>

        </div>
      </div>
    </>
  );
};

export default TrackingPage;