import {h, render} from 'https://cdn.skypack.dev/preact';
import {useState} from "https://cdn.skypack.dev/preact/hooks";
import htm from "https://cdn.skypack.dev/htm";

// Initialize htm with Preact
const html = htm.bind(h);

const Slider = ({slides = []}) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const nextSlide = () => {
        if (currentSlideIndex === slides.length - 1) {
            setCurrentSlideIndex(0);
        } else {
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    }

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
                prev
            </button>
            <div>
                <h4>Project: ${slides[currentSlideIndex].name}</h4>
                <p>${slides[currentSlideIndex].description}</p>
            </div>
            <button onClick=${() => nextSlide()}>
                next
            </button>
        </div>
    `
}

const target = document.querySelectorAll
(".slider")

target.forEach(node => {
    const slides = node.dataset.slides ? JSON.parse(node.dataset.slides) : [];
    if (slides.length > 0) {
        return render(html`
            <${Slider} slides=${slides}/>`, node)
    }
})