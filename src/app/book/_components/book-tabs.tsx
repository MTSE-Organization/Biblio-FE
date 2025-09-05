import { Col, Row } from '@/components/form';
import React, { useState } from 'react';
import Image from 'next/image';
import { defaultAvatar } from '@/assets';
import List from '@/components/list';
import ListItem from '@/components/list/ListItem';

const BookTabs = () => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { key: 'description', label: 'Mô tả sản phẩm' },
    { key: 'detail', label: 'Chi tiết sản phẩm' },
    { key: 'review', label: 'Đánh giá sản phẩm' },
    { key: 'author', label: 'Thông tin tác giả/ dịch giả' }
  ];

  return (
    <Row className='my-0 mb-12'>
      <Col className='w-full'>
        <div className='mt-10 rounded-sm border p-6'>
          <ul className='flex gap-[30px] border-b'>
            {tabs.map((tab) => (
              <li key={tab.key} className='relative'>
                <button
                  className={`pb-6 font-semibold ${
                    activeTab === tab.key ? 'text-green-primary' : ''
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>

          <div className='pt-[30px]'>
            {activeTab === 'description' && <p>Mô tả sách</p>}
            {activeTab === 'detail' && (
              <div className=''>
                <List className='mt-[15px]'>
                  <ListItem className='flex py-[5px] text-[#777]'>
                    <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                      Danh mục <span>:</span>
                    </label>
                    Sách giáo khoa
                  </ListItem>

                  <ListItem className='flex py-[5px] text-[#777]'>
                    <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                      Kho <span>:</span>
                    </label>
                    Còn hàng
                  </ListItem>

                  <ListItem className='flex py-[5px] text-[#777]'>
                    <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                      Tác giả <span>:</span>
                    </label>
                    Tên tác giả
                  </ListItem>

                  <ListItem className='flex py-[5px] text-[#777]'>
                    <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                      NXB <span>:</span>
                    </label>
                    Tên NXB
                  </ListItem>

                  <ListItem className='flex py-[5px] text-[#777]'>
                    <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                      Ngày XB <span>:</span>
                    </label>
                    01/01/1970
                  </ListItem>

                  <ListItem className='flex py-[5px] text-[#777]'>
                    <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                      Phiên bản <span>:</span>
                    </label>
                    Lần 1
                  </ListItem>

                  <ListItem className='flex py-[5px] text-[#777]'>
                    <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                      Ngôn ngữ <span>:</span>
                    </label>
                    Tiếng Việt
                  </ListItem>

                  <ListItem className='flex py-[5px] text-[#777]'>
                    <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                      Trọng lượng <span>:</span>
                    </label>
                    500g
                  </ListItem>

                  <ListItem className='flex py-[5px] text-[#777]'>
                    <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                      Kích thước <span>:</span>
                    </label>
                    14 x 20 cm
                  </ListItem>

                  <ListItem className='flex py-[5px] text-[#777]'>
                    <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                      Số trang <span>:</span>
                    </label>
                    300
                  </ListItem>

                  <ListItem className='flex py-[5px] text-[#777]'>
                    <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                      Định dạng <span>:</span>
                    </label>
                    Bìa mềm
                  </ListItem>

                  <ListItem className='flex py-[5px] text-[#777]'>
                    <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                      ISBN-10 <span>:</span>
                    </label>
                    1234567890
                  </ListItem>

                  <ListItem className='flex py-[5px] text-[#777]'>
                    <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                      ISBN-13 <span>:</span>
                    </label>
                    978-1234567890
                  </ListItem>

                  <ListItem className='flex py-[5px] text-[#777]'>
                    <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                      Độ tuổi <span>:</span>
                    </label>
                    12+
                  </ListItem>
                </List>
              </div>
            )}
            {activeTab === 'author' && (
              <div className='mb-2.5 flex gap-8 rounded-2xl border px-5 py-4'>
                <div>
                  <Image
                    className='object-cover'
                    width={100}
                    height={100}
                    src={defaultAvatar.src}
                    alt='Author'
                  />
                </div>
                <div>
                  <span className='mb-2.5 text-2xl font-bold'>Tên tác giả</span>
                  <p className='mt-5'>Giới thiệu tác giả</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default BookTabs;
