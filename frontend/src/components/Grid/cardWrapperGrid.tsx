import type { RowProps } from 'antd';
import { Col, Row } from 'antd';
import React from 'react';

interface IGridWrapperProps {
  gutter?: RowProps['gutter'];
  data: any[];
  Renderer: React.FC;
}

const GridWrapper: React.FC<IGridWrapperProps> = ({
  gutter = [8, 8],
  data = [],
  Renderer,
}: IGridWrapperProps) => (
  <Row gutter={gutter}>
    {data?.map((m, i) => (
      <Col span={8} key={m.id || i}>
        <Renderer {...m} />
      </Col>
    ))}
  </Row>
);

export default GridWrapper;
