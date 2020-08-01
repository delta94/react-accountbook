import dayjs from 'dayjs';
import { firestore, auth } from './index';
import { Expense } from '../interfaces';

export const addExpense = async (amount: number, date: Date) => {
  const { currentUser } = auth();
  await firestore()
    .collection('users')
    .doc(`${currentUser?.uid}`)
    .collection('expense')
    .add({
      createdAt: firestore.FieldValue.serverTimestamp(),
      date: firestore.Timestamp.fromDate(date),
      amount,
    });
};

export const getExpense = async () => {
  const { currentUser } = auth();

  const querySnapshot = await firestore()
    .collection('users')
    .doc(`${currentUser?.uid}`)
    .collection('expense')
    .orderBy('date', 'asc')
    .get();

  const expense: Expense[] = querySnapshot.docs
    .sort((a, b) => {
      const dateA = a.data().date.toDate();
      const dateB = b.data().date.toDate();

      if (dayjs(dateA).format('YYYY/M/D') === dayjs(dateB).format('YYYY/M/D')) {
        if (a.data().createdAt > b.data().createdAt) {
          return -1;
        }

        return 1;
      }

      if (dateA > dateB) {
        return -1;
      }

      return 1;
    })
    .map((doc) => {
      return {
        id: doc.id,
        date: doc.data().date.toDate(),
        formatedDate: dayjs(doc.data().date.toDate()).format('YYYY/M/D'),
        amount: doc.data().amount,
      };
    });

  return expense;
};

export const createDatilyExpense = (allExpense: Expense[]) => {
  const formatedDateArray = [...allExpense]
    .reverse()
    .map((exp) => exp.formatedDate)
    .filter((formatedDate, i, self) => self.indexOf(formatedDate) === i);

  const dailyExpense = formatedDateArray.map((formatedDate) => {
    const amounts = allExpense
      .filter((exp1) => {
        return exp1.formatedDate === formatedDate;
      })
      .map((exp2) => exp2.amount);

    return { formatedDate, amounts };
  });

  return dailyExpense;
};

export const updateExpense = async (id: string, amount: number, date: Date) => {
  const { currentUser } = auth();
  await firestore()
    .collection('users')
    .doc(`${currentUser?.uid}`)
    .collection('expense')
    .doc(id)
    .update({
      date: firestore.Timestamp.fromDate(date),
      amount,
    });
};

export const deleteExpense = async (id: string) => {
  const { currentUser } = auth();
  await firestore()
    .collection('users')
    .doc(`${currentUser?.uid}`)
    .collection('expense')
    .doc(id)
    .delete();
};
