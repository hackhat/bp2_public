// import {Middleware, MiddlewareAPI, Action} from 'redux';
// import {AppAction, AppDispatch} from "../actions";
// import {IAppState} from "../reducers";
// import {Subject, Observable} from "rxjs";
//
// interface Epic<Action> {
//   (action$: Observable<Action>): Observable<Action>;
// }
//
// // export interface Dispatch<A> {
// //   <A>(action: A): A;
// // }
//
//
// export interface Dispatch<A extends Action> {
//   (action: A): A;
// }
//
// export const createEpicMiddleware = <A>(epic: Epic<A>): Middleware => {
//   const action$: Subject<A> = new Subject();
//   epic(action$).subscribe((action: A) => {
//     action$.next(action);
//   });
//   return ({getState, dispatch}: MiddlewareAPI<Dispatch<A>, IAppState>) => (next: Dispatch<A>) => (action: A) => {
//     next(action as A);
//     action$.next(action);
//   };
// }
//
// const epic =(action$) => action$;
// const a = createEpicMiddleware<AppAction | AppAction[]>(epic);
//# sourceMappingURL=createEpicMiddleware.js.map