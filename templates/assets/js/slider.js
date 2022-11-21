import {h, render} from 'https://cdn.skypack.dev/preact';
import {useState} from "https://cdn.skypack.dev/preact/hooks";
import htm from "https://cdn.skypack.dev/htm";

// Initialize htm with Preact
const html = htm.bind(h);

const Slider = (props) => {
    const [count, setCount] = useState(0);
    const increment = () => setCount(count + 1);
    return html`
        <div>
            Count: ${count}
            <button onClick=${increment}>
                increase
            </button>
        </div>
    `
}

const target = document.querySelectorAll
(".slider")

target.forEach(node => render(html`
    <${Slider}/>`, node))