'use client';

import { Col, Row } from '@/components/form';

export default function BookDetail() {
  return (
    <Row className='my-0'>
      <Col className='mb-24 w-full min-[768px]:w-1/2 min-[1200px]:w-10/24 min-[1400px]:w-1/3'></Col>
      <Col className='mb-24 w-full min-[768px]:w-1/2 min-[1200px]:w-12/24 min-[1400px]:w-2/3'></Col>
    </Row>
  );
}
