/** @jsx jsx */
import React, { FC, useState, FormEvent } from 'react';
import { jsx } from '@emotion/core';
import dayjs from 'dayjs';
import { InputOnChangeData, DropdownProps } from 'semantic-ui-react';
import { AddExpenseFormComponent } from '../components/Expense/addExpenseForm';
import { addExpense } from '../firebase/firestore';

export const AddExpenseForm: FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());

  const handleChangeAmount = (e: FormEvent, { value }: InputOnChangeData) => {
    setAmount(value);
  };

  const handleChangeDate = (e: FormEvent, { value }: DropdownProps) => {
    if (typeof value === 'number') {
      setDate(dayjs().subtract(value, 'day').toDate());
    }
  };

  const handleClick = async () => {
    console.log('start');
    await addExpense(Number(amount), date);
    setAmount('');
  };

  const dateOptions = [...Array(31).keys()].map((n) => {
    return {
      key: n,
      text: `${dayjs().subtract(n, 'day').format('YYYY/M/D')}`,
      value: n,
    };
  });

  return (
    <AddExpenseFormComponent
      handleChangeAmount={handleChangeAmount}
      handleChangeDate={handleChangeDate}
      handleClick={handleClick}
      amount={amount}
      dateOptions={dateOptions}
    />
  );
};
