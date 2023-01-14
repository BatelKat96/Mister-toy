import { MsgPreview } from './msg-preview'

export function ToyMsgs({ toy }) {
    console.log('toy:', toy)
    console.log('toy.msgs:', toy.msgs)
    return <ul className="msgs-list clean-list">
        {toy.msgs.map(msg =>
            <li className="msg-preview" key={msg._id}>
                <MsgPreview msg={msg} />
            </li>
        )}
    </ul>
}