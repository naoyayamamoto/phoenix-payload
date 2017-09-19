import {PhoenixPayload} from '../../dist';
import {Observable} from 'rxjs/Observable';
import {WebSocketSubject, WebSocketSubjectConfig} from 'rxjs/observable/dom/WebSocketSubject';
import 'rxjs/add/observable/dom/webSocket';

let subject = Observable.webSocket<any>(
    PhoenixPayload.endPointURL('ws://localhost:4000/socket/websocket', {token: 1234})
);
subject.subscribe(
    (ret) => {
        console.log(ret);
    },
    (error) => {
        console.log(error);
    },
    () => {
        console.log('complete');
    }
);

/**
 * Send Join
 */
subject.next(PhoenixPayload.join('room:lobby'));
/**
 * Send Push
 */
subject.next(PhoenixPayload.push('room:lobby', 'new_msg', {body: 1234}));
/**
 * Send Heartbeat
 */
subject.next(PhoenixPayload.heartbeat());
