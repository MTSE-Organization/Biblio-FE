import { Button, Col, Row } from '@/components/form';
import Image from 'next/image';
import Link from 'next/link';
import { product } from '@/assets';
import { RiDeleteBin6Line } from 'react-icons/ri';
import List from '@/components/list';
import ListItem from '@/components/list/ListItem';
import route from '@/routes';

export default function CartPage() {
  return (
    <>
      <Row>
        <Col>
          <form>
            <div className='rounded-md border'>
              <table className='w-full'>
                <thead className='bg-[#e4f2ed]'>
                  <tr>
                    <th className='p-4'></th>
                    <th className='p-4'>Sách</th>
                    <th className='p-4'>Giá</th>
                    <th className='p-4 text-center'>Số lượng</th>
                    <th className='p-4'>Tổng</th>
                    <th className='p-4'></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='w-[60px] py-5 text-center'>
                      <input type='checkbox' />
                    </td>
                    <td className='w-2/5 px-3.5 py-5 font-semibold'>
                      <Link href='#' className='flex items-center'>
                        <Image
                          src={product}
                          alt='Product'
                          width={60}
                          className='mr-5 rounded-md'
                        />
                        Trên đường băng
                      </Link>
                    </td>
                    <td className='px-3.5 py-5 text-center'>
                      <span className='text-green-primary font-bold'>
                        150.000₫
                      </span>
                    </td>
                    <td className='px-3.5 py-5'>
                      <div className='m-auto mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
                        <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                          -
                        </button>
                        <input
                          type='text'
                          defaultValue={1}
                          minLength={1}
                          maxLength={20}
                          className='w-[30px] text-center'
                        />
                        <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                          +
                        </button>
                      </div>
                    </td>
                    <td className='px-3.5 py-5 text-center'>
                      <span className='font-medium'>100.000đ</span>
                    </td>
                    <td className='px-3.5 py-5'>
                      <button className='cursor-pointer hover:text-red-500'>
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className='w-[60px] py-5 text-center'>
                      <input type='checkbox' />
                    </td>
                    <td className='w-2/5 px-3.5 py-5 font-semibold'>
                      <Link href='#' className='flex items-center'>
                        <Image
                          src={product}
                          alt='Product'
                          width={60}
                          className='mr-5 rounded-md'
                        />
                        Trên đường băng
                      </Link>
                    </td>
                    <td className='px-3.5 py-5 text-center'>
                      <span className='text-green-primary font-bold'>
                        150.000₫
                      </span>
                    </td>
                    <td className='px-3.5 py-5'>
                      <div className='m-auto mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
                        <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                          -
                        </button>
                        <input
                          type='text'
                          defaultValue={1}
                          minLength={1}
                          maxLength={20}
                          className='w-[30px] text-center'
                        />
                        <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                          +
                        </button>
                      </div>
                    </td>
                    <td className='px-3.5 py-5 text-center'>
                      <span className='font-medium'>100.000đ</span>
                    </td>
                    <td className='px-3.5 py-5'>
                      <button className='cursor-pointer hover:text-red-500'>
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className='w-[60px] py-5 text-center'>
                      <input type='checkbox' />
                    </td>
                    <td className='w-2/5 px-3.5 py-5 font-semibold'>
                      <Link href='#' className='flex items-center'>
                        <Image
                          src={product}
                          alt='Product'
                          width={60}
                          className='mr-5 rounded-md'
                        />
                        Trên đường băng
                      </Link>
                    </td>
                    <td className='px-3.5 py-5 text-center'>
                      <span className='text-green-primary font-bold'>
                        150.000₫
                      </span>
                    </td>
                    <td className='px-3.5 py-5'>
                      <div className='m-auto mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
                        <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                          -
                        </button>
                        <input
                          type='text'
                          defaultValue={1}
                          minLength={1}
                          maxLength={20}
                          className='w-[30px] text-center'
                        />
                        <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                          +
                        </button>
                      </div>
                    </td>
                    <td className='px-3.5 py-5 text-center'>
                      <span className='font-medium'>100.000đ</span>
                    </td>
                    <td className='px-3.5 py-5'>
                      <button className='cursor-pointer hover:text-red-500'>
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className='w-[60px] py-5 text-center'>
                      <input type='checkbox' />
                    </td>
                    <td className='w-2/5 px-3.5 py-5 font-semibold'>
                      <Link href='#' className='flex items-center'>
                        <Image
                          src={product}
                          alt='Product'
                          width={60}
                          className='mr-5 rounded-md'
                        />
                        Trên đường băng
                      </Link>
                    </td>
                    <td className='px-3.5 py-5 text-center'>
                      <span className='text-green-primary font-bold'>
                        150.000₫
                      </span>
                    </td>
                    <td className='px-3.5 py-5'>
                      <div className='m-auto mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
                        <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                          -
                        </button>
                        <input
                          type='text'
                          defaultValue={1}
                          minLength={1}
                          maxLength={20}
                          className='w-[30px] text-center'
                        />
                        <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                          +
                        </button>
                      </div>
                    </td>
                    <td className='px-3.5 py-5 text-center'>
                      <span className='font-medium'>100.000đ</span>
                    </td>
                    <td className='px-3.5 py-5'>
                      <button className='cursor-pointer hover:text-red-500'>
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className='w-[60px] py-5 text-center'>
                      <input type='checkbox' />
                    </td>
                    <td className='w-2/5 px-3.5 py-5 font-semibold'>
                      <Link href='#' className='flex items-center'>
                        <Image
                          src={product}
                          alt='Product'
                          width={60}
                          className='mr-5 rounded-md'
                        />
                        Trên đường băng
                      </Link>
                    </td>
                    <td className='px-3.5 py-5 text-center'>
                      <span className='text-green-primary font-bold'>
                        150.000₫
                      </span>
                    </td>
                    <td className='px-3.5 py-5'>
                      <div className='m-auto mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
                        <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                          -
                        </button>
                        <input
                          type='text'
                          defaultValue={1}
                          minLength={1}
                          maxLength={20}
                          className='w-[30px] text-center'
                        />
                        <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                          +
                        </button>
                      </div>
                    </td>
                    <td className='px-3.5 py-5 text-center'>
                      <span className='font-medium'>100.000đ</span>
                    </td>
                    <td className='px-3.5 py-5'>
                      <button className='cursor-pointer hover:text-red-500'>
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className='w-[60px] py-5 text-center'>
                      <input type='checkbox' />
                    </td>
                    <td className='w-2/5 px-3.5 py-5 font-semibold'>
                      <Link href='#' className='flex items-center'>
                        <Image
                          src={product}
                          alt='Product'
                          width={60}
                          className='mr-5 rounded-md'
                        />
                        Trên đường băng
                      </Link>
                    </td>
                    <td className='px-3.5 py-5 text-center'>
                      <span className='text-green-primary font-bold'>
                        150.000₫
                      </span>
                    </td>
                    <td className='px-3.5 py-5'>
                      <div className='m-auto mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
                        <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                          -
                        </button>
                        <input
                          type='text'
                          defaultValue={1}
                          minLength={1}
                          maxLength={20}
                          className='w-[30px] text-center'
                        />
                        <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                          +
                        </button>
                      </div>
                    </td>
                    <td className='px-3.5 py-5 text-center'>
                      <span className='font-medium'>100.000đ</span>
                    </td>
                    <td className='px-3.5 py-5'>
                      <button className='cursor-pointer hover:text-red-500'>
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className='w-[60px] py-5 text-center'>
                      <input type='checkbox' />
                    </td>
                    <td className='w-2/5 px-3.5 py-5 font-semibold'>
                      <Link href='#' className='flex items-center'>
                        <Image
                          src={product}
                          alt='Product'
                          width={60}
                          className='mr-5 rounded-md'
                        />
                        Trên đường băng
                      </Link>
                    </td>
                    <td className='px-3.5 py-5 text-center'>
                      <span className='text-green-primary font-bold'>
                        150.000₫
                      </span>
                    </td>
                    <td className='px-3.5 py-5'>
                      <div className='m-auto mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
                        <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                          -
                        </button>
                        <input
                          type='text'
                          defaultValue={1}
                          minLength={1}
                          maxLength={20}
                          className='w-[30px] text-center'
                        />
                        <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                          +
                        </button>
                      </div>
                    </td>
                    <td className='px-3.5 py-5 text-center'>
                      <span className='font-medium'>100.000đ</span>
                    </td>
                    <td className='px-3.5 py-5'>
                      <button className='cursor-pointer hover:text-red-500'>
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <List className='mt-[15px] flex justify-end'>
              <ListItem className='flex py-[5px] font-medium'>
                <label className='mr-2.5 min-w-25 font-bold text-[#2b2b2d]'>
                  Tổng tiền:
                </label>
                1.000.000.000đ
              </ListItem>
            </List>

            <Row className='justify-between'>
              <Button className='text-green-primary border-green-primary hover:bg-green-primary border bg-transparent hover:text-white'>
                <Link href={route.home}>Tiếp tục mua sách</Link>
              </Button>
              <Button className='bg-green-primary'>Thanh toán</Button>
            </Row>
          </form>
        </Col>
      </Row>
    </>
  );
}
