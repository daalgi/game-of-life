import './styles.css'

export default ({
    className,
    onRandomGrid,
    onGliderGrid,
    onGosperGliderGun
}) =>
    <div className={className}>
        <div className="btn-sidebar" onClick={onRandomGrid}>Random grid</div>
        <div className="btn-sidebar" onClick={onGliderGrid}>Glider</div>
            <div className="btn-sidebar" onClick={onGosperGliderGun}>Gosper glider gun</div>
    </div>