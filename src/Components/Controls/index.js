import Slider from '@material-ui/core/Slider'

import './styles.css'

export default ({
    className,
    run,
    step,
    pencil,
    onPencilToggle,
    onPlayStop,
    onClearGrid,
    speed,
    onChangeSpeed
}) => {

    return (
        <section className={className}>
            <div className="btn" onClick={onPlayStop}>
                {run ? "Stop" : "Play"}
            </div>
            <div className="btn" onClick={onClearGrid}>Clear Grid</div>
            <div className="btn" onClick={onPencilToggle}>
                Pencil {pencil ? "On" : "Off"}
            </div>
            <div>
                <p style={{ width: "180px", marginLeft: "16px" }}>
                    Update period: {speed} ms
                </p>
                <Slider
                    defaultValue={500}
                    valueLabelDisplay="auto"
                    step={50}
                    min={50}
                    max={1000}
                    marks
                    style={{ width: "180px", marginLeft: "16px" }}
                    onChange={(e, value) => onChangeSpeed(value)}
                />
            </div>
            <p id="controls-step-p">Step: {step}</p>
        </section>
    )
}