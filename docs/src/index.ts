import { PhoenixPayload, Payload } from '../../dist';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/observable/dom/WebSocketSubject';
import 'rxjs/add/observable/dom/webSocket';
import 'rxjs/add/observable/interval';

let subject = Observable.webSocket(
    PhoenixPayload.endPointURL('wss://enigmatic-reef-47155.herokuapp.com/socket/websocket', { token: 1234 })
);
let heartbeatSubject: Subscription;

let chat: Function;
subject.subscribe(
    (ret) => {
        chat(PhoenixPayload.decode(ret));
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
// subject.next(PhoenixPayload.push('room:lobby', 'shout', {body: 1234}));

/**
 * Send Heartbeat
 */
heartbeatSubject = Observable.interval(30000).subscribe(
    () => {
        subject.next(PhoenixPayload.heartbeat());
    }
);
/**
 * Send Leave
 */
// subject.next(PhoenixPayload.leave('room:lobby'));


/**
 * Sample Chat
 */
interface Data {
    user: string;
    body: string;
}
window.addEventListener('load', () => {
    const $input = <HTMLInputElement>document.getElementById('message-input');
    const $username = <HTMLInputElement>document.getElementById('username');
    const $messages = <HTMLElement>document.getElementById('messages');
    $input.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
            subject.next(PhoenixPayload.push('room:lobby', 'shout', {
                user: $username.value,
                body: $input.value
            }));
            $input.value = "";
        }
    });

    chat = (payload: Payload<Data>): void => {
        console.log(payload);
        if (payload.event === 'shout') {
            $messages.appendChild(messageTemplate(payload.payload));
            scrollTo(0, document.body.scrollHeight);
        }
    }

    const sanitize = (html: string): string => {
        return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    };

    const messageTemplate = (msg: Data): any => {
        const username = sanitize(msg.user || "anonymous")
        const body = sanitize(msg.body)
        const p = document.createElement('p');
        p.innerHTML = `<a href='#'>[${username}]</a>&nbsp; ${body}`;
        return p;
    };
});
