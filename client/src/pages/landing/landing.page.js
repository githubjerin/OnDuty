import './landing.page.css';
import watermark from '../res/watermark.png';

export default function Landing() {
    return (
        <div>
            <div class="background">
                <img class='watermark' src={watermark} alt='watermark'/>
            </div>
            <div class='content'>
                <h1>REC On-Duty Application Portal</h1>
            </div>
        </div>
    );
}

