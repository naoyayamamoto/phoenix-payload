import {PhoenixPayload} from '../../dist';
import {Observable} from 'rxjs/Observable';
import {WebSocketSubject, WebSocketSubjectConfig} from 'rxjs/observable/dom/WebSocketSubject';
import 'rxjs/add/observable/dom/webSocket';

const phoenixPayload = new PhoenixPayload();

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
 * Join
 */
subject.next(phoenixPayload.joinPayload('room:lobby'));
/**
 * Send Payload
 */
subject.next(phoenixPayload.pushPayload('room:lobby', 'new_msg', {body: 1234}));
