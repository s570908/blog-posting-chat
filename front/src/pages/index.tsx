import { decrement, increment } from 'features/counterSlice';
import type { GetServerSideProps, NextPage } from 'next';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { wrapper } from '../app/store';

const Home: NextPage = () => {
  const { value: count } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    store.dispatch(increment());

    return {
      props: {},
    };
  });

export default Home;
