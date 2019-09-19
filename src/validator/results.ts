export {
  Success,
  Failure,
  Many,
  Many as Failures,
  Result,
  isOneFailure,
  isSuccess,
  handle,
};

function isSuccess<T, E>(arg: Result<T, E>): arg is Success<T> {
  return arg.isSuccess();
}

function isOneFailure<T, E>(arg: Result<T, E>): arg is Failure<E> {
  return !arg.isSuccess() && arg.hasMany() === false;
}

async function handle<T, E>(
  v: Promise<T | undefined>,
  f: () => Failure<E>,
): Promise<Result<T, E>> {
  const value = await v;
  if (value) {
    return new Success(value);
  } else {
    return f();
  }
}

export function success<T, E>(value: T): Result<T, E> {
  return new Success(value) as Result<T, E>;
}

class Success<T> {
  constructor(readonly value: T) {}

  isSuccess(): boolean {
    return true;
  }
  hasMany(): boolean {
    return false;
  }
}

class Failure<E> {
  constructor(readonly error: E) {}

  hasMany(): boolean {
    return false;
  }

  isSuccess(): boolean {
    return false;
  }

  toMany(): Many<Failure<E>> {
    return new Many([this]);
  }
}

class Many<F> {
  static of<F>(f: F): Many<F> {
    return new Many([f]);
  }

  constructor(readonly failures: F[]) {}

  isSuccess(): boolean {
    return false;
  }

  hasMany(): boolean {
    return true;
  }

  toMany(): Many<F> {
    return this;
  }
}

// todo Success<Array<T>> or observables
// or Many<T> = Try<Array<T>, Failure>

type Result<T, E> = Success<T> | Many<Failure<E>> | Failure<E>;

// Mix fail fast and accumulate
// a
// .then((a) => R(b))
// .then((b) => {
//    c = x(b);
//    d = y(b);
//    withGood(c,d, (c,d) => Account(c,b))
// });
