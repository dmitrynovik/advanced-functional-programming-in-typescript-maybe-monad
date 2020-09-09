export class Maybe<T> {
    private constructor(private value: T | null) {  }

    static some<T>(value: T) {
        if (!value) {
            throw Error('Provided value must not be empty');
        }
        return new Maybe(value);
    }

    static none<T>() {
        return new Maybe<T>(null);
    }

    static fromValue<T>(value: T) {
        return value ? Maybe.some(value) : Maybe.none<T>();
    }

    getOrElse = (defaultValue: T) => this.value === null ? defaultValue : this.value;

    map<R>(f: (wrapped: T) => R): Maybe<R> {
        return (this.value === null) ? Maybe.none<R>() : Maybe.fromValue(f(this.value));
    }

    flatMap<R>(f: (wrapped: T) => Maybe<R>): Maybe<R> {
        return (this.value === null) ? Maybe.none<R>() : f(this.value);
    }
}
