import { Injectable } from '@angular/core';

import { Observable, Observer, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const WS_SERVER_URL = 'ws://echo.websocket.org';

@Injectable({ providedIn: 'root' })

export class WebsocketService {
  // A ReplaySubject will emit its X latest values (1 in this case) each time its 'subscribe()' method is called
  private ws$ = new ReplaySubject<WebSocket>(1);

  // public listen(): Observable<MessageEvent> {
  //   // Only listen when the connection is opened
  //   return this.ws$.pipe(
  //     // Make an observable out of the websocket stream
  //     switchMap(socket => {
  //       return new Observable((subscriber: Observer<MessageEvent>) => {
  //         // When a new message is received, the Observable will emit this message
  //         socket.onmessage = message => subscriber.next(message);
  //         // When a websocket error occurs, the Observable will emit a new error
  //         socket.onerror = error => subscriber.error(error);
  //         // When the websocket closes, the observable completes
  //         socket.onclose = () => subscriber.complete();
  //         // Function that will be called if the user manually unsubscribe
  //         return () => socket.close();
  //       });
  //     }),
  //     map((event: MessageEvent) => event.data)
  //   )
  // };

  constructor() {
    const socket = new WebSocket(WS_SERVER_URL);
    socket.onopen = () => {
      console.log('Successfully connected to the WebSocket at', WS_SERVER_URL);
      // When the connection is done, emit the WebSocket instance
      this.ws$.next(socket);
    };
  }

}
