import axios from 'axios';
import dayjs from 'dayjs';
import { formatMoney } from '../utils/money';

export function DeliveryOptions({ cartItem, deliveryOptions, loadCart }) {

  // ✅ update delivery option in backend
  const updateDeliveryOption = async (deliveryOptionId) => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      deliveryOptionId
    });

    await loadCart(); // refresh cart
  };

  return (
    <div className="delivery-options">

      <div className="delivery-options-title">
        Choose a delivery option:
      </div>

      {deliveryOptions.map((deliveryOption) => {

        let priceString = 'FREE Shipping';

        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
        }

        return (
          <label key={deliveryOption.id} className="delivery-option">

            <input
              type="radio"
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => updateDeliveryOption(deliveryOption.id)}
            />

            <div>
              <div className="delivery-option-date">
                {
                  dayjs()
                    .add(deliveryOption.deliveryDays, 'day')
                    .format('dddd, MMMM D')
                }
              </div>

              <div className="delivery-option-price">
                {priceString}
              </div>
            </div>

          </label>
        );
      })}

    </div>
  );
}