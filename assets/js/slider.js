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
                <ul class="language-list">
                    ${slides[currentSlideIndex].languages?.map(lang => html`
                        <li>${lang.name}</li>
                    `)}
                </ul>
                <p>${slides[currentSlideIndex].description}</p>
            </div>
        </div>
    `
}

const target = document.querySelectorAll
(".slider")

target.forEach(node => {
    let parsed_slides = JSON.parse(node.dataset.slides);
    if (parsed_slides.length > 0) {
        return render(html`
            <${Slider} slides=${parsed_slides}/>`, node)
    }
})