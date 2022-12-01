import {h, render} from 'https://cdn.skypack.dev/preact';
import {useState} from "https://cdn.skypack.dev/preact/hooks";
import htm from "https://cdn.skypack.dev/htm";

// Initialize htm with Preact
const html = htm.bind(h);

const Slider = ({slides = []}) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const prevSlide = () => {
        if (currentSlideIndex === 0) {
            setCurrentSlideIndex(slides.length - 1);
        } else {
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    }

    return html`
        <div class="project-card">
            <button onClick=${() => prevSlide()}>
                ${`>`}
            </button>
            <div>
                <h4>Project: ${slides[currentSlideIndex].name}</h4>
                <p>${slides[currentSlideIndex].description}</p>
            </div>
        </div>
    `
}

const target = document.querySelectorAll
(".slider")

target.forEach(node => {
    // This is a semi-valid JSON string. It'll have an extra comma at the end, and is an array without brackets []
    let raw_data = node.dataset.slides;
    let trimmed_raw_data = raw_data.substring(0, raw_data.length - 1);
    const slides = node.dataset.slides ? JSON.parse(`[${trimmed_raw_data}]`) : [];
    if (slides.length > 0) {
        return render(html`
            <${Slider} slides=${slides}/>`, node)
    }
})