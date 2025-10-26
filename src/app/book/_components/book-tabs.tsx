'use client';

import { Button, Col, Row } from '@/components/form';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ContributorAutoType,
  ProductResType,
  PublisherAutoType,
  ReviewSummaryResType
} from '@/types';
import { cn } from '@/lib';
import { motion } from 'framer-motion';
import {
  ageRatings,
  CONTRIBUTOR_AUTHOR,
  CONTRIBUTOR_TRANSLATOR,
  languageOptions
} from '@/constants';
import { formatDate, renderImageUrl } from '@/utils';
import { logger } from '@/logger';
import { NoData } from '@/components/no-data';
import { List, ListItem } from '@/components/list';
import './review-modal.css';
import { useReviewSummaryQuery } from '@/queries/review.query';
import ReviewList from './review-list';
import ReviewSummarySkeleton from '@/app/book/_components/review-summary-skeleton';
import ReviewSummary from '@/app/book/_components/review-summary';

const BookTabs = ({ book }: { book?: ProductResType }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = useMemo(
    () => [
      { key: 'description', label: 'Mô tả sản phẩm' },
      { key: 'detail', label: 'Chi tiết sản phẩm' },
      { key: 'review', label: 'Đánh giá sản phẩm' },
      { key: 'author', label: 'Tác giả' },
      { key: 'translator', label: 'Dịch giả' },
      { key: 'publisher', label: 'Nhà xuất bản' }
    ],
    []
  );

  return (
    <Row className='my-0 mt-5 rounded-lg bg-white p-4 shadow-[0px_0px_10px_2px] shadow-gray-200'>
      <Col className='w-full' gutter={0}>
        <div className='rounded-sm border'>
          <List className='flex gap-7.5 border-b px-4 pt-4'>
            {tabs.map((tab) => (
              <ListItem key={tab.key} className='relative'>
                <Button
                  variant='ghost'
                  className={cn(
                    'before:bg-green-primary relative pb-6 font-semibold before:absolute before:bottom-0 before:left-1/2 before:h-1 before:w-0 before:origin-center before:rounded-lg before:transition-all before:duration-200 before:ease-linear hover:bg-transparent! hover:before:w-full hover:before:-translate-x-1/2',
                    {
                      'text-green-primary before:w-full before:-translate-x-1/2':
                        activeTab === tab.key
                    }
                  )}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </Button>
              </ListItem>
            ))}
          </List>

          <div className='px-8 py-4'>
            {activeTab === 'description' && (
              <BookDescription
                key={activeTab}
                description={book?.description ?? 'Không có mô tả'}
              />
            )}
            {activeTab === 'detail' && <BookInfo book={book} />}
            {activeTab == 'review' && <BookReview productId={book?.id ?? ''} />}
            {activeTab === 'author' && (
              <ContributorInfo
                contributors={
                  book?.contributors.filter(
                    (contr) => contr.kind === CONTRIBUTOR_AUTHOR
                  ) ?? []
                }
              />
            )}
            {activeTab === 'translator' && (
              <ContributorInfo
                contributors={
                  book?.contributors.filter(
                    (contr) => contr.kind === CONTRIBUTOR_TRANSLATOR
                  ) ?? []
                }
              />
            )}
            {activeTab === 'publisher' && (
              <PublisherInfo publisher={book?.publisher} />
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

function BookDescription({ description }: { description: string }) {
  const collapsedHeight = 150;
  const [showFull, setShowFull] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver(() => {
      setContentHeight(contentRef.current?.scrollHeight || 0);
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [description]);

  return (
    <div className='relative'>
      <motion.div
        initial={false}
        animate={{
          height: showFull ? contentHeight : collapsedHeight
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='overflow-hidden'
      >
        <div ref={contentRef}>
          <div dangerouslySetInnerHTML={{ __html: description || '' }} />
        </div>
      </motion.div>

      {!showFull && contentHeight > collapsedHeight && (
        <div className='pointer-events-none absolute bottom-10 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent' />
      )}

      {contentHeight > collapsedHeight && (
        <div className='pt-2 text-center'>
          <Button
            onClick={() => setShowFull(!showFull)}
            variant='primary'
            className='font-semibold'
          >
            {showFull ? 'Thu gọn' : 'Xem thêm'}
          </Button>
        </div>
      )}
    </div>
  );
}

function InfoRow({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <ListItem className='flex py-[5px] text-[#777]'>
      <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
        {label} <span>:</span>
      </label>
      {children}
    </ListItem>
  );
}

function BookInfo({ book }: { book?: ProductResType }) {
  const authors = book?.contributors
    .filter((contr) => contr.kind === CONTRIBUTOR_AUTHOR)
    .map((auth) => auth.name)
    .join(', ');
  const publisher = book?.publisher;

  const parseMetadataToObject = (metaData: string) => {
    if (!metaData)
      return { height: 0, length: 0, weight: 0, width: 0, numPage: 0 };
    try {
      return JSON.parse(metaData);
    } catch (error) {
      logger.error('Error while parsing metaData json: ', error);
    }
  };

  const metaData = parseMetadataToObject(book?.metaData!);

  return (
    <List>
      <InfoRow label='Danh mục'>{book?.category.name}</InfoRow>
      <InfoRow label='Kho'>Còn hàng</InfoRow>
      <InfoRow label='Tác giả'>{authors}</InfoRow>
      <InfoRow label='NXB'>{publisher?.name}</InfoRow>
      <InfoRow label='Ngày XB'>{formatDate(book?.releaseDate)}</InfoRow>
      <InfoRow label='Ngôn ngữ'>
        {languageOptions.find((lang) => lang.value === book?.language)?.label}
      </InfoRow>
      <InfoRow label='Trọng lượng'>{metaData?.weight} g</InfoRow>
      <InfoRow label='Kích thước'>
        {metaData?.length}cm x {metaData?.width}cm x {metaData?.height}cm
      </InfoRow>
      <InfoRow label='Số trang'>{metaData?.numPage} trang</InfoRow>
      <InfoRow label='Độ tuổi'>
        {ageRatings.find((age) => age.value === book?.ageRating)?.label}
      </InfoRow>
    </List>
  );
}

function AvatarCard({
  image,
  name,
  description
}: {
  image?: string;
  name: string;
  description?: string;
}) {
  return (
    <div className='mb-2.5 flex gap-8'>
      <div className='flex flex-col items-center text-center'>
        <div className='mt-2 h-25 w-25 shrink-0'>
          <Image
            className='h-25 w-25 rounded-full object-cover'
            width={100}
            height={100}
            src={renderImageUrl(image)}
            alt={name}
          />
        </div>
        <p className='mt-4 mb-1 truncate font-semibold whitespace-nowrap'>
          {name}
        </p>
      </div>
      {description && (
        <p
          className='prose prose-p:m-0! prose-ul:m-0 prose-li:m-0 prose-sm mt-2 max-w-full'
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
}

function ExpandableSection({
  children,
  collapsedHeight = 150
}: {
  children: React.ReactNode;
  collapsedHeight?: number;
}) {
  const [showFull, setShowFull] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver(() => {
      setContentHeight(contentRef.current?.scrollHeight || 0);
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [children]);

  return (
    <div className='relative'>
      <motion.div
        initial={false}
        animate={{
          height: showFull ? contentHeight : collapsedHeight
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='overflow-hidden'
      >
        <div ref={contentRef}>{children}</div>
      </motion.div>

      {!showFull && contentHeight > collapsedHeight && (
        <div className='pointer-events-none absolute bottom-10 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent' />
      )}

      {contentHeight > collapsedHeight && (
        <div className='pt-2 text-center'>
          <Button
            onClick={() => setShowFull(!showFull)}
            variant='primary'
            className='font-semibold'
          >
            {showFull ? 'Thu gọn' : 'Xem thêm'}
          </Button>
        </div>
      )}
    </div>
  );
}

function ContributorInfo({
  contributors
}: {
  contributors: ContributorAutoType[];
}) {
  if (contributors.length === 0) return <NoData />;

  return (
    <ExpandableSection collapsedHeight={250}>
      {contributors.map((contr) => (
        <AvatarCard
          key={contr.id}
          image={contr.avatarPath}
          name={contr.name}
          description={contr.bio}
        />
      ))}
    </ExpandableSection>
  );
}

function PublisherInfo({
  publisher
}: {
  publisher: PublisherAutoType | undefined;
}) {
  if (!publisher) return null;

  return (
    <ExpandableSection collapsedHeight={250}>
      <AvatarCard
        image={publisher.logoPath}
        name={publisher.name}
        description={publisher.description}
      />
    </ExpandableSection>
  );
}

function BookReview({ productId }: { productId: string }) {
  const reviewSummaryQuery = useReviewSummaryQuery({
    productId,
    enabled: !!productId
  });

  const reviewSummary = reviewSummaryQuery?.data?.data?.content ?? [];

  const totalReviews =
    reviewSummary?.reduce(
      (sum: number, i: ReviewSummaryResType) => sum + i.total,
      0
    ) ?? 0;

  const getRatePercent = (rate: number) => {
    if (!reviewSummary || totalReviews === 0) return 0;

    const item = reviewSummary.find(
      (r: ReviewSummaryResType) => r.rate === rate
    );
    return item ? Math.round((item.total / totalReviews) * 100) : 0;
  };

  const averageRate =
    totalReviews > 0
      ? Math.round(
          (reviewSummary.reduce(
            (sum: number, i: ReviewSummaryResType) => sum + i.rate * i.total,
            0
          ) /
            totalReviews) *
            10
        ) / 10
      : 0;

  return (
    <>
      <Row className='mt-4 justify-center'>
        <Col
          span={10}
          gutter={0}
          className='mb-4 flex-row items-center gap-x-5'
        >
          {reviewSummaryQuery.isLoading || reviewSummaryQuery.isFetching ? (
            <ReviewSummarySkeleton />
          ) : (
            <ReviewSummary
              averageRate={averageRate}
              totalReviews={totalReviews}
              getRatePercent={getRatePercent}
            />
          )}
        </Col>
      </Row>
      <Row className='mb-0'>
        <ReviewList productId={productId} />
      </Row>
    </>
  );
}

export default BookTabs;
