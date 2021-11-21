import React, { FC } from 'react';

type CellInfoProps = {
  type: '';
  name: string;
  shortName: string;
};

export const CellInfo: FC<CellInfoProps> = ({ type, name, shortName }) => (
  <div>
    <div>{type}</div>
    <div>{name}</div>
    <div>{shortName}</div>
  </div>
);
