import { Col, Row } from '@/components/form';
import CartList from './_components/cart-list';

export default function CartPage() {
  return (
    <Row>
      <Col>
        <form onSubmit={(e) => e.preventDefault()}>
          <CartList />
        </form>
      </Col>
    </Row>
  );
}
