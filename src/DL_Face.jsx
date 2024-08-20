import './DL_Face.css'

export default function DL_Face() {

    return(
        <>
            <div className="driver-license">
            <div className="license-header">CODY Z GARCIA</div>
            <div className="license-body">
                <div className="license-photo">
                {/* Placeholder for the user profile picture */}
                <div className="photo-placeholder"></div>
                </div>
                <div className="license-info">
                <div className="license-line"></div>
                <div className="license-line"></div>
                <div className="license-line bold-line"></div>
                <div className="license-line bold-line"></div>
                </div>
            </div>
            </div>
        </>
    );
};