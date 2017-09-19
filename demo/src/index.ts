import {PhoenixPayload} from '../../dist';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {WebSocketSubject, WebSocketSubjectConfig} from 'rxjs/observable/dom/WebSocketSubject';
import 'rxjs/add/observable/dom/webSocket';
import 'rxjs/add/observable/interval';

let subject = Observable.webSocket<any>(
    PhoenixPayload.endPointURL('ws://localhost:4000/socket/websocket', {token: 1234})
);
let heartbeatSubject: Subscription;
subject.subscribe(
    (ret) => {
        console.log(ret);
    },
    (error) => {
        console.log(error);
        heartbeatSubject.unsubscribe();
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
heartbeatSubject = Observable.interval(30000).subscribe(
    () => {
        subject.next(PhoenixPayload.heartbeat());
    }
);
