import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectOrder,
} from './orderSlice';

export default function Order() {
  const count = useSelector(selectOrder);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
    
      </div>
    </div>
  );
}
