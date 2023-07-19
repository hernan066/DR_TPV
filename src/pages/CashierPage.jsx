import { CashierLayout } from "../components/cashierLayout/CashierLayout";
import { Orders } from "../components/orders/Orders";

export const CashierPage = () => {
  return (
    <CashierLayout>
      <Orders />
    </CashierLayout>
  );
};
